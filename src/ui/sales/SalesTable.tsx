// SalesByDateTable.tsx (reemplaza tu componente original)
"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable, { DetailPanel } from "@/ui/dataTable/GenericDataTable";
import type {
  SaleByDateRange,
  SaleDetail,
  SalePayment,
} from "@/core/models/reports/SaleByDateRangeModel";

import { useMemo } from "react";
import ServicesTable from "./ServicesTable";
import PaymentsTable from "./PaymentsTable";

const formatCurrency = (v?: number) => `$${(v ?? 0).toLocaleString("es-AR")}`;

type Props = {
  data: SaleByDateRange[];
  loading?: boolean;
  error?: boolean;
};

export default function SalesTable({ data, loading, error }: Props) {
  const columns = useMemo<ColumnDef<SaleByDateRange>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
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
        cell: (info) => formatCurrency(info.getValue<number>()),
      },
    ],
    []
  );

  const detailPanels: DetailPanel<SaleByDateRange>[] = [
    {
      id: "servicios",
      label: "Servicios",
      render: (row) => <ServicesTable data={row.saleDetail} />,
    },
    {
      id: "pagos",
      label: "Pagos",
      render: (row) => <PaymentsTable data={row.payments} />,
    },
  ];

  return (
    <GenericDataTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      rowKey={(r) => r.id ?? r.dateSale} // usa un id único si lo tienes
      detailPanels={detailPanels}
    />
  );
}
