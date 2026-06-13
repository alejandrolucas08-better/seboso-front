export interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  published_at: string | null;
  isbn_10_code: string | null;
  isbn_13_code: string | null;
  cover_type: string | null;
  cover_url: string | null; 
  edition: string | null;
  language: string | null;
  genre: string | null;
  publisher: string | null;
  pages: number | null;
  dimensions: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateBookInput = {
  title: string;
  author: string;
  description?: string;
  published_at?: string;
  cover_type?: string;
  cover_url?: string; 
  edition?: string;
  language?: string;
  genre?: string;
  isbn_10_code?: string;
  isbn_13_code?: string;
  publisher?: string;
  pages?: number | null;
  dimensions?: string | null;
};