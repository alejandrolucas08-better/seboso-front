import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../../../components/employees/EmployeeForm";

import {
  getEmployeesByStore,
  updateEmployeeRole,
} from "../../../services/userstore.service";

import type { UserStore } from "../../../types/userstore";

export default function EmployeeEdit() {
  const navigate = useNavigate();
  // id aqui representa o user_id do funcionário vindo da URL da rota
  const { storeId, id } = useParams<{ storeId: string; id: string }>();

  const [employee, setEmployee] = useState<UserStore | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let isMounted = true;
    
    async function executeFetch() {
      try {
        if (!storeId || !id) return;

        const employees = await getEmployeesByStore(Number(storeId));
        // Procura comparando com o user_id vindo da URL
        const found = employees.find((emp) => emp.user_id === Number(id));

        if (isMounted && found) {
          setEmployee(found);
        }
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, [storeId, id]);

  // Modificado para aceitar propriedades parciais, injetando o ID correto da URL por segurança
  async function handleUpdate(data: {
    user_id?: number;
    role: string;
  }) {
    try {
      if (!storeId || !id) return;

      // GARANTIA: Mesmo que o EmployeeForm não retorne o user_id, 
      // nós usamos o ID garantido que está na URL da rota.
      await updateEmployeeRole({
        user_id: data.user_id || Number(id),
        store_id: Number(storeId),
        role: data.role,
      });

      // Redireciona de volta para a listagem de funcionários da loja
      navigate(`/dashboard/stores/${storeId}/employees`);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  }

  if (loading) {
    return (
      <div className="w-full space-y-4 animate-pulse p-6">
        <div className="h-8 bg-gray-100 rounded-xl w-48 mb-4" />
        <div className="h-44 bg-gray-100 rounded-2xl w-full" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl border border-gray-100 max-w-sm mx-auto my-12 shadow-xs">
        <p className="text-sm font-semibold text-gray-800">Funcionário não encontrado.</p>
        <button 
          onClick={() => navigate(`/dashboard/stores/${storeId}/employees`)}
          className="mt-4 text-xs font-bold text-[#C37351] underline cursor-pointer"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl p-2">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Editar Funcionário
      </h1>

      <EmployeeForm
        initialData={employee}
        onSubmit={handleUpdate}
      />
    </div>
  );
}