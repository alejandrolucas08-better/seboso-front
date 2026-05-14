import type { Book } from "../../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (

    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>

          <h2 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h2>

          <p className="text-gray-500">
            {book.author}
          </p>


        </div>
        <div>

        </div>
      </div>
    </div>
  );
}