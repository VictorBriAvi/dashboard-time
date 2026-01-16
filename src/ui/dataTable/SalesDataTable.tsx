// SalesByDateTable.tsx (reemplaza tu componente original)
"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable, { DetailPanel } from "@/ui/dataTable/GenericDataTable";
import type {
  SaleByDateRange,
  SaleDetail,
  SalePayment,
} from "@/core/models/reports/SaleByDateRangeModel";
import ServicesTable from "../sales/ServicesTable"; // extrae estos a archivos independientes
import PaymentsTable from "../sales/PaymentsTable";
import { useMemo } from "react";

const formatCurrency = (v?: number) => `$${(v ?? 0).toLocaleString("es-AR")}`;

type Props = {
  data: SaleByDateRange[];
  loading?: boolean;
  error?: boolean;
};

export default function SalesDateTable({ data, loading, error }: Props) {
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
