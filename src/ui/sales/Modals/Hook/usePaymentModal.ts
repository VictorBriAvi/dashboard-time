import { useMemo, useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";

export interface PaymentItem {
  paymentMethodId: number;
  paymentMethodName: string;
  amount: number;
}

export function usePaymentModal(totalAmount: number) {
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<Option | null>(null);

  const [amount, setAmount] = useState(""); // string para input
  const [payments, setPayments] = useState<PaymentItem[]>([]);

  const totalPaid = useMemo(
    () => payments.reduce((acc, p) => acc + p.amount, 0),
    [payments]
  );

  const remaining = totalAmount - totalPaid;
  const isCompleted = remaining === 0;

  const addPayment = () => {
    if (!paymentMethodSelected) return;

    const value = Number(amount);

    if (value <= 0 || Number.isNaN(value)) return;
    if (totalPaid + value > totalAmount) return;

    setPayments((prev) => [
      ...prev,
      {
        paymentMethodId: paymentMethodSelected.value,
        paymentMethodName: paymentMethodSelected.label,
        amount: value,
      },
    ]);

    setPaymentMethodSelected(null);
    setAmount("");
  };

  const removePayment = (index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = () => {
    setPayments([]);
    setPaymentMethodSelected(null);
    setAmount("");
  };

  return {
    paymentMethodSelected,
    amount,
    payments,

    totalPaid,
    remaining,
    isCompleted,

    setPaymentMethodSelected,
    setAmount,

    addPayment,
    removePayment,
    reset,
  };
}
