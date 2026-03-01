"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { EditPaymentTypeModal } from "./modal/EditPaymentTypeModal";
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { usePaymentTypePage } from "./hook/usePaymentTypePage";

export default function PaymentTypePage() {
  const paymentTypePage = usePaymentTypePage();

  const columns: ColumnDef<PaymentType>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

return (
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Tipos de pago
        </h2>
        <p className="text-sm text-gray-500">
          Gestiona los métodos de pago disponibles en el sistema
        </p>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          Panel izquierdo (Crear tipo de pago)
      ====================== */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-700">
          Nuevo tipo de pago
        </h3>

        <Input
          label="Nombre"
          value={paymentTypePage.name}
          onChange={paymentTypePage.setName}
          disabled={paymentTypePage.isCreating}
        />

        <button
          onClick={paymentTypePage.addPaymentType}
          disabled={paymentTypePage.isCreating}
          className={`
            w-full rounded-lg py-2.5 text-sm font-medium transition-colors
            ${
              paymentTypePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {paymentTypePage.isCreating
            ? "Agregando..."
            : "Agregar tipo de pago"}
        </button>
      </div>

      {/* ======================
          Panel derecho
      ====================== */}
      <div className="col-span-12 lg:col-span-9 space-y-6">

        {/* ===== Card Filtros ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <h3 className="text-sm font-medium text-gray-700">
              Filtros
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <Input
                  label="Buscar tipo de pago"
                  value={paymentTypePage.search}
                  onChange={paymentTypePage.setSearch}
                  placeholder="Ej: Efectivo"
                />
              </div>
            </div>

            <div className="border-t pt-4 flex justify-start">
              <button
                type="button"
                onClick={() => {
                  paymentTypePage.setSearch("");
                }}
                className="
                  text-sm text-gray-500
                  hover:text-gray-700
                  transition-colors
                "
              >
                Limpiar filtros
              </button>
            </div>
          </form>
        </div>

        {/* ===== Card Tabla ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">

          {/* Contador */}
          {!paymentTypePage.isLoading && (
            <p className="text-sm text-gray-600">
              {paymentTypePage.paymentTypes.length} tipo
              {paymentTypePage.paymentTypes.length !== 1 && "s"} de pago encontrado
              {paymentTypePage.paymentTypes.length !== 1 && "s"}
            </p>
          )}

          {/* Estado vacío */}
          {!paymentTypePage.isLoading &&
          paymentTypePage.paymentTypes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No se encontraron tipos de pago con los filtros seleccionados.
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
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar el tipo de pago "${row.name}"?`
                      )
                    ) {
                      paymentTypePage.removePaymentType(row.id);
                    }
                  },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>

    {/* Modal editar tipo de pago */}
    {paymentTypePage.editingPaymentType && (
      <EditPaymentTypeModal
        paymentType={paymentTypePage.editingPaymentType}
        isUpdating={paymentTypePage.isUpdating}
        onChangeName={(value) =>
          paymentTypePage.setEditingPaymentType({
            ...paymentTypePage.editingPaymentType!,
            name: value,
          })
        }
        onClose={() => paymentTypePage.setEditingPaymentType(null)}
        onSave={paymentTypePage.savePaymentType}
      />
    )}
  </section>
);
}
