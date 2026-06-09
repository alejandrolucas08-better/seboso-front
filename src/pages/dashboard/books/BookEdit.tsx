import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BookForm from "../../../components/books/BookForm";

import { getBookById, updateBook, } from "../../../services/book.service";

import type { Book } from "../../../types/book";

export default function BookEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await getBookById(Number(id));

        setBook(data);
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  async function handleUpdate(data: any) {
    try {
      await updateBook(Number(id), data);

      navigate("/dashboard/books");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  }

  if (loading) {
    return (
      <p>
        Carregando livro...
      </p>
    );
  }

  if (!book) {
    return (
      <p>
        Livro não encontrado.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Editar Livro
      </h1>

      <BookForm
        initialData={book}
        onSubmit={handleUpdate}
      />
    </div>
  );
}