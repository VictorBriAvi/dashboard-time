"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saleRepository } from "@/data/repositories/saleRepository";
import {
  CreateSaleDraft,
  CreateSaleDetailDraft,
} from "@/core/models/sales/CreateSaleDraft";
import { Option } from "@/ui/inputs/SearchSelect";
import { ServiceOption } from "@/core/models/sales/SaleDetailUI";
// import { parseARS } from "@/core/utils/format";

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

const calculateServiceTotal = (
  unitPrice: string | number,
  discountPercent: number,
  additionalCharge: number,
) => {
  console.log("unitPrice:", unitPrice, "typeof:", typeof unitPrice);

  const price = normalizeNumber(unitPrice);
  const discount = Number(discountPercent) || 0;
  const additional = Number(additionalCharge) || 0;

  return price - (price * discount) / 100 + additional;
};

const normalizeNumber = (value: string | number): number => {
  if (typeof value === "number") return value;

  return (
    Number(
      value
        .replace(/\./g, "") // miles
        .replace(",", "."), // decimal
    ) || 0
  );
};

export function useNewSale() {
  const router = useRouter();

  const [clientSelected, setClientSelected] = useState<Option | null>(null);
  const [serviceSelected, setServiceSelected] = useState<ServiceOption | null>(
    null,
  );
  const [employeeSelected, setEmployeeSelected] = useState<Option | null>(null);

  const [saleDetailsDraft, setSaleDetailsDraft] = useState<
    CreateSaleDetailDraft[]
  >([]);
  const [saleDetailsUI, setSaleDetailsUI] = useState<SaleDetailUI[]>([]);

  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [additionalCharge, setAdditionalCharge] = useState<number>(0);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addService = () => {
    if (!serviceSelected || !employeeSelected) return;

    const unitPrice = serviceSelected.price;

    const discount = Number(discountPercent) || 0;
    const additional = Number(additionalCharge) || 0;

    const total = calculateServiceTotal(unitPrice, discount, additional);

    setSaleDetailsDraft((prev) => [
      ...prev,
      {
        serviceTypeId: serviceSelected.value,
        employeeId: employeeSelected.value,
        unitPrice,
        discountPercent: discount,
        additionalCharge: additional,
        total, // 👈 CLAVE
      },
    ]);

    setSaleDetailsUI((prev) => [
      ...prev,
      {
        serviceTypeId: serviceSelected.value,
        serviceName: serviceSelected.label,
        employeeId: employeeSelected.value,
        employeeName: employeeSelected.label,
        unitPrice,
        discountPercent: discount,
        additionalCharge: additional,
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
    (acc, detail) => acc + detail.total,
    0,
  );

  const confirmSale = async (payments: any[]) => {
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

    try {
      setIsSaving(true);
      await saleRepository.createSale(payload);
      router.push("/sales");
    } catch (e) {
      console.error(e);
      alert("Error al guardar la venta");
    } finally {
      setIsSaving(false);
      setIsPaymentModalOpen(false);
    }
  };

  return {
    // estado
    clientSelected,
    serviceSelected,
    employeeSelected,
    saleDetailsUI,
    saleDetailsDraft,
    discountPercent,
    additionalCharge,
    saleTotal,
    isPaymentModalOpen,
    isSaving,

    // setters
    setClientSelected,
    setServiceSelected,
    setEmployeeSelected,
    setDiscountPercent,
    setAdditionalCharge,
    setIsPaymentModalOpen,

    // acciones
    addService,
    removeService,
    confirmSale,
  };
}
