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
      { name },
      {
        onSuccess: () => setName(""),
      }
    );
  };

  // ======================
  // Delete
  // ======================
  const removePaymentType = (id: number) => {
    if (deletePaymentType.isPending) return;
    deletePaymentType.mutate(id);
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
    });
  };

  return {
    // crear
    name,
    setName,
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
