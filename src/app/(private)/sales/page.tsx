"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { SaleTableModel } from "@/core/models/sales/SaleTableModel";
import { formatARS } from "@/core/utils/format";
import { useSalesPage } from "./hook/useSalesPage";
import { useClientSearch } from "@/data/hooks/client/useClientSearch";
import { useEmployeeSearch } from "@/data/hooks/employee/useEmployeeSearch";
import { useServiceTypeSearch } from "@/data/hooks/serviceType/useServiceTypeSearch";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { EditSaleModal } from "@/ui/sales/EditSaleModal";
import { SaleDetailModal } from "@/ui/sales/Modals/SaleDetailModal";

export default function SalesPage() {
  const page = useSalesPage();
  const { vocab } = useAuthStore();
  const { loadClients }           = useClientSearch();
  const { loadEmployees }         = useEmployeeSearch();
  const { loadServiceType }       = useServiceTypeSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

  const columns: ColumnDef<SaleTableModel>[] = [
    {
      header: "#",
      accessorKey: "id",
      cell: ({ getValue }) => (
        <span className="text-gray-400 text-xs font-mono">#{getValue<number>()}</span>
      ),
    },
    {
      header: "Fecha",
      accessorKey: "dateSale",
      cell: ({ getValue }) => (
        <span className="text-gray-500 text-xs">{getValue<string>()}</span>
      ),
    },
    {
      header: vocab.client,
      accessorKey: "clientName",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: `${vocab.service}s`,
      accessorKey: "servicesSummary",
      cell: ({ getValue }) => (
        <div className="flex flex-wrap gap-1">
          {(getValue<string[]>() ?? []).map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{ background: "#f3f4f6", color: "#374151" }}
            >
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: `${vocab.employee}s`,
      accessorKey: "employeesSummary",
      cell: ({ getValue }) => (
        <span className="text-gray-500 text-xs">
          {(getValue<string[]>() ?? []).join(", ")}
        </span>
      ),
    },
    {
      header: "Pago",
      accessorKey: "paymentsSummary",
      cell: ({ getValue }) => (
        <div className="flex flex-wrap gap-1">
          {(getValue<{ name: string; total: number }[]>() ?? []).map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "#E6F1FB", color: "#185FA5" }}
            >
              {p.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Total",
      accessorKey: "totalAmount",
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-900">
          {formatARS(getValue<number>())}
        </span>
      ),
    },
  ];

  return (
    <PageLayout
      title={`${vocab.sale}s`}
      subtitle="Historial de ventas del negocio"
      fullWidth
      actions={
        <Link href="/sales/new">
          <Btn variant="primary">+ Nueva {vocab.sale.toLowerCase()}</Btn>
        </Link>
      }
    >
      {/* Filtros */}
      <FilterBar onSearch={page.handleSearch} onClear={page.clearFilters}>
        <Input
          label=""
          value={page.fromDate}
          onChange={page.setFromDate}
          type="date"
          placeholder="Desde"
        />
        <Input
          label=""
          value={page.toDate}
          onChange={page.setToDate}
          type="date"
          placeholder="Hasta"
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadClients}
          value={page.client}
          onChange={page.setClient}
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadEmployees}
          value={page.employee}
          onChange={page.setEmployee}
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadPaymentTypeSearch}
          value={page.paymentType}
          onChange={page.setPaymentType}
        />
      </FilterBar>

      {/* Tabla */}
      <ContentCard
        title={`${vocab.sale}s`}
        count={
          !page.isLoading
            ? `${page.sales?.length ?? 0} resultado${(page.sales?.length ?? 0) !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<SaleTableModel>
          data={page.sales ?? []}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.sale.toLowerCase()}s`}
          rowActions={[
            {
              id: "view",
              label: page.isLoadingDetail ? "Cargando…" : "Ver",
              disabled: () => page.isLoadingDetail,
              onClick: (row) => page.openDetailModal(row.id),
            },
            {
              id: "edit",
              label: page.isLoadingEdit ? "Cargando…" : "Editar",
              variant: "edit",
              disabled: () => page.isLoadingEdit,
              onClick: (row) => page.openEditModal(row.id),
            },
            {
              id: "delete",
              label: page.isDeleting ? "Eliminando…" : "Eliminar",
              variant: "delete",
              disabled: () => page.isDeleting,
              onClick: (row) => {
                if (window.confirm(`¿Eliminar ${vocab.sale.toLowerCase()} #${row.id}?`))
                  page.removeSale(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {/* Modal ver detalle */}
      {page.viewingSale && !page.isLoadingDetail && (
        <SaleDetailModal
          sale={page.viewingSale}
          onClose={page.closeDetailModal}
        />
      )}

      {/* Modal editar */}
      {page.editingSale && !page.isLoadingEdit && (
        <EditSaleModal
          sale={page.editingSale}
          isUpdating={page.isUpdating}
          loadClients={loadClients}
          loadEmployees={loadEmployees}
          loadServiceTypes={loadServiceType}
          onSave={page.saveEditSale}
          onClose={page.closeEditModal}
        />
      )}
    </PageLayout>
  );
}
