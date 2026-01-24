"use client";

import { useState } from "react";
import { useExpenseCategorieAll } from "@/data/hooks/expenseCategorie/useExpenseCategorie";
import { expenseCategorieRepository } from "@/data/repositories/expenseCategorieRepository";
import type { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";

export function useExpenseCategoryPage() {

  //#region States
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategorie | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  //#endregion

  //#region Data
  const { data: categories = [], isLoading, isError, refetch } =
    useExpenseCategorieAll(search);
  //#endregion

  //#region Methods
  const addCategory = async () => {
    if (!name.trim() || isCreating) return;

    try {
      setIsCreating(true);
      await expenseCategorieRepository.createExpenseCategorie({ name });
      setName("");
      refetch();
    } finally {
      setIsCreating(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (isDeleting !== null) return;

    try {
      setIsDeleting(id);
      await expenseCategorieRepository.deleteExpenseCategorie(id);
      refetch();
    } finally {
      setIsDeleting(null);
    }
  };

  const openEditModal = (category: ExpenseCategorie) => {
    setEditingCategory(category);
  };

  const updateCategory = async () => {
    if (!editingCategory || isUpdating) return;

    try {
      setIsUpdating(true);
      await expenseCategorieRepository.updateExpenseCategorie(editingCategory);
      setEditingCategory(null);
      refetch();
    } finally {
      setIsUpdating(false);
    }
  };
  //#endregion

  return {
    // crear
    name,
    setName,
    isCreating,
    addCategory,

    // listar
    categories,
    isLoading,
    isError,

    // eliminar
    deleteCategory,
    isDeleting,

    // buscar
    search,
    setSearch,

    // editar
    editingCategory,
    setEditingCategory,
    openEditModal,
    updateCategory,
    isUpdating,
  };
}
