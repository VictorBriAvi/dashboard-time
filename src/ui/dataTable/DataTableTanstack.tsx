"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EmployeeSaleSummaryRaw } from "@/core/models/reports/EmployeeSaleSummaryReportModel";
import ModalServicios from "../ModalServicios";

export type ColaboradorRow = EmployeeSaleSummaryRaw;

interface DataTableTanstackProps {
  title?: string;
  data: ColaboradorRow[];
}

export default function DataTableTanstack({ data }: DataTableTanstackProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ColaboradorRow | null>(null);

  const columns = useMemo<ColumnDef<ColaboradorRow, any>[]>(
    () => [
      {
        accessorKey: "empleado",
        header: "Empleado",
      },
      {
        accessorKey: "totalVentas",
        header: "Total de Ventas",
        cell: (info) =>
          `$${(info.getValue<number>() ?? 0).toLocaleString("es-AR")}`,
      },
      {
        accessorKey: "porcentajePago",
        header: "Porcentaje",
        cell: (info) => `${(info.getValue<number>() ?? 0).toFixed(2)} %`,
      },
      {
        accessorKey: "totalAPagar",
        header: "Total a Pagar",
        cell: (info) =>
          `$${(info.getValue<number>() ?? 0).toLocaleString("es-AR")}`,
      },
      {
        accessorKey: "totalServicios",
        header: "Total Servicios",
        cell: (info) => info.getValue<number>() ?? 0,
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: (info) => (
          <button
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={() => {
              setSelected(info.row.original);
              setModalOpen(true);
            }}
          >
            Ver servicios
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full">
      {data.length === 0 ? (
        <div className="p-6 border border-dashed border-gray-200 rounded-lg text-gray-500 text-center">
          No hay datos disponibles.
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap ${
                        cell.column.id.includes("porcentaje")
                          ? "text-left text-blue-600 font-semibold"
                          : cell.column.id.includes("totalVentas") ||
                            cell.column.id.includes("totalAPagar")
                          ? "text-left text-gray-700"
                          : "text-gray-800"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ModalServicios
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        empleado={selected?.empleado}
        servicios={selected?.serviciosRealizados}
      />
    </section>
  );
}
