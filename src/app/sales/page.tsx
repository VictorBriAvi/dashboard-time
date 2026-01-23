"use client";

import Link from "next/link";
import SalesTable from "@/ui/sales/SalesTable";
import { useMemo, useState } from "react";
import { useSalesByDateRange } from "@/data/hooks/Sales/useSalesByDateRange";
import { salesByDateDomainService } from "@/core/services/Sales/SaleByDateService";

export default function SalesPage() {
  const today = new Date().toISOString().split("T")[0];

  // 👉 Estado del formulario (UI)
  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(today);

  // 👉 Estado real de la búsqueda
  const [queryDesde, setQueryDesde] = useState(today);
  const [queryHasta, setQueryHasta] = useState(today);

  const [employeeFilter, setEmployeeFilter] = useState<number | null>(null);

  const { data, isLoading, isError } = useSalesByDateRange(
    queryDesde,
    queryHasta,
  );

  const employees = useMemo(
    () => salesByDateDomainService.getEmployees(data),
    [data],
  );

  const filteredData = useMemo(
    () => salesByDateDomainService.filterByEmployee(data, employeeFilter),
    [data, employeeFilter],
  );

  const handleSearch = () => {
    setQueryDesde(desde);
    setQueryHasta(hasta);
  };

  return (
    <section className="max-w-7xl mx-auto space-y-6 mt-5">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* TÍTULO */}
        <div>
          <h2 className="text-xl font-semibold">Ventas</h2>
          <p className="text-sm text-gray-500">
            Ventas registradas
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Desde</label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Hasta</label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSearch}
            className="h-[38px] bg-gray-800 text-white px-5 rounded-md hover:bg-gray-900 transition"
          >
            Buscar
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/sales/new"
          className="inline-flex items-center justify-center h-[38px] bg-blue-600 text-white px-5 rounded-md hover:bg-blue-700 transition"
        >
          + Nueva venta
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <SalesTable data={filteredData} loading={isLoading} error={isError} />
      </div>
    </section>
  );
}
