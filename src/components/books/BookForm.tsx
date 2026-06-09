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

    async function handleSubmit(
     e: React.FormEvent
    ) {
        e.preventDefault();

        await onSubmit({
         ...formData,
         pages: formData.pages
            ? Number(formData.pages)
            : null,
        });
    }

  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
  {/* Dados básicos */}
  <section className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold mb-4">
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

  {/* Identificação */}
  <section className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold mb-4">
      Identificação
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
        label="Tipo de Capa"
        name="cover_type"
        value={formData.cover_type}
        onChange={handleChange}
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
  <section className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold mb-4">
      Descrição
    </h2>

    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows={6}
      className="
        w-full
        border
        border-gray-300
        rounded-lg
        p-3
        focus:outline-none
        focus:ring-2
        focus:ring-[#C37351]
      "
    />
  </section>

  {/* Ações */}
  <div className="flex justify-end gap-3">
    <button
      type="button"
      className="
        px-5
        py-2
        rounded-lg
        border
        border-gray-300
      "
    >
      Cancelar
    </button>

    <button
      type="submit"
      className="
        px-5
        py-2
        rounded-lg
        bg-[#C37351]
        text-white
        hover:bg-[#A85F42]
      "
    >
      Salvar Livro
    </button>
  </div>
</form>
  );
}