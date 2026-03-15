import { useMemo, useState } from "react";
import { PaymentTypeOption } from "@/core/models/paymentType/PaymentType";

export interface PaymentItem {
  paymentMethodId: number;
  paymentMethodName: string;
  amount: number;
  appDiscountPercent?: number; // ✅ opcional — viene del backend en ventas ya guardadas
}

interface PaymentItemInternal extends PaymentItem {
  surchargePercent: number;
}

export function usePaymentModal(totalAmount: number, initialPayments: PaymentItem[] = []) {
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<PaymentTypeOption | null>(null);

  const [amount, setAmount] = useState("");

  const [payments, setPayments] = useState<PaymentItemInternal[]>(
    initialPayments.map((p) => ({ ...p, surchargePercent: 0 }))
  );

  const totalPaid = useMemo(
    () => payments.reduce((acc, p) => acc + p.amount, 0),
    [payments]
  );

  const maxSurchargePercent = useMemo(() => {
    const fromAdded = payments.map((p) => p.surchargePercent);
    const fromSelected = paymentMethodSelected?.applySurcharge
      ? paymentMethodSelected.surchargePercent
      : 0;
    return Math.max(...fromAdded, fromSelected, 0);
  }, [payments, paymentMethodSelected]);

  const totalWithSurcharge = totalAmount * (1 + maxSurchargePercent / 100);
  const surchargeAmount = totalAmount * (maxSurchargePercent / 100);

  const remaining = totalWithSurcharge - totalPaid;
  const isCompleted = remaining <= 0;

  const selectedSurchargePercent = paymentMethodSelected?.applySurcharge
    ? paymentMethodSelected.surchargePercent
    : 0;

  const addPayment = () => {
    if (!paymentMethodSelected) return;
    const value = Number(amount);
    if (value <= 0 || Number.isNaN(value)) return;
    if (totalPaid + value > totalWithSurcharge) return;

    setPayments((prev) => [
      ...prev,
      {
        paymentMethodId: paymentMethodSelected.value,
        paymentMethodName: paymentMethodSelected.label,
        amount: value,
        surchargePercent: paymentMethodSelected?.applySurcharge
          ? paymentMethodSelected.surchargePercent
          : 0,
        // ✅ guardamos el descuento de app al agregar
        appDiscountPercent: paymentMethodSelected?.applyDiscount
          ? paymentMethodSelected.discountPercent
          : 0,
      },
    ]);

    setPaymentMethodSelected(null);
    setAmount("");
  };

  const removePayment = (index: number) =>
    setPayments((prev) => prev.filter((_, i) => i !== index));

  const reset = (newInitialPayments: PaymentItem[] = []) => {
    setPayments(newInitialPayments.map((p) => ({ ...p, surchargePercent: 0 })));
    setPaymentMethodSelected(null);
    setAmount("");
  };

  const paymentsClean: PaymentItem[] = payments.map(
    ({ paymentMethodId, paymentMethodName, amount, appDiscountPercent }) => ({
      paymentMethodId,
      paymentMethodName,
      amount,
      appDiscountPercent,
    })
  );

  return {
    paymentMethodSelected,
    amount,
    payments: paymentsClean,
    totalPaid,
    totalWithSurcharge,
    surchargeAmount,
    maxSurchargePercent,
    remaining,
    isCompleted,
    selectedSurchargePercent,
    setPaymentMethodSelected,
    setAmount,
    addPayment,
    removePayment,
    reset,
  };
}