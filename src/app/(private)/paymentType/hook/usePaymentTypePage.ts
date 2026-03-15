"use client";

import { useState } from "react";
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { usePaymentTypeAll } from "@/data/hooks/paymentType/usePaymentType";
import {
  useCreatePaymentType,
  useUpdatePaymentType,
  useDeletePaymentType,
} from "@/data/hooks/paymentType/usePaymentTypeMutation";

export function usePaymentTypePage() {
  // ======================
  // States
  // ======================
  const [name, setName] = useState("");
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [applySurcharge, setApplySurcharge] = useState<boolean>(false);
  const [surchargePercent, setSurchargePercent] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [editingPaymentType, setEditingPaymentType] =
    useState<PaymentType | null>(null);

  // ======================
  // Query
  // ======================
  const {
    data: paymentTypes = [],
    isLoading,
    isError,
  } = usePaymentTypeAll(search);

  // ======================
  // Mutations
  // ======================
  const createPaymentType = useCreatePaymentType();
  const updatePaymentType = useUpdatePaymentType();
  const deletePaymentType = useDeletePaymentType();

  // ======================
  // Create
  // ======================
  const addPaymentType = () => {
    if (!name.trim() || createPaymentType.isPending) return;

    createPaymentType.mutate(
      { name, applyDiscount, discountPercent, applySurcharge, surchargePercent },
      {
        onSuccess: () => {
          setName("");
          setApplyDiscount(false);
          setDiscountPercent(0);
          setApplySurcharge(false);
          setSurchargePercent(0);
        },
        // ✅ FIX: onError agregado
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ??
            "Error al crear el medio de pago. Intentá de nuevo.";
          alert(msg);
        },
      },
    );
  };

  // ======================
  // Delete
  // ======================
  const removePaymentType = (id: number) => {
    if (deletePaymentType.isPending) return;
    deletePaymentType.mutate(id, {
      // ✅ FIX: onError agregado
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ??
          "Error al eliminar el medio de pago. Intentá de nuevo.";
        alert(msg);
      },
    });
  };

  // ======================
  // Edit
  // ======================
  const openEditModal = (paymentType: PaymentType) => {
    setEditingPaymentType(paymentType);
  };

  const savePaymentType = () => {
    if (!editingPaymentType || updatePaymentType.isPending) return;

    updatePaymentType.mutate(editingPaymentType, {
      onSuccess: () => setEditingPaymentType(null),
      // ✅ FIX: onError agregado — antes el error se tragaba en silencio
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ??
          "Error al guardar el medio de pago. Intentá de nuevo.";
        alert(msg);
      },
    });
  };

  return {
    // crear
    name,
    setName,
    applyDiscount,
    setApplyDiscount,
    discountPercent,
    setDiscountPercent,
    applySurcharge,
    setApplySurcharge,
    surchargePercent,
    setSurchargePercent,
    addPaymentType,
    isCreating: createPaymentType.isPending,

    // listar
    paymentTypes,
    isLoading,
    isError,

    // buscar
    search,
    setSearch,

    // editar
    editingPaymentType,
    setEditingPaymentType,
    openEditModal,
    savePaymentType,
    isUpdating: updatePaymentType.isPending,

    // eliminar
    removePaymentType,
    isDeleting: deletePaymentType.isPending,
  };
}