"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";
import { useQueryClient } from "@tanstack/react-query";

import { Expense } from "@/core/models/expense/expense";
import { expenseRepository } from "@/data/repositories/expenseRepository";
import { useExpenseAll } from "@/data/hooks/expense/useExpense";

export function useExpensePage() {
  // ======================
  // Crear
  // ======================
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expenseTypeSelected, setExpenseTypeSelected] =
    useState<Option | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // ======================
  // Filtros
  // ======================
  const [search, setSearch] = useState("");
  const [expenseTypeFilter, setExpenseTypeFilter] =
    useState<Option | null>(null);

  const [dateFilter, setDateFilter] = useState<string>(""); // ✅ NUEVO

  // ======================
  // Editar
  // ======================
  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editExpenseType, setEditExpenseType] =
    useState<Option | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // ======================
  // Eliminar
  // ======================
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useExpenseAll(
    search,
    expenseTypeFilter?.value,
    dateFilter || undefined // ✅ NUEVO
  );

  // ======================
  // Crear
  // ======================
  const addExpense = async () => {
    if (!description.trim() || !price || !expenseTypeSelected || isCreating)
      return;

    try {
      setIsCreating(true);

      await expenseRepository.createExpense({
        description,
        price: Number(price),
        expenseTypeId: expenseTypeSelected.value,
      });

      queryClient.invalidateQueries({ queryKey: ["expenses"] });

      setDescription("");
      setPrice("");
      setExpenseTypeSelected(null);
      refetch();
    } finally {
      setIsCreating(false);
    }
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setEditDescription(expense.description);
    setEditPrice(String(expense.price));
    setEditExpenseType({
      value: expense.expenseTypeId,
      label: expense.nameExpenseType,
    });
  };

  const saveEditExpense = async () => {
    if (!editingExpense || !editExpenseType) return;

    try {
      setIsUpdating(true);

      await expenseRepository.updateExpense({
        id: editingExpense.id,
        description: editDescription.trim(),
        price: Number(editPrice),
        expenseTypeId: editExpenseType.value,
      });

      setEditingExpense(null);
      refetch();
    } finally {
      setIsUpdating(false);
    }
  };

  // ======================
  // Eliminar
  // ======================
  const deleteExpense = async (id: number) => {
    if (isDeleting !== null) return;

    try {
      setIsDeleting(id);
      await expenseRepository.deleteExpense(id);
      refetch();
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    // crear
    description,
    setDescription,
    price,
    setPrice,
    expenseTypeSelected,
    setExpenseTypeSelected,
    addExpense,
    isCreating,

    // filtros
    search,
    setSearch,
    expenseTypeFilter,
    setExpenseTypeFilter,
    dateFilter,        // ✅ NUEVO
    setDateFilter,     // ✅ NUEVO

    // listar
    expenses,
    isLoading,
    isError,

    // editar
    editingExpense,
    setEditingExpense,
    openEditModal,

    editDescription,
    setEditDescription,
    editPrice,
    setEditPrice,
    editExpenseType,
    setEditExpenseType,

    isUpdating,
    saveEditExpense,

    // eliminar
    isDeleting,
    deleteExpense,
  };
}
