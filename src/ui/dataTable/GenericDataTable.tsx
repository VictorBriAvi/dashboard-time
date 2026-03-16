"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  variant?: "default" | "edit" | "delete";
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
  emptyMessage?: string;
  skeletonRows?: number;
};

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-3.5 rounded-md animate-pulse"
            style={{
              background: "var(--skeleton-bg, #e5e7eb)",
              width: i === 0 ? "60%" : i === cols - 1 ? "40%" : "80%",
            }}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={999}>
        <div className="flex flex-col items-center justify-center py-14 gap-3">
          {/* Simple icon using CSS */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4a6 6 0 100 12A6 6 0 0010 4zM2 10a8 8 0 1116 0A8 8 0 012 10z"
                fill="#9ca3af"
              />
              <path
                d="M10 7v3m0 3h.01"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
      </td>
    </tr>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────

function ActionButton({
  label,
  variant = "default",
  disabled,
  onClick,
}: {
  label: string;
  variant?: "default" | "edit" | "delete";
  disabled?: boolean;
  onClick: () => void;
}) {
  const base =
    "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-150 select-none";

  const variants = {
    default:
      "border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300",
    edit: "border-blue-200 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300",
    delete:
      "border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GenericDataTable<T>({
  data,
  columns,
  loading = false,
  error = false,
  rowKey,
  detailPanels = [],
  rowActions = [],
  className,
  emptyMessage = "No se encontraron registros",
  skeletonRows = 5,
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

  const visibleCols = table.getVisibleLeafColumns().length;
  const totalCols =
    visibleCols +
    detailPanels.length +
    (rowActions.length > 0 ? 1 : 0);

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-3 rounded-xl border border-red-100 bg-red-50">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4m0 3h.01"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-sm text-red-500">
          Error al cargar los datos. Intentá recargar la página.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-100 bg-white ${className ?? ""}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* ── Header ── */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}

                {/* Panel toggle headers */}
                {detailPanels.map((p) => (
                  <th
                    key={p.id}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60"
                  >
                    {p.label ?? ""}
                  </th>
                ))}

                {/* Actions header */}
                {rowActions.length > 0 && (
                  <th className="px-4 py-3 bg-gray-50/60" />
                )}
              </tr>
            ))}
          </thead>

          {/* ── Body ── */}
          <tbody className="divide-y divide-gray-50">
            {/* Loading skeleton */}
            {loading &&
              Array.from({ length: skeletonRows }).map((_, i) => (
                <SkeletonRow key={i} cols={totalCols} />
              ))}

            {/* Empty state */}
            {!loading && data.length === 0 && (
              <EmptyState message={emptyMessage} />
            )}

            {/* Data rows */}
            {!loading &&
              table.getRowModel().rows.map((row) => {
                const rowId = row.id;
                const rowExpanded = expanded[rowId] ?? {};

                return (
                  <React.Fragment key={rowId}>
                    <tr className="hover:bg-gray-50/50 transition-colors duration-100">
                      {/* Data cells */}
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}

                      {/* Detail panel toggles */}
                      {detailPanels.map((p) => (
                        <td key={p.id} className="px-4 py-3">
                          <button
                            onClick={() => togglePanel(rowId, p.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 transition-all"
                          >
                            <span>{p.label}</span>
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              style={{
                                transform: rowExpanded[p.id]
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.15s",
                              }}
                            >
                              <path
                                d="M2 3.5l3 3 3-3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </td>
                      ))}

                      {/* Row actions */}
                      {rowActions.length > 0 && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
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

                                const label =
                                  typeof action.label === "function"
                                    ? action.label(row.original)
                                    : action.label;

                                return (
                                  <ActionButton
                                    key={action.id}
                                    label={label}
                                    variant={action.variant ?? "default"}
                                    disabled={isDisabled}
                                    onClick={() => {
                                      if (!isDisabled) action.onClick(row.original);
                                    }}
                                  />
                                );
                              })}
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* Expanded detail panels */}
                    {detailPanels.map(
                      (p) =>
                        rowExpanded[p.id] && (
                          <tr
                            key={`${rowId}-${p.id}`}
                            className="bg-blue-50/30"
                          >
                            <td
                              colSpan={totalCols}
                              className="px-6 py-4 border-t border-blue-100/50"
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
    </div>
  );
}
