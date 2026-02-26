"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleTableModel } from "@/core/models/sales/SaleTableModel";
import { formatARS } from "@/core/utils/format";

import { useSalesPage } from "./hook/useSalesPage";
import { useClientSearch } from "@/data/hooks/client/useClientSearch";
import { useEmployeeSearch } from "@/data/hooks/employee/useEmployeeSearch";
import { useServiceCategorieSearch } from "@/data/hooks/serviceCategorie/useServiceCategorie";

import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import Link from "next/link";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";

export default function SalesPage() {
  const salesPage = useSalesPage();
  const { loadClients } = useClientSearch();
  const { loadEmployees } = useEmployeeSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();
  const columns: ColumnDef<SaleTableModel>[] = [
    
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Fecha",
      accessorKey: "dateSale",
    },
    {
      header: "Cliente",
      accessorKey: "clientName",
    },
    {
      header: "Empleados",
      accessorKey: "employeesSummary",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.employeesSummary.map((emp, i) => (
            <span key={i}>{emp}</span>
          ))}
        </div>
      ),
    },
    {
      header: "Servicios",
      accessorKey: "servicesSummary",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.servicesSummary.map((serv, i) => (
            <span key={i}>{serv}</span>
          ))}
        </div>
      ),
    },
    {
      header: "Pagos",
      accessorKey: "paymentsSummary",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.paymentsSummary.map((p, i) => (
            <span key={i}>
              {p.name}: {formatARS(p.total)}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Total",
      accessorKey: "totalAmount",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
  ];

  return (
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Ventas</h2>
      </div>

      <Link
        href="/sales/new"
        className="inline-flex items-center justify-center h-[38px] bg-blue-600 text-white px-5 rounded-md hover:bg-blue-700 transition"
      >
        + Nueva venta
      </Link>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-3">
            <Input
              type="date"
              label="Desde"
              value={salesPage.fromDate}
              onChange={(value) => salesPage.setFromDate(value)}
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <Input
              type="date"
              label="Hasta"
              value={salesPage.fromDate}
              onChange={(value) => salesPage.setFromDate(value)}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <AsyncSearchableSelect
              label="Cliente"
              loadOptions={loadClients}
              value={salesPage.client}
              onChange={salesPage.setClient}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <AsyncSearchableSelect
              label="Empleado"
              loadOptions={loadEmployees}
              value={salesPage.employee}
              onChange={salesPage.setEmployee}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <AsyncSearchableSelect
              label="Tipo de pago"
              loadOptions={loadPaymentTypeSearch}
              value={salesPage.paymentType}
              onChange={salesPage.setPaymentType}
            />
          </div>

        </div>

        <button
          onClick={salesPage.clearFilters}
          className="text-sm underline text-gray-500"
        >
          Limpiar filtros
        </button>

        <button
          onClick={salesPage.handleSearch}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Buscar
        </button>

        <GenericDataTable<SaleTableModel>
          data={salesPage.sales}
          columns={columns}
          loading={salesPage.isLoading}
          error={salesPage.isError}
          rowKey={(row) => row.id}
        />
      </div>
    </section>
  );
}
