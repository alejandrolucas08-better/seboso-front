import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBooks } from "../../../services/book.service";
import type { Book } from "../../../types/book";

import BooksTable from "../../../components/books/BooksTable";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();

        setBooks(data);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Gerenciar Livros
        </h1>

        <Link
          to="/dashboard/books/create"
          className="
            bg-[#C37351]
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-[#A85F42]
          "
        >
          Novo Livro
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <BooksTable books={books} />
      </div>
    </div>
  );
}