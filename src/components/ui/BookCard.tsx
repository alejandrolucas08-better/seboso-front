import type { Book } from "../../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] px-6 py-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-[#2f2a28]">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>
        <span className="text-sm font-medium text-gray-500">{book.year}</span>
      </div>
    </div>
  );
}
