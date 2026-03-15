"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { EditPaymentTypeModal } from "./modal/EditPaymentTypeModal";
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { usePaymentTypePage } from "./hook/usePaymentTypePage";
import { useAuthStore } from "@/shared/store/useAuthStore";

export default function PaymentTypePage() {
  const paymentTypePage = usePaymentTypePage();
  const { vocab } = useAuthStore();

  console.log(paymentTypePage);

  const columns: ColumnDef<PaymentType>[] = [
    { header: "Nombre", accessorKey: "name" },
    {
      header: "¿Aplica descuento?",
      accessorKey: "applyDiscount",
      cell: ({ getValue }: any) => (getValue() ? "Sí" : "No"),
    },
    { header: "Porcentaje descuento", accessorKey: "discountPercent" },
    {
      header: "¿Aplica recargo?",
      accessorKey: "applySurcharge",
      cell: ({ getValue }: any) => (getValue() ? "Sí" : "No"),
    },
    { header: "Porcentaje recargo", accessorKey: "surchargePercent" },
  ];

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {vocab.paymentType}s
          </h2>
          <p className="text-sm text-gray-500">
            Gestiona los {vocab.paymentType.toLowerCase()}s disponibles en el
            sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h3 className="text-sm font-medium text-gray-700">
            Nuevo {vocab.paymentType.toLowerCase()}
          </h3>

          <Input
            label="Nombre"
            value={paymentTypePage.name}
            onChange={paymentTypePage.setName}
            disabled={paymentTypePage.isCreating}
          />

          {/* Descuento */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="applyDiscount"
              checked={paymentTypePage.applyDiscount}
              onChange={(e) =>
                paymentTypePage.setApplyDiscount(e.target.checked)
              }
              disabled={paymentTypePage.isCreating}
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="applyDiscount" className="text-sm text-gray-700">
              Aplica descuento
            </label>
          </div>

          {paymentTypePage.applyDiscount && (
            <Input
              label="Porcentaje de descuento (%)"
              value={paymentTypePage.discountPercent}
              onChange={(v) => paymentTypePage.setDiscountPercent(Number(v))}
              disabled={paymentTypePage.isCreating}
            />
          )}

          {/* Recargo */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="applySurcharge"
              checked={paymentTypePage.applySurcharge}
              onChange={(e) =>
                paymentTypePage.setApplySurcharge(e.target.checked)
              }
              disabled={paymentTypePage.isCreating}
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="applySurcharge" className="text-sm text-gray-700">
              Aplica recargo
            </label>
          </div>

          {paymentTypePage.applySurcharge && (
            <Input
              label="Porcentaje de recargo (%)"
              value={paymentTypePage.surchargePercent}
              onChange={(v) => paymentTypePage.setSurchargePercent(Number(v))}
              disabled={paymentTypePage.isCreating}
            />
          )}

          <button
            onClick={paymentTypePage.addPaymentType}
            disabled={paymentTypePage.isCreating}
            className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
              paymentTypePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {paymentTypePage.isCreating
              ? "Agregando..."
              : `Agregar ${vocab.paymentType.toLowerCase()}`}
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <Input
                    label={`Buscar ${vocab.paymentType.toLowerCase()}`}
                    value={paymentTypePage.search}
                    onChange={paymentTypePage.setSearch}
                  />
                </div>
              </div>
              <div className="border-t pt-4 flex justify-start">
                <button
                  type="button"
                  onClick={() => paymentTypePage.setSearch("")}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {!paymentTypePage.isLoading && (
              <p className="text-sm text-gray-600">
                {paymentTypePage.paymentTypes.length}{" "}
                {vocab.paymentType.toLowerCase()}
                {paymentTypePage.paymentTypes.length !== 1 && "s"} encontrado
                {paymentTypePage.paymentTypes.length !== 1 && "s"}
              </p>
            )}
            {!paymentTypePage.isLoading &&
            paymentTypePage.paymentTypes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No se encontraron {vocab.paymentType.toLowerCase()}s.
                </p>
              </div>
            ) : (
              <GenericDataTable<PaymentType>
                data={paymentTypePage.paymentTypes}
                columns={columns}
                loading={paymentTypePage.isLoading}
                error={paymentTypePage.isError}
                rowKey={(row) => row.id}
                rowActions={[
                  {
                    id: "edit",
                    label: "Editar",
                    variant: "edit",
                    onClick: paymentTypePage.openEditModal,
                  },
                  {
                    id: "delete",
                    label: paymentTypePage.isDeleting
                      ? "Eliminando..."
                      : "Eliminar",
                    variant: "delete",
                    disabled: () => paymentTypePage.isDeleting,
                    onClick: (row) => {
                      if (window.confirm(`¿Eliminar "${row.name}"?`))
                        paymentTypePage.removePaymentType(row.id);
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {paymentTypePage.editingPaymentType && (
        <EditPaymentTypeModal
          paymentType={paymentTypePage.editingPaymentType}
          isUpdating={paymentTypePage.isUpdating}
          onChange={(updated: PaymentType) =>
            paymentTypePage.setEditingPaymentType(updated)
          }
          onClose={() => paymentTypePage.setEditingPaymentType(null)}
          onSave={paymentTypePage.savePaymentType}
        />
      )}
    </section>
  );
}
