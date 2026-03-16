"use client";

import { useEffect } from "react";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { Input } from "@/ui/inputs/Input";
import { Modal } from "@/ui/Modals";
import { Btn } from "@/ui/PageLayout";
import { usePaymentModal, PaymentItem } from "@/ui/sales/Modals/Hook/usePaymentModal";
import { PaymentTypeOption } from "@/core/models/paymentType/PaymentType";
import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { formatARS } from "@/core/utils/format";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";

interface PaymentModalProps {
  isOpen: boolean;
  totalAmount: number;
  loadPaymentMethods?: (input: string) => Promise<PaymentTypeOption[]>;
  initialPayments?: PaymentItem[];
  onClose: () => void;
  onConfirm: (payments: PaymentItem[]) => void;
  isLoading?: boolean;
}

type PaymentRow = {
  paymentMethodId: number;
  paymentMethodName: string;
  amount: number;
  appDiscountPercent?: number;
  onRemove: () => void;
};

export function PaymentModal({
  isOpen,
  totalAmount,
  loadPaymentMethods,
  initialPayments = [],
  onClose,
  onConfirm,
  isLoading,
}: PaymentModalProps) {
  const payment = usePaymentModal(totalAmount, initialPayments);
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();
  const resolvedLoad = loadPaymentMethods ?? loadPaymentTypeSearch;

  useEffect(() => {
    if (isOpen) payment.reset(initialPayments);
  }, [isOpen]);

  const tableData: PaymentRow[] = payment.payments.map((p, index) => ({
    paymentMethodId: p.paymentMethodId,
    paymentMethodName: p.paymentMethodName,
    amount: p.amount,
    appDiscountPercent: p.appDiscountPercent,
    onRemove: () => payment.removePayment(index),
  }));

  const columns: ColumnDef<PaymentRow>[] = [
    {
      accessorKey: "paymentMethodName",
      header: "Medio",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-900">{formatARS(getValue<number>())}</span>
      ),
    },
    {
      accessorKey: "appDiscountPercent",
      header: "Desc. app",
      cell: ({ getValue }) => {
        const val = getValue<number | undefined>();
        return val && val > 0
          ? <span style={{ color: "#185FA5" }} className="text-xs font-medium">{val}%</span>
          : <span className="text-gray-300 text-xs">—</span>;
      },
    },
    {
      id: "remove",
      header: "",
      cell: ({ row }) => (
        <button
          onClick={row.original.onRemove}
          className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
        >
          Quitar
        </button>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cobro"
      subtitle="Registrá los medios de pago de esta venta"
      size="md"
      preventBackdropClose
      footer={
        <div className="flex items-center justify-between w-full">
          {/* Estado del pago */}
          <div className="flex items-center gap-2">
            {payment.isCompleted ? (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: "#EAF3DE", color: "#3B6D11" }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B6D11", display: "inline-block" }} />
                Pago completo
              </span>
            ) : (
              <span className="text-xs text-gray-400">
                Resta {formatARS(Math.max(payment.remaining, 0))}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Btn variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Btn>
            <Btn
              variant="primary"
              disabled={!payment.isCompleted}
              loading={isLoading}
              onClick={() => onConfirm(payment.payments)}
            >
              Confirmar cobro
            </Btn>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-5">

        {/* Resumen de totales */}
        <div
          className="rounded-xl p-4 flex flex-col gap-2"
          style={{ background: "#f9fafb", border: "0.5px solid #f3f4f6" }}
        >
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal servicios</span>
            <span>{formatARS(totalAmount)}</span>
          </div>

          {payment.maxSurchargePercent > 0 && (
            <div className="flex justify-between text-sm font-medium text-amber-600">
              <span>Recargo ({payment.maxSurchargePercent}%)</span>
              <span>+{formatARS(payment.surchargeAmount)}</span>
            </div>
          )}

          <div
            className="flex justify-between font-semibold text-sm pt-2"
            style={{ borderTop: "0.5px solid #e5e7eb" }}
          >
            <span className="text-gray-900">Total a cobrar</span>
            <span className="text-gray-900">{formatARS(payment.totalWithSurcharge)}</span>
          </div>

          {payment.payments.length > 0 && (
            <div className="flex justify-between text-sm pt-1">
              <span className="text-gray-400">Pagado</span>
              <span className="text-gray-700">{formatARS(payment.totalPaid)}</span>
            </div>
          )}
        </div>

        {/* Agregar medio de pago */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Agregar medio de pago
          </p>

          <AsyncSearchableSelect
            label="Medio de pago"
            loadOptions={resolvedLoad}
            value={payment.paymentMethodSelected}
            onChange={payment.setPaymentMethodSelected}
          />

          {/* Aviso de recargo cuando el medio seleccionado lo tiene */}
          {payment.paymentMethodSelected?.applySurcharge && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
              style={{ background: "#FAEEDA", color: "#854F0B", border: "0.5px solid #FAC775" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="#854F0B" strokeWidth="1.2"/>
                <path d="M6.5 4v3m0 2h.01" stroke="#854F0B" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span>
                Recargo del <strong>{payment.paymentMethodSelected.surchargePercent}%</strong>
                {" — "}nuevo total:{" "}
                <strong>{formatARS(payment.totalWithSurcharge)}</strong>
              </span>
            </div>
          )}

          <Input
            label="Monto"
            value={payment.amount}
            onChange={payment.setAmount}
            placeholder="$0"
          />

          <Btn
            variant="secondary"
            className="w-full justify-center"
            onClick={payment.addPayment}
            disabled={payment.isCompleted || !payment.paymentMethodSelected}
          >
            + Agregar pago
          </Btn>
        </div>

        {/* Tabla de pagos agregados */}
        {payment.payments.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Pagos registrados
            </p>
            <GenericDataTable<PaymentRow>
              data={tableData}
              columns={columns}
              rowKey={(_, i) => i}
              skeletonRows={2}
            />
          </div>
        )}

      </div>
    </Modal>
  );
}
