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
  unitPrice: number,
  discountPercent: number,
  additionalCharge: number
) => {
  const discountAmount = (unitPrice * discountPercent) / 100;
  return unitPrice - discountAmount + additionalCharge;
};

export function useNewSale() {
  const router = useRouter();

  const [clientSelected, setClientSelected] = useState<Option | null>(null);
  const [serviceSelected, setServiceSelected] =
    useState<ServiceOption | null>(null);
  const [employeeSelected, setEmployeeSelected] =
    useState<Option | null>(null);

  const [saleDetailsDraft, setSaleDetailsDraft] = useState<
    CreateSaleDetailDraft[]
  >([]);
  const [saleDetailsUI, setSaleDetailsUI] = useState<SaleDetailUI[]>([]);

  const [discountPercent, setDiscountPercent] = useState("");
  const [additionalCharge, setAdditionalCharge] = useState("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addService = () => {
    if (!serviceSelected || !employeeSelected) return;

    const unitPrice = Number(
      serviceSelected.price.replace(/\./g, "").replace(",", ".")
    );

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
    setDiscountPercent("");
    setAdditionalCharge("");
  };

  const removeService = (index: number) => {
    setSaleDetailsDraft((prev) => prev.filter((_, i) => i !== index));
    setSaleDetailsUI((prev) => prev.filter((_, i) => i !== index));
  };

  const saleTotal = saleDetailsDraft.reduce((acc, detail) => {
    return (
      acc +
      calculateServiceTotal(
        detail.unitPrice,
        detail.discountPercent,
        detail.additionalCharge
      )
    );
  }, 0);

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
