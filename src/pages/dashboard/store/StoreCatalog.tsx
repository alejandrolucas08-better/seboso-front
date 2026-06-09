import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CatalogItem } from "../../../types/catalog";
import { listCatalogByStore } from "../../../services/book.service";


export default function StoreCatalog() {
  const { id } = useParams<{ id: string }>(); // Tipando o parâmetro da URL como string

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  useEffect(() => {
    async function loadCatalog() {
      if (!id) return;

      const data = await listCatalogByStore(Number(id));
      console.log(data);
      setCatalog(data);
    }

    loadCatalog();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Catálogo do Sebo
      </h1>

      <p className="text-gray-600 mb-4">
        {catalog.length} livros encontrados
      </p>

      <ul className="space-y-2">
        {catalog.map((item, index) => (
          <li key={index} className="p-3 border rounded bg-white shadow-sm flex justify-between">
            <div>
              <p className="font-semibold">Livro ID: {item.book_id}</p>
              <p className="text-sm text-gray-500">Estado: {item.state}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#A85F42]">R$ {item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}