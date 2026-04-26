import { useState } from "react"; // Importa o hook useState para gerenciar o estado do componente
import Sidebar from "../../components/layout/Sidebar"; // Importa o componente Sidebar para a barra lateral de busca e filtro
import SeboCard from "../../components/ui/SeboCard"; // Importa o componente SeboCard para exibir as informações de cada sebo na lista
import type { Store } from "../../types/store"; // Importa o tipo Store para tipar o estado dos sebos e as props do componente SeboCard

export default function Home() {

  const [stores] = useState<Store[]>([
    {
      id: 1,
      name: "Sebo Maria Vida",
      state: "SC",
      city: "Palhoça",
      createdAt: "18/11/2014",
      rating: 100
    },
    {
      id: 2,
      name: "IKO",
      state: "SP",
      city: "São Paulo",
      createdAt: "10/02/2014"
    },
    {
      id: 3,
      name: "Sebo do Zé",
      state: "RS",
      city: "Porto Alegre",
      createdAt: "05/08/2015",
      rating: 85
    },
    {
      id: 4,
      name: "Sebo do João",
      state: "MG",
      city: "Belo Horizonte",
      createdAt: "12/05/2016",
      rating: 20
    }

  ]);

  const [filtered, setFiltered] = useState(stores);

  function handleSearch(value: string) {
    const result = stores.filter(s =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  }

  function handleFilterState(states: string[]) {
    if (states.length === 0) {
      setFiltered(stores);
      return;
    }

    const result = stores.filter(s =>
      states.includes(s.state)
    );

    setFiltered(result);
  }

  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">

      <Sidebar
        onSearch={handleSearch}
        onFilterState={handleFilterState}
      />

      <main className="flex-1 p-6">

        {/* HEADER LISTA */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold">
            Sebos e Livreiros
          </h1>
        </div>

        {/* COLUNAS */}
        <div className="flex justify-between text-sm text-gray-500 mb-2 px-6">
          <span className="w-1/4">Sebos e livreiros</span>
          <span className="w-1/6">Estado</span>
          <span className="w-1/5">Cidade</span>
          <span className="w-1/5">Membro desde</span>
          <span className="w-1/5">Avaliação</span>
        </div>

        {/* LISTA */}
        <div className="flex flex-col gap-2">
          {filtered.map((store) => (
            <SeboCard key={store.id} store={store} />
          ))}
        </div>

      </main>
    </div>
  );
}