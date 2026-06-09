import { useState, useEffect } from "react";
import { AuthContext, buildUser } from "./AuthContext";
import { getUserStores } from "../services/userstore.service";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // Flag para rastrear se as lojas do usuário já foram validadas/buscadas do backend
  const [hasLoadedStores, setHasLoadedStores] = useState(false);

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          return buildUser(token);
        } catch {
          localStorage.removeItem("token");
          return null;
        }
      }
    }
    return null;
  });

  async function loadUserStores(userId: number) {
    try {
      return await getUserStores(userId);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function login(token: string) {
    localStorage.setItem("token", token);
    const baseUser = buildUser(token);
    const stores = await loadUserStores(baseUser.id);
    
    setUser({
      ...baseUser,
      stores,
    });
    setHasLoadedStores(true); // Marca como carregado no login
  }

  // 🟢 CORREÇÃO DO LOOP INFINITO:
  useEffect(() => {
    async function restoreStores() {
      // Se não houver usuário logado ou se já carregamos as lojas do banco, não faz nada
      if (!user?.id || hasLoadedStores) return;
      
      // Se o token decodificado já trouxe lojas dentro dele, não precisa buscar na API
      if (user.stores.length > 0) {
        setHasLoadedStores(true);
        return;
      }

      const stores = await loadUserStores(user.id);

      setUser((current) => {
        if (!current) return null;
        return {
          ...current,
          stores,
        };
      });
      
      // Marca como concluído. Mesmo que o usuário tenha 0 lojas, o efeito não rodará de novo
      setHasLoadedStores(true);
    }

    restoreStores();
    
  // 🟢 Alterado de [user] para usar apenas propriedades seguras.
  // Evita re-disparar o efeito quando o objeto user for recriado na memória.
  }, [user?.id, hasLoadedStores]); 

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setHasLoadedStores(false); // Reseta a flag no logout
  }

  function isAdmin() {
    return user?.isAdmin ?? false;
  }

  function isOwner() {
    return user?.stores.some((store) => store.role === "owner") ?? false;
  }

  function isEmployee() {
    // Tratando tanto "worker" (termo do back-end) quanto "employee" (termo do seu tipo)
    return user?.stores.some((store) => store.role === "employee" || store.role === "worker") ?? false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,

        login,
        logout,

        isAdmin: isAdmin(),
        isOwner: isOwner(),
        isEmployee: isEmployee(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}