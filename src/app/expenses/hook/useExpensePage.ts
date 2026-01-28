"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";
import { Expense } from "@/core/models/expense/expense";
import { useExpenseAll } from "@/data/hooks/expense/useExpense";
import {
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
} from "@/data/hooks/expense/useExpenseMutation";

export function useExpensePage() {
  // ======================
  // Crear
  // ======================
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseTypeSelected, setExpenseTypeSelected] =
    useState<Option | null>(null);
  const [paymentTypeSelected, setPaymentTypeSelected] =
    useState<Option | null>(null);

  // ======================
  // Filtros
  // ======================
  const [search, setSearch] = useState("");
  const [expenseTypeFilter, setExpenseTypeFilter] =
    useState<Option | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ======================
  // Editar
  // ======================
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editExpenseDate, setEditExpenseDate] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editExpenseType, setEditExpenseType] = useState<Option | null>(null);
  const [editPaymentType, setEditPaymentType] = useState<Option | null>(null);

  // ======================
  // Queries
  // ======================
  const { data: expenses = [], isLoading, isError } = useExpenseAll(
    search,
    expenseTypeFilter?.value,
    fromDate || undefined,
    toDate || undefined
  );

  // ======================
  // Mutations
  // ======================
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  // ======================
  // Helpers
  // ======================
  const normalizePrice = (value: string) =>
    value.replace(/\./g, "").replace(",", ".");

  // ======================
  // Crear
  // ======================
  const addExpense = () => {
    if (
      !description.trim() ||
      !price ||
      !expenseTypeSelected ||
      !paymentTypeSelected ||
      !expenseDate ||
      createExpense.isPending
    )
      return;

    const parsedPrice = Number(normalizePrice(price));
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;

    createExpense.mutate(
      {
        description,
        price: parsedPrice,
        expenseTypeId: expenseTypeSelected.value,
        paymentTypeId: paymentTypeSelected.value,
        expenseDate,
      },
      {
        onSuccess: () => {
          setDescription("");
          setPrice("");
          setExpenseTypeSelected(null);
          setPaymentTypeSelected(null);
          setExpenseDate("");
        },
      }
    );
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setEditDescription(expense.description);

    const [day, month, year] = expense.expensesDateStr.split("-");
    setEditExpenseDate(`${year}-${month}-${day}`);

    setEditPrice(String(expense.price));
    setEditExpenseType({
      value: expense.expenseTypeId,
      label: expense.nameExpenseType,
    });
    setEditPaymentType({
      value: expense.paymentTypeId,
      label: expense.paymentTypeName,
    });
  };

  const saveEditExpense = () => {
    if (
      !editingExpense ||
      !editExpenseType ||
      !editPaymentType ||
      updateExpense.isPending
    )
      return;

    updateExpense.mutate(
      {
        id: editingExpense.id,
        description: editDescription.trim(),
        price: Number(editPrice),
        expenseTypeId: editExpenseType.value,
        paymentTypeId: editPaymentType.value,
        expenseDate: editExpenseDate,
      },
      {
        onSuccess: () => setEditingExpense(null),
      }
    );
  };

  // ======================
  // Eliminar
  // ======================
  const removeExpense = (id: number) => {
    if (deleteExpense.isPending) return;
    deleteExpense.mutate(id);
  };

  // ======================
  // Filtros
  // ======================
  const clearFilters = () => {
    setSearch("");
    setExpenseTypeFilter(null);
    setFromDate("");
    setToDate("");
  };

  return {
    // crear
    description,
    setDescription,
    price,
    setPrice,
    expenseDate,
    setExpenseDate,
    expenseTypeSelected,
    setExpenseTypeSelected,
    paymentTypeSelected,
    setPaymentTypeSelected,
    addExpense,
    isCreating: createExpense.isPending,

    // filtros
    search,
    setSearch,
    expenseTypeFilter,
    setExpenseTypeFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    clearFilters,

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
    editExpenseDate,
    setEditExpenseDate,
    editPrice,
    setEditPrice,
    editExpenseType,
    setEditExpenseType,
    editPaymentType,
    setEditPaymentType,
    saveEditExpense,
    isUpdating: updateExpense.isPending,

    // eliminar
    removeExpense,
    isDeleting: deleteExpense.isPending,
  };
}
