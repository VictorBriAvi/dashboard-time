"use client";

import { useClientSearch } from "@/data/hooks/client/useClientSearch";
import { useEmployeeSearch } from "@/data/hooks/employee/useEmployeeSearch";
import { useServiceTypeSearch } from "@/data/hooks/serviceType/useServiceTypeSearch";
import { usePaymentTypeSearch } from "@/data/hooks/paymentType/usePaymentType";

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
  console.log(sale)
  
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
  const { loadPaymentType } = usePaymentTypeSearch();

  return (
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Nueva venta</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <AsyncSearchableSelect
            label="Cliente"
            loadOptions={loadClients}
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
            onChange={(value) => sale.setDiscountPercent(Number(value) || 0)}
          />

          <Input
            label="Adicional"
            value={sale.additionalCharge}
            onChange={(value) => sale.setAdditionalCharge(Number(value) || 0)}
          />


          <button
            onClick={sale.addService}
            className="w-full bg-black text-white rounded-md py-2 text-sm"
          >
            Agregar servicio
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <GenericDataTable<SaleDetailUI>
            data={sale.saleDetailsUI}
            columns={columns}
            rowKey={(_, index) => index}
          />

          <div className="flex justify-between mt-4">
          <strong>Total: {formatARS(sale.saleTotal)}</strong>



            <button
              onClick={() => sale.setIsPaymentModalOpen(true)}
              disabled={sale.saleDetailsDraft.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Cobrar
            </button>
          </div>

          <PaymentModal
            isOpen={sale.isPaymentModalOpen}
            totalAmount={sale.saleTotal}
            loadPaymentMethods={loadPaymentType}
            isLoading={sale.isSaving}
            onClose={() => sale.setIsPaymentModalOpen(false)}
            onConfirm={sale.confirmSale}
          />
        </div>
      </div>
    </section>
  );
}
