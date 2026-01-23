"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

/* =========================
   Types
========================= */

export type DetailPanel<T> = {
  id: string;
  label?: string;
  render: (row: T) => React.ReactNode;
};

export type RowAction<T> = {
  id: string;
  label: string | ((row: T) => string);
  visible?: boolean | ((row: T) => boolean);
  disabled?: boolean | ((row: T) => boolean); // 👈 clave
  onClick: (row: T) => void;
  variant?: "edit" | "delete";
};


type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  error?: boolean;
  rowKey?: (row: T, index: number) => string | number;
  detailPanels?: DetailPanel<T>[];
  rowActions?: RowAction<T>[];
  className?: string;
};

export default function GenericDataTable<T>({
  data,
  columns,
  loading,
  error,
  rowKey,
  detailPanels = [],
  rowActions = [],
  className,
}: Props<T>) {
  const [expanded, setExpanded] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const getRowId = (row: T, index: number) =>
    String(rowKey ? rowKey(row, index) : index);

  const togglePanel = (rowId: string, panelId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [panelId]: !prev[rowId]?.[panelId],
      },
    }));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  /* =========================
     States
  ========================= */

  if (loading) return <p className="p-6 text-center">Cargando…</p>;
  if (error)
    return <p className="p-6 text-center text-red-600">Error</p>;
  if (!data.length)
    return <p className="p-6 text-center">Sin datos</p>;

  /* =========================
     Render
  ========================= */

  return (
    <section
      className={`bg-white rounded-2xl shadow-md p-4 ${className ?? ""}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* ===== Header ===== */}
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {flexRender(
                      h.column.columnDef.header,
                      h.getContext()
                    )}
                  </th>
                ))}

                {detailPanels.map((p) => (
                  <th
                    key={p.id}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {p.label ?? p.id}
                  </th>
                ))}

                {rowActions.length > 0 && (
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Acciones
                  </th>
                )}
              </tr>
            ))}
          </thead>

          {/* ===== Body ===== */}
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row, rowIndex) => {
              const rowId = getRowId(row.original, rowIndex);
              const rowExpanded = expanded[rowId] ?? {};

              return (
                <React.Fragment key={rowId}>
                  <tr className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-2 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}

                    {/* Detail panels */}
                    {detailPanels.map((p) => (
                      <td
                        key={p.id}
                        className="px-4 py-2 text-sm"
                      >
                        <button
                          className="text-blue-600 underline hover:text-blue-800"
                          onClick={() =>
                            togglePanel(rowId, p.id)
                          }
                        >
                          {rowExpanded[p.id]
                            ? "Ocultar"
                            : "Ver"}
                        </button>
                      </td>
                    ))}

                    {/* Row actions */}
{/* Row actions */}
{rowActions.length > 0 && (
  <td className="px-4 py-2 text-sm">
    <div className="flex gap-2">
      {rowActions
        .filter((a) =>
          typeof a.visible === "function"
            ? a.visible(row.original)
            : a.visible !== false
        )
        .map((action) => {
          const isDisabled =
            typeof action.disabled === "function"
              ? action.disabled(row.original)
              : action.disabled === true;

          return (
            <button
              key={action.id}
              disabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                action.onClick(row.original);
              }}
              className={`
                px-3 py-1 rounded-md text-xs font-medium transition
                ${
                  action.variant === "delete"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }
              `}
            >
              {typeof action.label === "function"
                ? action.label(row.original)
                : action.label}
            </button>
          );
        })}
    </div>
  </td>
)}

                  </tr>

                  {/* Expanded panels */}
                  {detailPanels.map(
                    (p) =>
                      rowExpanded[p.id] && (
                        <tr
                          key={`${rowId}-${p.id}`}
                          className="bg-gray-50"
                        >
                          <td
                            colSpan={
                              table.getVisibleLeafColumns()
                                .length +
                              detailPanels.length +
                              (rowActions.length > 0
                                ? 1
                                : 0)
                            }
                            className="p-4"
                          >
                            {p.render(row.original)}
                          </td>
                        </tr>
                      )
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
