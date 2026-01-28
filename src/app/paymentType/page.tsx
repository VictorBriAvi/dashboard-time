"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { usePaymentTypePage } from "@/app/paymentType/hook/usePaymentTypePage";
import { EditPaymentTypeModal } from "./modal/EditPaymentTypeModal";
import { PaymentType } from "@/core/models/paymentType/PaymentType";

export default function PaymentTypePage() {
  const paymentTypePage = usePaymentTypePage();

  const columns: ColumnDef<PaymentType>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

  return (
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Tipos de pago</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Crear */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Nombre"
            value={paymentTypePage.name}
            onChange={paymentTypePage.setName}
            disabled={paymentTypePage.isCreating}
          />

          <button
            onClick={paymentTypePage.addPaymentType}
            disabled={paymentTypePage.isCreating}
            className={`w-full rounded-md py-2 text-sm transition ${
              paymentTypePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {paymentTypePage.isCreating
              ? "Agregando..."
              : "Agregar tipo de pago"}
          </button>
        </div>

        {/* Listado */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <Input
            label="Buscar tipo de pago"
            value={paymentTypePage.search}
            onChange={paymentTypePage.setSearch}
            placeholder="Ej: Efectivo"
          />

          <GenericDataTable<PaymentType>
            data={paymentTypePage.paymentTypes}
            columns={columns}
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
                label: paymentTypePage.isDeleting ? "Eliminando..." : "Eliminar",
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
              }
              ,
            ]}
          />
        </div>
      </div>

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
