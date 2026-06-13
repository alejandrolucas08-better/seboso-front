import { useState } from "react";
import FormField from "../ui/FormField";
import type { CreateStoreInput } from "../../services/store.service";

interface StoreFormProps {
  initialData?: Partial<CreateStoreInput>;
  onSubmit: (data: CreateStoreInput) => Promise<void>;
}

export default function StoreForm({
  initialData,
  onSubmit,
}: StoreFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    cnpj: initialData?.cnpj ?? "",
    street: initialData?.street ?? "",
    number: initialData?.number?.toString() ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    city_block: initialData?.city_block ?? "",
    cep: initialData?.cep ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSubmit({
      ...formData,
      number: Number(formData.number),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Dados do Sebo */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Informações do Sebo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Nome do Estabelecimento"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Sebo Vila das Letras"
          />

          <FormField
            label="CNPJ"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0001-00"
          />
        </div>
      </section>

      {/* Endereço */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Localização e Endereço
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Rua / Logradouro"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Ex: Avenida Paulista"
          />

          <FormField
            label="Número"
            name="number"
            type="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="123"
          />

          <FormField
            label="Bairro"
            name="city_block"
            value={formData.city_block}
            onChange={handleChange}
            placeholder="Ex: Centro"
          />

          <FormField
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            placeholder="00000-000"
          />

          <FormField
            label="Cidade"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ex: São Paulo"
          />

          <FormField
            label="Estado (UF)"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Ex: SP"
          />
        </div>
      </section>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()} // Simplesmente volta para a página anterior
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#C37351] text-sm font-semibold text-white hover:bg-[#A85F42] shadow-sm transition-colors"
        >
          Salvar Sebo
        </button>
      </div>

    </form>
  );
}