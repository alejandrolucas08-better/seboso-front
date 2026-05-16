import { createContext, useEffect, useState } from "react"; // Importa as funções createContext, useEffect e useState do React para criar o contexto de autenticação e gerenciar o estado do usuário e dos efeitos colaterais relacionados à autenticação

type User = {
  token: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: AuthProviderProps) {

  const [user, setUser] =
    useState<User | null>(null);

  // Carrega token salvo
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setUser({
        token,
      });

    }

  }, []);

  function login(token: string) {

    localStorage.setItem(
      "token",
      token
    );

    setUser({
      token,
    });

  }

  function logout() {

    localStorage.removeItem("token");

    setUser(null);

  }

  return (
    <AuthContext.Provider
      value={{
        user,

        isAuthenticated: !!user,

        login,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}