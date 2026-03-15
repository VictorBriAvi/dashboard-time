"use client";

import { useState } from "react";
import type { Option } from "@/ui/inputs/SearchSelect";
import { useFilteredSales, type SalesFilter } from "@/data/hooks/Sales/useFilteredSales";
import { useGetSaleById, useUpdateSale, useDeleteSale } from "@/data/hooks/Sales/useSaleMutation";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export function useSalesPage() {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // ── Filtros ───────────────────────────────────────────────────────────────
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [client, setClient] = useState<Option | null>(null);
  const [employee, setEmployee] = useState<Option | null>(null);
  const [paymentType, setPaymentType] = useState<Option | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<SalesFilter>({
    fromDate: today,
    toDate: today,
    clientId: null,
    employeeId: null,
    paymentTypeId: null,
    serviceTypeId: null,
  });

  const { data, isLoading, isError } = useFilteredSales(appliedFilters);

  const handleSearch = () => {
    setAppliedFilters({
      fromDate,
      toDate,
      clientId: client?.value ?? null,
      employeeId: employee?.value ?? null,
      paymentTypeId: paymentType?.value ?? null,
      serviceTypeId: null,
    });
  };

  const clearFilters = () => {
    setFromDate(today);
    setToDate(today);
    setClient(null);
    setEmployee(null);
    setPaymentType(null);
    setAppliedFilters({
      fromDate: today,
      toDate: today,
      clientId: null,
      employeeId: null,
      paymentTypeId: null,
      serviceTypeId: null,
    });
  };

  // ── Ver detalle ───────────────────────────────────────────────────────────
  const [viewingId, setViewingId] = useState<number | null>(null);

  const {
    data: viewingSale,
    isLoading: isLoadingDetail,
  } = useGetSaleById(viewingId);

  const openDetailModal = (id: number) => setViewingId(id);
  const closeDetailModal = () => setViewingId(null);

  // ── Editar ────────────────────────────────────────────────────────────────
  const [editingSaleId, setEditingSaleId] = useState<number | null>(null);

  const {
    data: editingSale,
    isLoading: isLoadingEdit,
  } = useGetSaleById(editingSaleId);

  const updateSale = useUpdateSale();

  const openEditModal = (id: number) => setEditingSaleId(id);
  const closeEditModal = () => setEditingSaleId(null);

  const saveEditSale = (payload: CreateSaleDraft) => {
    if (!editingSaleId) return;
    updateSale.mutate(
      { id: editingSaleId, payload },
      { onSuccess: () => setEditingSaleId(null) }
    );
  };

  // ── Eliminar ──────────────────────────────────────────────────────────────
  const deleteSale = useDeleteSale();
  const removeSale = (id: number) => deleteSale.mutate(id);

  return {
    // lista
    sales: data,
    isLoading,
    isError,

    // filtros
    fromDate, setFromDate,
    toDate, setToDate,
    client, setClient,
    employee, setEmployee,
    paymentType, setPaymentType,
    handleSearch,
    clearFilters,

    // ver detalle
    viewingSale,
    isLoadingDetail,
    openDetailModal,
    closeDetailModal,

    // editar
    editingSale,
    isLoadingEdit,
    openEditModal,
    closeEditModal,
    saveEditSale,
    isUpdating: updateSale.isPending,

    // eliminar
    removeSale,
    isDeleting: deleteSale.isPending,
  };
}