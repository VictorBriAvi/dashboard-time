"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useClientSearch } from "@/data/hooks/client/useClientSearch";
import { useEmployeeSearch } from "@/data/hooks/employee/useEmployeeSearch";
import { useServiceTypeSearch } from "@/data/hooks/serviceType/useServiceTypeSearch";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { PaymentModal } from "@/ui/sales/Modals/PaymentModal";
import { SaleDetailUI, useNewSale } from "./hooks/useNewSale";
import { ServiceOption } from "@/core/models/sales/SaleDetailUI";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { formatARS } from "@/core/utils/format";
import { useAuthStore } from "@/shared/store/useAuthStore";

export default function NewSalePage() {
  const sale = useNewSale();
  const { vocab } = useAuthStore();

  const { loadClients }           = useClientSearch();
  const { loadEmployees }         = useEmployeeSearch();
  const { loadServiceType }       = useServiceTypeSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

  const columns: ColumnDef<SaleDetailUI>[] = [
    {
      header: vocab.service,
      accessorKey: "serviceName",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: vocab.employee,
      accessorKey: "employeeName",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>()}</span>
      ),
    },
    {
      header: "Precio",
      accessorKey: "unitPrice",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Desc. %",
      accessorKey: "discountPercent",
      cell: ({ getValue }) => {
        const v = getValue<number>();
        return v > 0
          ? <span className="text-orange-600">{v}%</span>
          : <span className="text-gray-400">—</span>;
      },
    },
    {
      header: "Adicional",
      accessorKey: "additionalCharge",
      cell: ({ getValue }) => {
        const v = getValue<number>();
        return v > 0 ? formatARS(v) : <span className="text-gray-400">—</span>;
      },
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-900">{formatARS(getValue<number>())}</span>
      ),
    },
    {
      header: "",
      id: "remove",
      cell: ({ row }) => (
        <button
          onClick={() => sale.removeService(row.index)}
          className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
        >
          Quitar
        </button>
      ),
    },
  ];

  // Panel izquierdo — pasos guiados
  const formPanel = (
    <div className="flex flex-col gap-4">
      {/* Paso 1 — Cliente */}
      <FormPanel title="1. Cliente">
        <AsyncSearchableSelect
          label={vocab.client}
          loadOptions={loadClients}
          value={sale.clientSelected}
          onChange={sale.setClientSelected}
        />
      </FormPanel>

      {/* Paso 2 — Agregar servicio */}
      <FormPanel title="2. Agregar servicio">
        <AsyncSearchableSelect
          label={vocab.service}
          loadOptions={loadServiceType}
          value={sale.serviceSelected as any}
          onChange={(opt: any) => sale.setServiceSelected(opt)}
        />
        <AsyncSearchableSelect
          label={vocab.employee}
          loadOptions={loadEmployees}
          value={sale.employeeSelected}
          onChange={sale.setEmployeeSelected}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Descuento (%)"
            value={String(sale.discountPercent)}
            onChange={(v) => sale.setDiscountPercent(Number(v))}
          />
          <Input
            label="Adicional ($)"
            value={String(sale.additionalCharge)}
            onChange={(v) => sale.setAdditionalCharge(Math.max(0, Number(v)))}
          />
        </div>
        <Btn
          variant="secondary"
          className="w-full justify-center"
          onClick={sale.addService}
          disabled={!sale.serviceSelected || !sale.employeeSelected}
        >
          + Agregar servicio
        </Btn>
      </FormPanel>
    </div>
  );

  return (
    <PageLayout
      title={`Nueva ${vocab.sale.toLowerCase()}`}
      subtitle="Registrá los servicios y el cobro"
      sidebar={formPanel}
      sidebarWidth={260}
      actions={
        <Link href="/sales">
          <Btn variant="ghost">← Cancelar</Btn>
        </Link>
      }
    >
      {/* Tabla de servicios agregados */}
      <ContentCard
        title={`Servicios de la ${vocab.sale.toLowerCase()}`}
        count={
          sale.clientSelected
            ? sale.clientSelected.label
            : "Sin cliente seleccionado"
        }
      >
        <GenericDataTable<SaleDetailUI>
          data={sale.saleDetailsUI}
          columns={columns}
          rowKey={(_, index) => index}
          emptyMessage={`Aún no se agregaron ${vocab.service.toLowerCase()}s`}
          skeletonRows={3}
        />
      </ContentCard>

      {/* Footer con total + cobrar */}
      <div
        className="flex items-center justify-between bg-white rounded-xl px-5 py-4"
        style={{ border: "0.5px solid #e5e7eb" }}
      >
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Total a cobrar</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formatARS(sale.saleTotal)}
          </p>
        </div>
        <Btn
          variant="primary"
          className="px-6 py-2.5 text-sm"
          disabled={sale.saleDetailsDraft.length === 0 || !sale.clientSelected}
          loading={sale.isSaving}
          onClick={() => sale.setIsPaymentModalOpen(true)}
        >
          Cobrar →
        </Btn>
      </div>

      {/* Modal de pago */}
      <PaymentModal
        isOpen={sale.isPaymentModalOpen}
        totalAmount={sale.saleTotal}
        loadPaymentMethods={loadPaymentTypeSearch}
        isLoading={sale.isSaving}
        onClose={() => sale.setIsPaymentModalOpen(false)}
        onConfirm={sale.confirmSale}
      />
    </PageLayout>
  );
}
