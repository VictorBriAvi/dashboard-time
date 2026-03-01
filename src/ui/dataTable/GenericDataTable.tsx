"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type DetailPanel<T> = {
  id: string;
  label?: string;
  render: (row: T) => React.ReactNode;
};

export type RowAction<T> = {
  id: string;
  label: string | ((row: T) => string);
  visible?: boolean | ((row: T) => boolean);
  disabled?: boolean | ((row: T) => boolean);
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) => String(rowKey ? rowKey(row, index) : index),
  });

  const togglePanel = (rowId: string, panelId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [panelId]: !prev[rowId]?.[panelId],
      },
    }));
  };

  const totalColumns =
    table.getVisibleLeafColumns().length +
    detailPanels.length +
    (rowActions.length > 0 ? 1 : 0);

  if (loading) return <p className="p-6 text-center">Cargando…</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error</p>;

  return (
<section className={`bg-white rounded-2xl shadow-md p-4 ${className ?? ""}`}>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse">
      {/* ===== Header ===== */}
      <thead className="bg-gray-100 border-b">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}

            {detailPanels.map((p) => (
              <th
                key={p.id}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
              >
                {p.label ?? p.id}
              </th>
            ))}

            {rowActions.length > 0 && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Acciones
              </th>
            )}
          </tr>
        ))}
      </thead>

      {/* ===== Body ===== */}
      <tbody className="divide-y divide-gray-100">
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td colSpan={totalColumns} className="text-center py-6 text-gray-500">
              Sin datos
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => {
            const rowId = row.id;
            const rowExpanded = expanded[rowId] ?? {};

            return (
              <React.Fragment key={rowId}>
                <tr
                  tabIndex={0}
                  className="transition-colors duration-150 hover:bg-blue-100 focus-visible:outline-none focus-visible:bg-blue-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-700 transition-colors duration-150"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}

                  {/* Detail Panels */}
                  {detailPanels.map((p) => (
                    <td key={p.id} className="px-4 py-3 text-sm">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => togglePanel(rowId, p.id)}
                      >
                        {rowExpanded[p.id] ? "Ocultar" : "Ver"}
                      </button>
                    </td>
                  ))}

                  {/* Row Actions */}
                  {rowActions.length > 0 && (
                    <td className="px-4 py-3 text-sm">
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
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                                  action.variant === "delete"
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                } ${
                                  isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                                }`}
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

                {/* Expanded Panels */}
                {detailPanels.map(
                  (p) =>
                    rowExpanded[p.id] && (
                      <tr key={`${rowId}-${p.id}`} className="bg-gray-50">
                        <td colSpan={totalColumns} className="p-4">
                          {p.render(row.original)}
                        </td>
                      </tr>
                    )
                )}
              </React.Fragment>
            );
          })
        )}
      </tbody>
    </table>
  </div>
</section>
  );
}
