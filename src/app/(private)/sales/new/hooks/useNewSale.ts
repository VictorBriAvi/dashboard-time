"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Option } from "@/ui/inputs/SearchSelect";
import { ServiceOption } from "@/core/models/sales/SaleDetailUI";
import {
  CreateSaleDraft,
  CreateSaleDetailDraft,
} from "@/core/models/sales/CreateSaleDraft";
import { useCreateSale } from "@/data/hooks/Sales/useCreateSaleMutation";

export interface SaleDetailUI {
  serviceTypeId: number;
  serviceName: string;
  employeeId: number;
  employeeName: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  total: number;
}

const normalizeNumber = (value: string | number): number => {
  if (typeof value === "number") return value;

  return (
    Number(
      value.replace(/\./g, "").replace(",", "."),
    ) || 0
  );
};

const calculateServiceTotal = (
  unitPrice: string | number,
  discountPercent: number,
  additionalCharge: number,
) => {
  const price = normalizeNumber(unitPrice);
  const discount = Number(discountPercent) || 0;
  const additional = Number(additionalCharge) || 0;

  return price - (price * discount) / 100 + additional;
};

export function useNewSale() {
  const router = useRouter();
  const createSale = useCreateSale();

  // ======================
  // Selecciones
  // ======================
  const [clientSelected, setClientSelected] = useState<Option | null>(null);
  const [serviceSelected, setServiceSelected] =
    useState<ServiceOption | null>(null);
  const [employeeSelected, setEmployeeSelected] =
    useState<Option | null>(null);

  // ======================
  // Detalles
  // ======================
  const [saleDetailsDraft, setSaleDetailsDraft] =
    useState<CreateSaleDetailDraft[]>([]);
  const [saleDetailsUI, setSaleDetailsUI] =
    useState<SaleDetailUI[]>([]);

  const [discountPercent, setDiscountPercent] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // ======================
  // Actions
  // ======================
  const addService = () => {
    if (!serviceSelected || !employeeSelected) return;

    const total = calculateServiceTotal(
      serviceSelected.price,
      discountPercent,
      additionalCharge,
    );

    setSaleDetailsDraft((prev) => [
      ...prev,
      {
        serviceTypeId: serviceSelected.value,
        employeeId: employeeSelected.value,
        unitPrice: serviceSelected.price,
        discountPercent,
        additionalCharge,
        total,
      },
    ]);

    setSaleDetailsUI((prev) => [
      ...prev,
      {
        serviceTypeId: serviceSelected.value,
        serviceName: serviceSelected.label,
        employeeId: employeeSelected.value,
        employeeName: employeeSelected.label,
        unitPrice: serviceSelected.price,
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

  const removeService = (index: number) => {
    setSaleDetailsDraft((prev) => prev.filter((_, i) => i !== index));
    setSaleDetailsUI((prev) => prev.filter((_, i) => i !== index));
  };

  const saleTotal = saleDetailsDraft.reduce(
    (acc, d) => acc + d.total,
    0,
  );

  const confirmSale = (payments: any[]) => {
    if (!clientSelected) {
      alert("Seleccioná un cliente");
      return;
    }

    const payload: CreateSaleDraft = {
      clientId: clientSelected.value,
      payments: payments.map((p) => ({
        paymentTypeId: p.paymentMethodId,
        amountPaid: p.amount,
      })),
      saleDetails: saleDetailsDraft,
    };

    createSale.mutate(payload, {
      onSuccess: () => {
        setIsPaymentModalOpen(false);
        router.push("/sales");
      },
      onError: () => {
        alert("Error al guardar la venta");
      },
    });
  };

  return {
    // state
    clientSelected,
    serviceSelected,
    employeeSelected,
    saleDetailsUI,
    saleDetailsDraft,
    discountPercent,
    additionalCharge,
    saleTotal,
    isPaymentModalOpen,
    isSaving: createSale.isPending,

    // setters
    setClientSelected,
    setServiceSelected,
    setEmployeeSelected,
    setDiscountPercent,
    setAdditionalCharge,
    setIsPaymentModalOpen,

    // actions
    addService,
    removeService,
    confirmSale,
  };
}
