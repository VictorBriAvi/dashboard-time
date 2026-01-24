"use client";

import { useState } from "react";
import { usePaymentTypeAll } from "@/data/hooks/paymentType/usePaymentType";
import { paymentTypeRepository } from "@/data/repositories/paymentTypeRepository";
import { PaymentType } from "@/core/models/paymentType/PaymentType";


export function usePaymentTypePage() {
  // ======================
  // States
  // ======================
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingPaymentType, setEditingPaymentType] =
    useState<PaymentType | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");

  // ======================
  // Data
  // ======================
  const {
    data: paymentTypes = [],
    isLoading,
    isError,
    refetch,
  } = usePaymentTypeAll(search);

  // ======================
  // Create
  // ======================
  const addPaymentType = async () => {
    if (!name.trim() || isCreating) return;

    try {
      setIsCreating(true);
      await paymentTypeRepository.createPaymentType({ name });
      setName("");
      refetch();
    } finally {
      setIsCreating(false);
    }
  };

  // ======================
  // Delete
  // ======================
  const deletePaymentType = async (id: number) => {
    if (isDeleting !== null) return;

    try {
      setIsDeleting(id);
      await paymentTypeRepository.deletePaymentType(id);
      refetch();
    } finally {
      setIsDeleting(null);
    }
  };

  // ======================
  // Edit
  // ======================
  const openEditModal = (paymentType: PaymentType) => {
    setEditingPaymentType(paymentType);
  };

  const updatePaymentType = async () => {
    if (!editingPaymentType || isUpdating) return;

    try {
      setIsUpdating(true);
      await paymentTypeRepository.updatePaymentType(editingPaymentType);
      setEditingPaymentType(null);
      refetch();
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    // crear
    name,
    setName,
    isCreating,
    addPaymentType,

    // listar
    paymentTypes,
    isLoading,
    isError,

    // eliminar
    isDeleting,
    deletePaymentType,

    // buscar
    search,
    setSearch,

    // editar
    editingPaymentType,
    setEditingPaymentType,
    openEditModal,
    updatePaymentType,
    isUpdating,
  };
}
