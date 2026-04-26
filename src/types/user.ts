export type User = {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: "client" | "employee" | "seboOwner" | "admin";
  createdAt: string;
  updatedAt: string;
};
