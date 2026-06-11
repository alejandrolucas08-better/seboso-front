import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBooks, deleteBook } from "../../../services/book.service";
import type { Book } from "../../../types/book";

import BooksTable from "../../../components/books/BooksTable";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Alterado para receber o estado atualizado funcionalmente em vez de depender da closure
  async function handleDelete(bookId: number) {
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) {
      return;
    }
    try {
      await deleteBook(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      try {
        setLoading(true);
        const data = await getBooks();

        if (active) {
          setBooks(data);
        }

      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
    };
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 animate-pulse">Carregando catálogo de livros...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Livros</h1>

        <Link
          to="/dashboard/books/create"
          className="bg-[#C37351] text-white px-4 py-2 rounded-lg hover:bg-[#A85F42] transition-colors shadow-sm font-medium"
        >
          Novo Livro
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <BooksTable books={books} onDelete={handleDelete} />
      </div>
    </div>
  );
}