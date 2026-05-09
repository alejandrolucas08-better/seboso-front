import { useState } from "react";
import BookCard from "../../components/ui/BookCard";
import type { Book } from "../../types/book";

export default function Books() {

  const [books] = useState<Book[]>([
    {
      id: "1",
      title: "Dom Casmurro",
      author: "Machado de Assis",
      year: 1899,
      price: 25,
      storeId: "1",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      year: 1949,
      price: 30,
      storeId: "1",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Catálogo Geral
      </h1>

      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </>
  );
}