"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type {
  SaleByDateRange,
  SaleDetail,
  SalePayment,
} from "@/core/models/SaleByDateRangeModel";

type ExpandedState = {
  servicios?: boolean;
  pagos?: boolean;
};

interface Props {
  data: SaleByDateRange[];
  loading?: boolean;
  error?: boolean;
}

export default function SalesDateTable({ data, loading, error }: Props) {
  const [expandedRows, setExpandedRows] = useState<
    Record<number, ExpandedState>
  >({});

  const toggle = (rowIndex: number, key: keyof ExpandedState) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [key]: !prev[rowIndex]?.[key],
      },
    }));
  };

  // =============================
  // COLUMNAS TABLA PRINCIPAL
  // =============================
  const columns = useMemo<ColumnDef<SaleByDateRange>[]>(
    () => [
      {
        accessorKey: "dateSale",
        header: "Fecha",
        cell: (info) =>
          new Date(info.getValue<string>()).toLocaleDateString("es-AR"),
      },
      {
        accessorKey: "nameClient",
        header: "Cliente",
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
        cell: (info) =>
          `$${(info.getValue<number>() ?? 0).toLocaleString("es-AR")}`,
      },
      {
        id: "servicios",
        header: "Servicios",
        cell: ({ row }) => (
          <button
            className="text-blue-600 underline hover:text-blue-800"
            onClick={() => toggle(row.index, "servicios")}
          >
            Ver
          </button>
        ),
      },
      {
        id: "pagos",
        header: "Pagos",
        cell: ({ row }) => (
          <button
            className="text-green-600 underline hover:text-green-800"
            onClick={() => toggle(row.index, "pagos")}
          >
            Ver
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

  if (loading) return <p className="p-6 text-center">Cargando…</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error</p>;
  if (!data.length) return <p className="p-6 text-center">Sin datos</p>;

  return (
    <section className="bg-white rounded-2xl shadow-md p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => {
              const expanded = expandedRows[row.index];

              return (
                <>
                  {/* FILA PRINCIPAL */}
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* SUBTABLA SERVICIOS */}
                  {expanded?.servicios && (
                    <tr className="bg-gray-50">
                      <td colSpan={columns.length} className="p-4">
                        <ServicesTable data={row.original.saleDetail} />
                      </td>
                    </tr>
                  )}

                  {/* SUBTABLA PAGOS */}
                  {expanded?.pagos && (
                    <tr className="bg-gray-50">
                      <td colSpan={columns.length} className="p-4">
                        <PaymentsTable data={row.original.payments} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ServicesTable({ data }: { data: SaleDetail[] }) {
  return (
    <table className="w-full border rounded-lg bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 text-left text-sm">Servicio</th>
          <th className="px-3 py-2 text-left text-sm">Empleado</th>
          <th className="px-3 py-2 text-left text-sm">Precio</th>
          <th className="px-3 py-2 text-left text-sm">Descuento</th>
          <th className="px-3 py-2 text-left text-sm">Adicional</th>
          <th className="px-3 py-2 text-right text-sm">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((d) => (
          <tr key={d.id} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-sm">{d.nameServiceTypeSale}</td>
            <td className="px-3 py-2 text-sm">{d.nameEmployeeSale}</td>
            <td className="px-3 py-2 text-sm">{d.unitPrice}</td>
            <td className="px-3 py-2 text-sm">{d.discountPercent}</td>
            <td className="px-3 py-2 text-sm">{d.additionalCharge}</td>
            <td className="px-3 py-2 text-sm text-right">
              ${d.totalCalculated.toLocaleString("es-AR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PaymentsTable({ data }: { data: SalePayment[] }) {
  return (
    <table className="w-full border rounded-lg bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 text-left text-sm">Método</th>
          <th className="px-3 py-2 text-right text-sm">Monto</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((p, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-sm">{p.paymentTypeName}</td>
            <td className="px-3 py-2 text-sm text-right">
              ${p.amountPaid.toLocaleString("es-AR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
