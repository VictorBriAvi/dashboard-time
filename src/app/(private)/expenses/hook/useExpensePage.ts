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
  // Helper fecha hoy (yyyy-MM-dd)
  // ======================
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const today = getToday();

  const [paymentTypeFilter, setPaymentTypeFilter] = useState<Option | null>(null);

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
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

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
    paymentTypeFilter?.value,
    fromDate,
    toDate
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
        // ✅ FIX: onError agregado
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ??
            "Error al crear el gasto. Intentá de nuevo.";
          alert(msg);
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
        // ✅ FIX: onError agregado — antes el error se tragaba en silencio
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ??
            "Error al guardar el gasto. Intentá de nuevo.";
          alert(msg);
        },
      }
    );
  };

  // ======================
  // Eliminar
  // ======================
  const removeExpense = (id: number) => {
    if (deleteExpense.isPending) return;
    deleteExpense.mutate(id, {
      // ✅ FIX: onError agregado
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ??
          "Error al eliminar el gasto. Intentá de nuevo.";
        alert(msg);
      },
    });
  };

  // ======================
  // Filtros
  // ======================
  const clearFilters = () => {
    const today = getToday();

    setSearch("");
    setExpenseTypeFilter(null);
    setPaymentTypeFilter(null);
    setFromDate(today);
    setToDate(today);
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
    paymentTypeFilter,
    setPaymentTypeFilter,

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