"use client";

import { useState } from "react";
import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";
import { PaymentModal } from "@/ui/sales/Modals/PaymentModal";
import { PaymentItem } from "@/ui/sales/Modals/Hook/usePaymentModal";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatARS } from "@/core/utils/format";
import { Sale } from "@/core/models/sales/Sale";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

type ServiceRow = {
  serviceTypeId: number;
  serviceName: string;
  employeeId: number;
  employeeName: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  total: number;
};

type Props = {
  sale: Sale;
  isUpdating: boolean;
  loadClients: (input: string) => Promise<Option[]>;
  loadEmployees: (input: string) => Promise<Option[]>;
  loadServiceTypes: (input: string) => Promise<Option[]>;
  onSave: (payload: CreateSaleDraft) => void;
  onClose: () => void;
};

export function EditSaleModal({
  sale,
  isUpdating,
  loadClients,
  loadEmployees,
  loadServiceTypes,
  onSave,
  onClose,
}: Props) {

  // ─── DEBUG: ver qué llega desde el backend al abrir el modal ──────────────
  console.log("📦 [EditSaleModal] sale recibido:", JSON.stringify(sale, null, 2));
  console.log("📦 [EditSaleModal] saleDetail count:", sale?.saleDetail?.length ?? "UNDEFINED/NULL");
  console.log("📦 [EditSaleModal] payments count:", sale?.payments?.length ?? "UNDEFINED/NULL");
  if (sale?.saleDetail) {
    sale.saleDetail.forEach((d, i) =>
      console.log(`  detail[${i}] isDeleted=${d.isDeleted} serviceTypeId=${d.serviceTypeId}`)
    );
  }

  const [client, setClient] = useState<Option | null>({
    value: sale.clientId,
    label: sale.nameClient,
  });

  // ✅ FIX: null safety + filtrar detalles eliminados
  const [details, setDetails] = useState<ServiceRow[]>(() => {
    const raw = sale.saleDetail ?? [];
    const active = raw.filter((d) => !d.isDeleted);
    console.log("📦 [EditSaleModal] detalles activos (no eliminados):", active.length, "de", raw.length, "totales");
    return active.map((d) => ({
      serviceTypeId: d.serviceTypeId,
      serviceName: d.nameServiceTypeSale,
      employeeId: d.employeeId,
      employeeName: d.nameEmployeeSale,
      unitPrice: d.unitPrice,
      discountPercent: d.discountPercent,
      additionalCharge: d.additionalCharge,
      total: d.totalCalculated,
    }));
  });

  // ✅ FIX: null safety en pagos iniciales
  const initialPayments: PaymentItem[] = (sale.payments ?? []).map((p) => ({
    paymentMethodId: p.paymentTypeId,
    paymentMethodName: p.paymentTypeName,
    amount: p.amountPaid,
  }));

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const [serviceSelected, setServiceSelected] = useState<(Option & { price?: number }) | null>(null);
  const [employeeSelected, setEmployeeSelected] = useState<Option | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);

  const saleTotal = details.reduce((acc, d) => acc + d.total, 0);

  const addDetail = () => {
    if (!serviceSelected || !employeeSelected) return;
    const price = serviceSelected.price ?? 0;
    const total = (price + additionalCharge) * (1 - discountPercent / 100);

    setDetails((prev) => [
      ...prev,
      {
        serviceTypeId: serviceSelected.value,
        serviceName: serviceSelected.label,
        employeeId: employeeSelected.value,
        employeeName: employeeSelected.label,
        unitPrice: price,
        discountPercent,
        additionalCharge,
        total,
      },
    ]);

    setServiceSelected(null);
    setEmployeeSelected(null);
    setDiscountPercent(0);
    setAdditionalCharge(0);
  };

  const removeDetail = (index: number) =>
    setDetails((prev) => prev.filter((_, i) => i !== index));

  const handleConfirmPayments = (payments: PaymentItem[]) => {
    if (!client) {
      console.error("❌ [EditSaleModal] No hay cliente seleccionado");
      return;
    }

    const payload: CreateSaleDraft = {
      clientId: client.value,
      saleDetails: details.map(({
        serviceTypeId,
        employeeId,
        unitPrice,
        discountPercent,
        additionalCharge,
        total,
      }) => ({
        serviceTypeId,
        employeeId,
        unitPrice,
        discountPercent,
        additionalCharge,
        total,
      })),
      payments: payments.map((p) => ({
        paymentTypeId: p.paymentMethodId,
        amountPaid: p.amount,
      })),
    };

    // ─── DEBUG: ver exactamente qué se envía al backend ──────────────────
    console.log("🚀 [EditSaleModal] Payload COMPLETO que se envía a onSave:", JSON.stringify(payload, null, 2));
    console.log("🚀 [EditSaleModal] clientId:", payload.clientId);
    console.log("🚀 [EditSaleModal] saleDetails.length:", payload.saleDetails.length);
    console.log("🚀 [EditSaleModal] payments.length:", payload.payments.length);

    onSave(payload);
    setIsPaymentOpen(false);
  };

  const columns: ColumnDef<ServiceRow>[] = [
    { header: "Servicio", accessorKey: "serviceName" },
    { header: "Colaborador", accessorKey: "employeeName" },
    {
      header: "Precio",
      accessorKey: "unitPrice",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    { header: "Desc. %", accessorKey: "discountPercent" },
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
      header: "",
      id: "quitar",
      cell: ({ row }) => (
        <button
          onClick={() => removeDetail(row.index)}
          className="text-red-600 text-xs hover:underline"
        >
          Quitar
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">

          <h3 className="text-lg font-semibold">Editar venta #{sale.id}</h3>

          {/* Cliente */}
          <AsyncSearchableSelect
            label="Cliente"
            loadOptions={loadClients}
            value={client}
            onChange={setClient}
          />

          {/* Agregar servicio */}
          <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
            <p className="text-sm font-medium text-gray-600">Agregar servicio</p>
            <div className="grid grid-cols-2 gap-3">
              <AsyncSearchableSelect
                label="Servicio"
                loadOptions={loadServiceTypes}
                value={serviceSelected}
                onChange={(opt: any) => setServiceSelected(opt)}
              />
              <AsyncSearchableSelect
                label="Colaborador"
                loadOptions={loadEmployees}
                value={employeeSelected}
                onChange={setEmployeeSelected}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Descuento (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Adicional ($)</label>
                <input
                  type="number"
                  min={0}
                  value={additionalCharge}
                  onChange={(e) => setAdditionalCharge(Number(e.target.value))}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              onClick={addDetail}
              disabled={!serviceSelected || !employeeSelected}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Agregar servicio
            </button>
          </div>

          {/* Tabla servicios */}
          {details.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay servicios en esta venta.
            </p>
          ) : (
            <GenericDataTable
              data={details}
              columns={columns}
              rowKey={(_, i) => i}
            />
          )}

          {/* Total + acciones */}
          <div className="flex justify-between items-center border-t pt-4">
            <strong className="text-gray-800">Total: {formatARS(saleTotal)}</strong>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={isUpdating}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsPaymentOpen(true)}
                disabled={details.length === 0 || isUpdating}
                className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Guardando..." : "Confirmar pago"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        totalAmount={saleTotal}
        initialPayments={initialPayments}
        isLoading={isUpdating}
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={handleConfirmPayments}
      />
    </>
  );
}
