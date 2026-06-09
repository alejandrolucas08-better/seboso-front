import { Link } from "react-router-dom";
import type { Book } from "../../types/book";
import { Pencil, Trash2 } from "lucide-react";

interface BooksTableProps {
  books: Book[];
}

export default function BooksTable({books}: BooksTableProps) {
    if (books.length === 0) {
        return (
            <p className="p-4 text-gray-500">
            Nenhum livro encontrado.
            </p>
        );
        }

    return (
    <>
        {books.map((book) => (
        <div
            key={book.id}
            className="
            flex
            justify-between
            items-center
            p-4
            border-b
            border-gray-100
            "
        >
            <div>
                <h2 className="font-semibold">
                    {book.title}
                </h2>

                <p className="text-sm text-gray-500">
                    {book.author}
                </p>
            </div>

            <div className="flex items-center gap-2">
            <Link
                to={`/dashboard/books/${book.id}/edit`}
                className="
                flex items-center justify-center
                w-9 h-9
                rounded-lg
                border border-gray-200
                hover:border-[#C37351]
                hover:text-[#C37351]
                transition-all
                "
                title="Editar"
            >
                <Pencil size={16} />
            </Link>

            <button
                onClick={() => handleDelete(book.id)}
                className="
                flex items-center justify-center
                w-9 h-9
                rounded-lg
                border border-gray-200
                hover:border-red-500
                hover:text-red-600
                transition-all
                "
                title="Excluir"
            >
                <Trash2 size={16} />
            </button>
            </div>
        </div>
        ))}
    </>
    );
}