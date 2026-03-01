"use client";

import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";
import { Input } from "@/ui/inputs/Input";
import { usePaymentModal } from "@/ui/sales/Modals/Hook/usePaymentModal";
import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { formatARS } from "@/core/utils/format";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";


interface PaymentModalProps {
  isOpen: boolean;
  totalAmount: number;
  loadPaymentMethods: (input: string) => Promise<Option[]>;
  onClose: () => void;
  onConfirm: (payments: any[]) => void;
  isLoading?: boolean;
}

type PaymentRow = {
  paymentMethodId: number;
  paymentMethodName: string;
  amount: number;
  onRemove: () => void;
};

export function PaymentModal({
  isOpen,
  totalAmount,
  loadPaymentMethods,
  onClose,
  onConfirm,
  isLoading,
}: PaymentModalProps) {
  const payment = usePaymentModal(totalAmount);
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

  const tableData: PaymentRow[] = payment.payments.map((p, index) => ({
    paymentMethodId: p.paymentMethodId,
    paymentMethodName: p.paymentMethodName,
    amount: p.amount,
    onRemove: () => payment.removePayment(index),
  }));

  const paymentColumns: ColumnDef<PaymentRow>[] = [
    {
      accessorKey: "paymentMethodName",
      header: "Medio de pago",
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatARS(getValue<number>())}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acción",
      cell: ({ row }) => (
        <button
          className="text-red-600 text-xs"
          onClick={row.original.onRemove}
        >
          Quitar
        </button>
      ),
    },
  ];

  if (!isOpen) return null;
return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-2xl shadow-md p-5 space-y-5">

        {/* ===== Header ===== */}
        <h2 className="text-lg font-semibold text-gray-800">
          Cobro
        </h2>

        {/* ===== Resumen + Formulario ===== */}
        <div className="grid grid-cols-12 gap-6">

          {/* --- Resumen --- */}
          <div className="col-span-12 md:col-span-6 text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatARS(totalAmount)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Pagado</span>
              <span>{formatARS(payment.totalPaid)}</span>
            </div>

            <div className="flex justify-between">
              <span>Restante</span>
              <span
                className={
                  payment.remaining === 0
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {formatARS(payment.remaining)}
              </span>
            </div>
          </div>

          {/* --- Agregar pago --- */}
          <div className="col-span-12 md:col-span-6 space-y-4">
            <AsyncSearchableSelect
              label="Medio de pago"
              loadOptions={loadPaymentMethods}
              value={payment.paymentMethodSelected}
              onChange={payment.setPaymentMethodSelected}
            />

            <Input
              label="Monto"
              value={payment.amount}
              onChange={payment.setAmount}
              placeholder="$ 0,00"
            />

            <button
              onClick={payment.addPayment}
              className="
                w-full rounded-lg py-2 text-sm font-medium
                bg-black text-white
                hover:bg-gray-800
                transition-colors
              "
            >
              Agregar pago
            </button>
          </div>
        </div>

        {/* ===== Tabla pagos ===== */}
        {payment.payments.length > 0 && (
          <div className="border-t pt-4">
            <GenericDataTable<PaymentRow>
              data={tableData}
              columns={paymentColumns}
              rowKey={(_, i) => i}
            />
          </div>
        )}

        {/* ===== Acciones ===== */}
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm rounded-lg
              border border-gray-300
              hover:bg-gray-100
              transition-colors
            "
          >
            Cancelar
          </button>

          <button
            disabled={!payment.isCompleted || isLoading}
            onClick={() => onConfirm(payment.payments)}
            className={`
              px-4 py-2 text-sm rounded-lg transition-colors
              ${
                !payment.isCompleted || isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }
            `}
          >
            {isLoading ? "Guardando..." : "Confirmar"}
          </button>
        </div>

      </div>
    </div>
  </div>
);
}
