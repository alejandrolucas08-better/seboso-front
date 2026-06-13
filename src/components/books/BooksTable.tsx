import { Link } from "react-router-dom";
import type { Book } from "../../types/book";
import { Pencil, Trash2, BookOpen } from "lucide-react";

interface BooksTableProps {
  books: Book[];
  onDelete: (bookId: number) => void;
}

export default function BooksTable({ books, onDelete }: BooksTableProps) {
  // A verificação de lista vazia agora é tratada pelo componente pai (BooksList) 
  // com um visual rico de "Empty State", mas mantemos uma segurança caso necessário:
  if (books.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 text-sm">
        Nenhum livro encontrado.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-175">
        {/* Cabeçalho da Tabela */}
        <thead>
          <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <th className="py-3 px-5">Livro / Obra</th>
            <th className="py-3 px-5">Gênero</th>
            <th className="py-3 px-5">Editora & Edição</th>
            <th className="py-3 px-5 text-right">Ações</th>
          </tr>
        </thead>

        {/* Corpo da Tabela */}
        <tbody className="divide-y divide-gray-100 text-sm">
          {books.map((book) => (
            <tr 
              key={book.id} 
              className="hover:bg-gray-50/40 transition-colors group"
            >
              {/* Coluna 1: Capa + Título + Autor */}
              <td className="py-4 px-5 max-w-[320px]">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Mini capa inteligente */}
                  <div className="w-9 h-12 bg-gray-50 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                    {book.cover_url ? (
                      <img 
                        src={book.cover_url} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <BookOpen size={15} className="text-gray-300" />
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-800 group-hover:text-[#C37351] transition-colors truncate" title={book.title}>
                      {book.title}
                    </h2>
                    <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>
              </td>

              {/* Coluna 2: Gênero / Categoria */}
              <td className="py-4 px-5 vertical-middle">
                <span className="inline-block text-xs font-bold px-2 py-0.5 bg-orange-50 text-[#A85F42] rounded-md uppercase tracking-wide">
                  {book.genre || "Geral"}
                </span>
              </td>

              {/* Coluna 3: Editora e Volume/Edição */}
              <td className="py-4 px-5 text-gray-500 font-medium">
                <div className="truncate max-w-50" title={book.publisher || "Não informada"}>
                  {book.publisher || "—"}
                </div>
                {book.edition && (
                  <span className="text-[11px] text-gray-400 block mt-0.5 font-normal">
                    {book.edition}ª Edição
                  </span>
                )}
              </td>

              {/* Coluna 4: Ações Alinhadas à Direita */}
              <td className="py-4 px-5">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/dashboard/books/${book.id}/edit`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:border-[#C37351] hover:text-[#C37351] hover:bg-orange-50 transition-all shadow-2xs bg-white"
                    title="Editar Informações"
                  >
                    <Pencil size={15} />
                  </Link>

                  <button
                    onClick={() => onDelete(book.id)}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all shadow-2xs bg-white"
                    title="Excluir do Acervo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}