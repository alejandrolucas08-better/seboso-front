type Props = {
  pageTitle: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function Sidebar({ pageTitle, searchTerm, onSearchChange }: Props) {
  return (
    <aside 
      className="
        w-64 p-6 gap-4 border-r border-gray-200/60 sticky top-0 h-screen 
        bg-white/70 backdrop-blur-md shadow-sm z-10 transition-all duration-300
      "
    >
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Filtros
        </span>
        <h2 
          className="text-xl font-bold text-[#C37351] mt-1 leading-tight" 
          style={{ fontFamily: "Imbue" }}
        >
          Buscar por {pageTitle}
        </h2>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Digite o nome..."
          value={searchTerm} // 🟢 Controla o valor pelo estado do Pai
          onChange={(e) => onSearchChange(e.target.value)} // 🟢 Notifica o pai a cada tecla
          className="
            w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm
            text-gray-800 placeholder-gray-400 shadow-inner outline-none 
            focus:border-[#C37351]/60 focus:ring-4 focus:ring-[#C37351]/10
            transition-all duration-200
          "
        />
      </div>
    </aside>
  );
}