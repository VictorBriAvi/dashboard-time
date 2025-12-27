"use client";

import { useSalesByDateRange } from "@/data/hooks/useSalesByDateRange";
import SalesDataTable from "@/ui/SalesDataTable";
import { useMemo, useState } from "react";
import type { SaleByDateRange } from "@/core/models/SaleByDateRangeModel";

export default function SalesByDate() {
  const today = new Date().toLocaleDateString("sv-SE");

  const [fechaDesde, setFechaDesde] = useState(today);
  const [fechaHasta, setFechaHasta] = useState(today);

  const [queryDesde, setQueryDesde] = useState(today);
  const [queryHasta, setQueryHasta] = useState(today);

  // 👉 empleado seleccionado
  const [employeeFilter, setEmployeeFilter] = useState<number | null>(null);

  const { data, isLoading, isError } = useSalesByDateRange(
    queryDesde,
    queryHasta
  );

  const employees = useMemo(() => {
    if (!data) return [];

    const map = new Map<number, string>();

    data.forEach((sale) => {
      sale.saleDetail.forEach((d) => {
        if (!map.has(d.employeeId)) {
          map.set(d.employeeId, d.nameEmployeeSale);
        }
      });
    });

    return Array.from(map, ([id, name]) => ({
      id,
      name,
    }));
  }, [data]);

  const handleBuscar = () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Seleccioná ambas fechas");
      return;
    }
    setQueryDesde(fechaDesde);
    setQueryHasta(fechaHasta);
  };

  const handleLimpiar = () => {
    setFechaDesde("");
    setFechaHasta("");
    setQueryDesde("");
    setQueryHasta("");
    setEmployeeFilter(null);
  };

  // =============================
  // 🔥 FILTRO POR EMPLEADO (CLAVE)
  // =============================
  const filteredData = useMemo<SaleByDateRange[]>(() => {
    if (!data) return [];
    if (!employeeFilter) return data;

    return data
      .map((sale) => {
        const filteredDetails = sale.saleDetail.filter(
          (d) => d.employeeId === employeeFilter
        );

        if (filteredDetails.length === 0) return null;

        return {
          ...sale,
          saleDetail: filteredDetails,
          totalAmount: filteredDetails.reduce(
            (sum, d) => sum + d.totalCalculated,
            0
          ),
        };
      })
      .filter(Boolean) as SaleByDateRange[];
  }, [data, employeeFilter]);

  return (
    <section className="mt-8">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Ventas por rango de fechas
        </h2>

        <div className="grid grid-cols-12 gap-8">
          {/* FILTROS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* FECHAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Desde
                </label>
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Hasta
                </label>
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* EMPLEADO */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Empleado
              </label>
              <select
                className="border rounded-lg px-3 py-2"
                value={employeeFilter ?? ""}
                onChange={(e) =>
                  setEmployeeFilter(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <option value="">Todos</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* BOTONES */}
            <div className="flex gap-4">
              <button
                onClick={handleBuscar}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
              >
                Buscar
              </button>

              <button
                onClick={handleLimpiar}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* TABLA */}
          <div className="col-span-12 lg:col-span-8">
            <SalesDataTable
              data={filteredData}
              loading={isLoading}
              error={isError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
