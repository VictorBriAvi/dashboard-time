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
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Ventas</h2>
        <p className="text-sm text-gray-500">
          Gestiona y filtra las ventas registradas
        </p>
      </div>

      <Link
        href="/sales/new"
        className="
          inline-flex items-center justify-center
          h-[40px]
          bg-blue-600 text-white
          px-5
          rounded-lg
          text-sm font-medium
          hover:bg-blue-700
          transition-colors
        "
      >
        + Nueva venta
      </Link>
    </div>

    {/* ===== Filtros ===== */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        salesPage.handleSearch();
      }}
      className="bg-white rounded-2xl shadow-md p-6 space-y-6"
    >
      <h3 className="text-sm font-medium text-gray-700">
        Filtros
      </h3>

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
            value={salesPage.toDate}
            onChange={(value) => salesPage.setToDate(value)}
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

      {/* ===== Acciones ===== */}
      <div className="border-t pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={salesPage.clearFilters}
          className="
            text-sm text-gray-500
            hover:text-gray-700
            transition-colors
          "
        >
          Limpiar filtros
        </button>

        <button
          type="submit"
          disabled={salesPage.isLoading}
          className="
            px-5 py-2.5
            bg-black text-white
            rounded-lg
            text-sm font-medium
            hover:bg-gray-800
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {salesPage.isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>

    {/* ===== Tabla ===== */}
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">

      {/* Contador de resultados */}
      {!salesPage.isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {salesPage.sales.length} resultado
            {salesPage.sales.length !== 1 && "s"} encontrado
            {salesPage.sales.length !== 1 && "s"}
          </p>
        </div>
      )}

      {/* Estado vacío */}
      {!salesPage.isLoading && salesPage.sales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            No se encontraron ventas con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <GenericDataTable<SaleTableModel>
          data={salesPage.sales}
          columns={columns}
          loading={salesPage.isLoading}
          error={salesPage.isError}
          rowKey={(row) => row.id}
        />
      )}
    </div>
  </section>
);
}
