export type Store = {
  id: number;
  name: string;
  state: string;
  city: string;
  createdAt: string;
  rating?: number; // pode não vir
  booksCount?: number;
};
