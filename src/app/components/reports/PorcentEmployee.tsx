"use client";

import { useEmployeeSaleSummaryRaw } from "@/data/hooks/reports/useEmployeSaleSummary";
import DataTableTanstack from "@/ui/dataTable/DataTableTanstack";
import { useMemo, useState } from "react";

export default function PorcentajeEmpleados() {
  const today = new Date().toLocaleDateString("sv-SE");
  // Fechas ingresadas por el usuario
  const [fechaDesde, setFechaDesde] = useState(today);
  const [fechaHasta, setFechaHasta] = useState(today);

  // Fechas usadas realmente en el query
  const [queryDesde, setQueryDesde] = useState(today);
  const [queryHasta, setQueryHasta] = useState(today);

  // Empleado seleccionado
  const [empleadoId, setEmpleadoId] = useState<number | "">("");

  const { data, isLoading, error } = useEmployeeSaleSummaryRaw(
    queryDesde,
    queryHasta
  );

  const empleados = useMemo(() => {
    if (!data) return [];

    const mapa = new Map<number, string>();
    data.forEach((e) => mapa.set(e.empleadoId, e.empleado));

    return Array.from(mapa, ([id, nombre]) => ({
      id,
      nombre,
    }));
  }, [data]);

  const dataFiltrada = useMemo(() => {
    if (!empleadoId) return data ?? []; // si no hay filtro → mostrar todo
    return (data ?? []).filter((x) => x.empleadoId === empleadoId);
  }, [data, empleadoId]);

  const handleObtenerPorcentaje = () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor seleccioná ambas fechas (Desde y Hasta).");
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
  };

  return (
    <section className="mt-8">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Porcentaje de servicios por empleado
        </h2>

        <div className="grid grid-cols-12 gap-8">
          {/* TABLA */}
          <div className="col-span-12 lg:col-span-8">
            <DataTableTanstack
              title="Porcentajes por colaborador"
              data={dataFiltrada}
            />
          </div>

          {/* LADO DERECHO */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* SELECT EMPLEADO */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">
                Empleado
              </label>

              <select
                value={empleadoId}
                onChange={(e) =>
                  setEmpleadoId(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Todos</option>
                {empleados.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* FECHAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 font-medium mb-1">
                  Desde
                </label>
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 font-medium mb-1">
                  Hasta
                </label>
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* BOTÓN */}

            <div className="flex gap-4">
            <button
              onClick={handleObtenerPorcentaje}
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
              
            <p className="text-gray-600 text-sm">
              Filtrá por empleado o rango de fechas para ver el porcentaje
              generado.
            </p>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
