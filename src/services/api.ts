const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
};
 // Função genérica para fazer requisições à API, centralizando a lógica de autenticação e tratamento de erros
export async function api<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body } = options;
  const token = localStorage.getItem("token");

  // Construção dos headers usando a classe Headers, que é mais robusta e fácil de manipular
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  // Adiciona o token de autenticação se estiver presente
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers, // ◄ O fetch aceita instâncias de Headers perfeitamente
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Erro na comunicação com servidor");
  }

  return data;
}