"use client";

import { useState } from "react";
import type { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";
import { useExpenseCategorieAll } from "@/data/hooks/expenseCategorie/useExpenseCategorie";
import {
  useCreateExpenseCategory,
  useDeleteExpenseCategory,
  useUpdateExpenseCategory,
} from "@/data/hooks/expenseCategorie/useExpenseCategoryMutation";

export function useExpenseCategoryPage() {
  // ======================
  // Form / búsqueda
  // ======================
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  // ======================
  // Editar
  // ======================
  const [editingCategory, setEditingCategory] =
    useState<ExpenseCategorie | null>(null);

  // ======================
  // Queries
  // ======================
  const { data: categories = [], isLoading, isError } =
    useExpenseCategorieAll(search);

  // ======================
  // Mutations
  // ======================
  const createCategory = useCreateExpenseCategory();
  const updateCategory = useUpdateExpenseCategory();
  const deleteCategory = useDeleteExpenseCategory();

  // ======================
  // Actions
  // ======================
  const addCategory = () => {
    if (!name.trim() || createCategory.isPending) return;

    createCategory.mutate(
      { name },
      {
        onSuccess: () => setName(""),
      }
    );
  };

  const removeCategory = (id: number) => {
    if (deleteCategory.isPending) return;
    deleteCategory.mutate(id);
  };

  const openEditModal = (category: ExpenseCategorie) => {
    setEditingCategory(category);
  };

  const saveEditCategory = () => {
    if (!editingCategory || updateCategory.isPending) return;

    updateCategory.mutate(editingCategory, {
      onSuccess: () => setEditingCategory(null),
    });
  };

  return {
    // crear
    name,
    setName,
    addCategory,
    isCreating: createCategory.isPending,

    // listar
    categories,
    isLoading,
    isError,

    // buscar
    search,
    setSearch,

    // eliminar
    removeCategory,
    isDeleting: deleteCategory.isPending,

    // editar
    editingCategory,
    setEditingCategory,
    openEditModal,
    saveEditCategory,
    isUpdating: updateCategory.isPending,
  };
}
