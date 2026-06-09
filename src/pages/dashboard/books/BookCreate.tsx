import { useNavigate } from "react-router-dom";

import BookForm from "../../../components/books/BookForm";

import { createBook } from "../../../services/book.service";
import type { CreateBookInput } from "../../../types/book";

export default function BookCreate() {
  const navigate = useNavigate();

  async function handleCreate(data: CreateBookInput) {
    try {
      await createBook(data);
      navigate("/dashboard/books");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Novo Livro
      </h1>

      <BookForm onSubmit={handleCreate} />
    </div>
  );
}