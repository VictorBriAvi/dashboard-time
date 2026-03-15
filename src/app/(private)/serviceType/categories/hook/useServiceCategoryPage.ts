"use client";

import { useState } from "react";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";
import { useServiceCategorieAll } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import {
  useCreateServiceCategory,
  useUpdateServiceCategory,
  useDeleteServiceCategory,
} from "@/data/hooks/serviceCategorie/useServiceCategorieMutation";

export function useServiceCategoryPage() {
  // ======================
  // State
  // ======================
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] =
    useState<ServiceCategorie | null>(null);

  // ======================
  // Query
  // ======================
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useServiceCategorieAll(search);

  // ======================
  // Mutations
  // ======================
  const createCategory = useCreateServiceCategory();
  const updateCategory = useUpdateServiceCategory();
  const deleteCategory = useDeleteServiceCategory();

  // ======================
  // Create
  // ======================
  const addCategory = () => {
    if (!name.trim() || createCategory.isPending) return;

    createCategory.mutate(
      { name },
      {
        onSuccess: () => setName(""),
        // ✅ FIX: onError agregado
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ??
            "Error al crear la categoría. Intentá de nuevo.";
          alert(msg);
        },
      }
    );
  };

  // ======================
  // Delete
  // ======================
  const removeCategory = (id: number) => {
    if (deleteCategory.isPending) return;
    deleteCategory.mutate(id, {
      // ✅ FIX: onError agregado
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ??
          "Error al eliminar la categoría. Intentá de nuevo.";
        alert(msg);
      },
    });
  };

  // ======================
  // Edit
  // ======================
  const openEditModal = (category: ServiceCategorie) => {
    setEditingCategory(category);
  };

  const saveCategory = () => {
    if (!editingCategory || updateCategory.isPending) return;

    updateCategory.mutate(editingCategory, {
      onSuccess: () => setEditingCategory(null),
      // ✅ FIX: onError agregado — antes el error se tragaba en silencio
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ??
          "Error al guardar la categoría. Intentá de nuevo.";
        alert(msg);
      },
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

    // editar
    editingCategory,
    setEditingCategory,
    openEditModal,
    saveCategory,
    isUpdating: updateCategory.isPending,

    // eliminar
    removeCategory,
    isDeleting: deleteCategory.isPending,
  };
}