import { useContext } from "react"; // Importa a função useContext do React para acessar o contexto de autenticação criado no AuthContext
import { AuthContext } from "../contexts/AuthContext"; // Importa o contexto de autenticação para acessar as informações do usuário e as funções de login e logout, permitindo que os componentes usem essas funcionalidades de forma fácil e centralizada

// Hook personalizado para acessar o contexto de autenticação, fornecendo uma maneira fácil de acessar as informações do usuário e as funções de login e logout em qualquer componente que esteja dentro do AuthProvider
export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {
  
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}