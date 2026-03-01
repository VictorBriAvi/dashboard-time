"use client";

import { useClientSearch } from "@/data/hooks/client/useClientSearch";
import { useEmployeeSearch } from "@/data/hooks/employee/useEmployeeSearch";
import { useServiceTypeSearch } from "@/data/hooks/serviceType/useServiceTypeSearch";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";

import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { PaymentModal } from "@/ui/sales/Modals/PaymentModal";

import { SaleDetailUI, useNewSale } from "./hooks/useNewSale";
// import { formatARS } from "@/core/utils/format";
import { ServiceOption } from "@/core/models/sales/SaleDetailUI";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { ColumnDef } from "@tanstack/react-table";
 import { formatARS, parseARS } from "@/core/utils/format";


export default function NewSalePage() {
  const sale = useNewSale();  

  const columns: ColumnDef<SaleDetailUI>[] = [
    {
      header: "Servicio",
      accessorKey: "serviceName",
    },
    {
      header: "Colaborador",
      accessorKey: "employeeName",
    },
    {
      header: "Precio",
      accessorKey: "unitPrice",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Descuento (%)",
      accessorKey: "discountPercent",
    },
    {
      header: "Adicional",
      accessorKey: "additionalCharge",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Acción",
      cell: ({ row }) => (
        <button
          onClick={() => sale.removeService(row.index)}
          className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700"
        >
          Eliminar
        </button>
      ),
    },
  ];

  const { loadClients } = useClientSearch();
  const { loadEmployees } = useEmployeeSearch();
  const { loadServiceType } = useServiceTypeSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

return (
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Nueva venta
        </h2>
        <p className="text-sm text-gray-500">
          Agrega servicios y procesa el cobro
        </p>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          Panel izquierdo (Agregar servicio)
      ====================== */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-700">
          Agregar servicio
        </h3>

        <AsyncSearchableSelect
          label="Cliente"
          loadOptions={loadClients}
          value={sale.clientSelected}
          onChange={sale.setClientSelected}
        />

        <AsyncSearchableSelect
          label="Servicio"
          loadOptions={loadServiceType}
          value={sale.serviceSelected}
          onChange={(o) => sale.setServiceSelected(o as ServiceOption)}
        />

        <AsyncSearchableSelect
          label="Colaborador"
          loadOptions={loadEmployees}
          value={sale.employeeSelected}
          onChange={sale.setEmployeeSelected}
        />

        <Input
          label="Precio"
          value={
            sale.serviceSelected
              ? formatARS(sale.serviceSelected.price)
              : ""
          }
          disabled
        />

        <Input
          label="Descuento (%)"
          value={sale.discountPercent}
          onChange={(value) =>
            sale.setDiscountPercent(Number(value) || 0)
          }
        />

        <Input
          label="Adicional"
          value={sale.additionalCharge}
          onChange={(value) =>
            sale.setAdditionalCharge(Number(value) || 0)
          }
        />

        <button
          onClick={sale.addService}
          className="
            w-full rounded-lg py-2.5 text-sm font-medium
            bg-black text-white
            hover:bg-gray-800
            transition-colors
          "
        >
          Agregar servicio
        </button>
      </div>

      {/* ======================
          Panel derecho
      ====================== */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        {/* ===== Card Tabla ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          {/* Contador */}
          <p className="text-sm text-gray-600">
            {sale.saleDetailsUI.length} servicio
            {sale.saleDetailsUI.length !== 1 && "s"} agregado
            {sale.saleDetailsUI.length !== 1 && "s"}
          </p>

          {/* Estado vacío */}
          {sale.saleDetailsUI.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                Aún no se agregaron servicios a la venta.
              </p>
            </div>
          ) : (
            <GenericDataTable<SaleDetailUI>
              data={sale.saleDetailsUI}
              columns={columns}
              rowKey={(_, index) => index}
            />
          )}

          {/* Total + acción */}
          <div className="border-t pt-4 flex items-center justify-between">
            <strong className="text-lg text-gray-800">
              Total: {formatARS(sale.saleTotal)}
            </strong>

            <button
              onClick={() => sale.setIsPaymentModalOpen(true)}
              disabled={sale.saleDetailsDraft.length === 0}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  sale.saleDetailsDraft.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }
              `}
            >
              Cobrar
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* ===== Modal Pago ===== */}
    <PaymentModal
      isOpen={sale.isPaymentModalOpen}
      totalAmount={sale.saleTotal}
      loadPaymentMethods={loadPaymentTypeSearch}
      isLoading={sale.isSaving}
      onClose={() => sale.setIsPaymentModalOpen(false)}
      onConfirm={sale.confirmSale}
    />
  </section>
);
}
