import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Store, ChevronDown, ChevronRight, Layers, Users, Settings } from "lucide-react";
import { getStoreById } from "../../services/store.service";
import type { UserStore } from "../../types/userstore";

type SidebarStoreItemGroupProps = {
  storeRelation: UserStore;
};

export default function SidebarStoreItemGroup({ storeRelation }: SidebarStoreItemGroupProps) {
  const [storeName, setStoreName] = useState<string>("Carregando sebo...");
  const location = useLocation();
  const storeId = storeRelation?.store_id;

  const isCurrentStoreActive = location.pathname.includes(`/dashboard/stores/${storeId}`);

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    return location.pathname.includes(`/dashboard/stores/${storeId}`);
  });

  useEffect(() => {
    // Se não houver um storeId válido, não tentamos carregar o nome do sebo
    if (!storeId) return;

    async function loadStoreName() {
      try {
        const storeData = await getStoreById(storeId);
        setStoreName(storeData.name);
      } catch (err) {
        console.error(`Não foi possível carregar o nome do sebo ${storeId}:`, err);
        setStoreName(`Sebo #${storeId}`);
      }
    }
    loadStoreName();
  }, [storeId]);

  // Se o componente for chamado sem um id real, não renderiza nada na árvore
  if (!storeId) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group
          ${isCurrentStoreActive && !isOpen ? "bg-[#FDF6F3] text-[#C37351] font-bold" : "text-gray-700 hover:bg-gray-50"}
        `}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Store size={16} className={isCurrentStoreActive ? "text-[#C37351]" : "text-gray-400 group-hover:text-gray-600"} />
          <span className="truncate text-left">{storeName}</span>
          <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wide shrink-0">
            {storeRelation.role === "worker" ? "employee" : storeRelation.role}
          </span>
        </div>
        
        {isOpen ? (
          <ChevronDown size={14} className="text-gray-400 shrink-0 ml-1" />
        ) : (
          <ChevronRight size={14} className="text-gray-400 shrink-0 ml-1" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-0.5 pl-7 mt-0.5 border-l-2 border-gray-100 ml-5">
          <NavLink
            to={`/dashboard/stores/${storeId}/catalog`}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
               ${isActive ? "text-[#C37351] font-bold bg-[#FDF6F3]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
            }
          >
            <Layers size={14} />
            Gerenciar Catálogo
          </NavLink>

          {storeRelation.role === "owner" && (
            <NavLink
              to={`/dashboard/stores/${storeId}/employees`}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                 ${isActive ? "text-[#C37351] font-bold bg-[#FDF6F3]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
              }
            >
              <Users size={14} />
              Gerenciar Funcionários
            </NavLink>
          )}

          <NavLink
            to={`/dashboard/stores/${storeId}/settings`}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
               ${isActive ? "text-[#C37351] font-bold bg-[#FDF6F3]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
            }
          >
            <Settings size={14} />
            Dados do Sebo
          </NavLink>
        </div>
      )}
    </div>
  );
}