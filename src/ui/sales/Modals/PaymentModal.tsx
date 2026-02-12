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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4">
        <h3 className="text-lg font-semibold">Cobro de la venta</h3>

        <div className="flex justify-between text-sm font-medium">
          <span>Total:</span>
          <span>{formatARS(totalAmount)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Pagado:</span>
          <span>{formatARS(payment.totalPaid)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Restante:</span>
          <span
            className={
              payment.remaining === 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {formatARS(payment.remaining)}
          </span>
        </div>

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
          className="w-full bg-black text-white rounded-md py-2 text-sm"
        >
          Agregar pago
        </button>

        {payment.payments.length > 0 && (
          <GenericDataTable<PaymentRow>
            data={tableData}
            columns={paymentColumns}
            rowKey={(_, i) => i}
            className="mt-4"
          />
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancelar
          </button>

          <button
            disabled={!payment.isCompleted || isLoading}
            onClick={() => onConfirm(payment.payments)}
            className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Confirmar cobro"}
          </button>
        </div>
      </div>
    </div>
  );
}
