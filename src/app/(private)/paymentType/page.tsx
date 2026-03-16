"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { usePaymentTypePage } from "./hook/usePaymentTypePage";
import { EditPaymentTypeModal } from "./modal/EditPaymentTypeModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";

// Toggle component reutilizable
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked ? "#185FA5" : "#d1d5db",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
}

export default function PaymentTypePage() {
  const page = usePaymentTypePage();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<PaymentType>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: "Recargo",
      accessorKey: "applySurcharge",
      cell: ({ row }) =>
        row.original.applySurcharge ? (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: "#FAEEDA", color: "#854F0B" }}
          >
            +{row.original.surchargePercent}%
          </span>
        ) : (
          <span className="text-xs text-gray-400">Sin recargo</span>
        ),
    },
    {
      header: "Desc. app",
      accessorKey: "applyDiscount",
      cell: ({ row }) =>
        row.original.applyDiscount ? (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: "#E6F1FB", color: "#185FA5" }}
          >
            {row.original.discountPercent}%
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nuevo ${vocab.paymentType.toLowerCase()}`}>
      <Input
        label="Nombre"
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Ej: Efectivo, Débito..."
      />

      <div className="pt-1">
        <Toggle
          checked={page.applySurcharge}
          onChange={page.setApplySurcharge}
          label="Aplicar recargo"
        />
        {page.applySurcharge && (
          <div className="mt-3">
            <Input
              label="% de recargo"
              value={String(page.surchargePercent)}
              onChange={(v) => page.setSurchargePercent(Number(v))}
              placeholder="Ej: 10"
            />
          </div>
        )}
      </div>

      <div className="pt-1">
        <Toggle
          checked={page.applyDiscount}
          onChange={page.setApplyDiscount}
          label="Descuento de app"
        />
        {page.applyDiscount && (
          <div className="mt-3">
            <Input
              label="% descuento app"
              value={String(page.discountPercent)}
              onChange={(v) => page.setDiscountPercent(Number(v))}
              placeholder="Ej: 3"
            />
          </div>
        )}
      </div>

      <Btn
        variant="primary"
        className="w-full justify-center mt-1"
        onClick={page.addPaymentType}
        loading={page.isCreating}
        disabled={!page.name.trim()}
      >
        Guardar
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={vocab.paymentType}
      subtitle="Configurá recargas y descuentos por medio de pago"
      sidebar={formPanel}
    >
      <FilterBar onClear={() => page.setSearch("")}>
        <Input
          label=""
          value={page.search}
          onChange={page.setSearch}
          placeholder={`Buscar ${vocab.paymentType.toLowerCase()}...`}
        />
      </FilterBar>

      <ContentCard
        title="Medios configurados"
        count={
          !page.isLoading
            ? `${page.paymentTypes.length} activo${page.paymentTypes.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<PaymentType>
          data={page.paymentTypes}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.paymentType.toLowerCase()}s`}
          rowActions={[
            {
              id: "edit",
              label: "Editar",
              variant: "edit",
              onClick: page.openEditModal,
            },
            {
              id: "delete",
              label: page.isDeleting ? "Eliminando…" : "Eliminar",
              variant: "delete",
              disabled: () => page.isDeleting,
              onClick: (row) => {
                if (window.confirm(`¿Eliminar "${row.name}"?`))
                  page.removePaymentType(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {page.editingPaymentType && (
        <EditPaymentTypeModal
          paymentType={page.editingPaymentType}
          isUpdating={page.isUpdating}
          onChange={page.setEditingPaymentType}
          onClose={() => page.setEditingPaymentType(null)}
          onSave={page.savePaymentType}
        />
      )}
    </PageLayout>
  );
}
