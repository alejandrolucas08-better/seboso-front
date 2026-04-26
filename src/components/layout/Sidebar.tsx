import { useState } from "react"; // Importa o hook useState para gerenciar o estado do componente

// Componente Sidebar para busca e filtro de sebos
type Props = {
  onSearch: (value: string) => void;
  onFilterState: (states: string[]) => void;
};

export default function Sidebar({ onSearch, onFilterState }: Props) {

  const [search, setSearch] = useState("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const states = ["CE", "SP", "RJ", "BA", "RS"];

  function handleSearch() {
    onSearch(search);
  }

  function toggleState(state: string) {
    const updated = selectedStates.includes(state)
      ? selectedStates.filter(s => s !== state)
      : [...selectedStates, state];

    setSelectedStates(updated);
    onFilterState(updated);
  }

  return (
    <aside className="w-72 p-5 bg-white border-r border-[#E5E5E5]">

      {/* BUSCA */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Buscar Sebo</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome..."
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* FILTRO ESTADO */}
      <div>
        <h2 className="font-semibold mb-2">Estado</h2>

        <div className="flex flex-col gap-2">
          {states.map((state) => (
            <label key={state} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStates.includes(state)}
                onChange={() => toggleState(state)}
              />
              {state}
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
}
