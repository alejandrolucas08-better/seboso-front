import { useState } from "react";
import FormField from "../ui/FormField";
import type { Book, CreateBookInput } from "../../types/book";

type BookFormProps = {
  initialData?: Partial<Book>;
  onSubmit: (data: CreateBookInput) => Promise<void>;
};

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    author: initialData?.author ?? "",
    description: initialData?.description ?? "",
    published_at: initialData?.published_at ?? "",
    cover_type: initialData?.cover_type ?? "",
    cover_url: initialData?.cover_url ?? "", 
    edition: initialData?.edition ?? "",
    language: initialData?.language ?? "",
    genre: initialData?.genre ?? "",
    isbn_10_code: initialData?.isbn_10_code ?? "",
    isbn_13_code: initialData?.isbn_13_code ?? "",
    publisher: initialData?.publisher ?? "",
    pages: initialData?.pages?.toString() ?? "",
    dimensions: initialData?.dimensions ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSubmit({
      ...formData,
      pages: formData.pages ? Number(formData.pages) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados básicos */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Informações Básicas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <FormField
            label="Autor"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />

          <FormField
            label="Gênero"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />

          <FormField
            label="Idioma"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />

          <FormField
            label="Editora"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />

          <FormField
            label="Edição"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* Identificação e Visual */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Identificação & Visual
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="ISBN 10"
            name="isbn_10_code"
            value={formData.isbn_10_code}
            onChange={handleChange}
          />

          <FormField
            label="ISBN 13"
            name="isbn_13_code"
            value={formData.isbn_13_code}
            onChange={handleChange}
          />

          <FormField
            label="Tipo de Capa (Ex: Capa Dura)"
            name="cover_type"
            value={formData.cover_type}
            onChange={handleChange}
          />

          <FormField
            label="URL da Imagem da Capa"
            name="cover_url"
            value={formData.cover_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg" 
          />

          <FormField
            label="Páginas"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            type="number"
          />

          <FormField
            label="Dimensões"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
          />

          <FormField
            label="Data de Publicação"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
            type="date"
          />
        </div>
      </section>

      {/* Descrição */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Descrição / Sinopse
        </h2>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Escreva um breve resumo ou detalhes sobre o exemplar..."
          className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C37351] focus:ring-1 focus:ring-[#C37351] transition-all resize-y"
        />
      </section>

      {/* Ações do Formulário */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#C37351] text-sm font-semibold text-white hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          Salvar Livro
        </button>
      </div>
    </form>
  );
}