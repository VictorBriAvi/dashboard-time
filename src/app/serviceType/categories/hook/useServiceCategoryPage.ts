"use client";

import { useState } from "react";
import { useServiceCategorieAll } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import { serviceCategorieRepository } from "@/data/repositories/serviceCategorieRepository";
import type { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export function useServiceCategoryPage() {

  //#region Hooks useStates

  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<ServiceCategorie | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");

 //#endregion
 
  //#region Hooks Personalizados
  const { data: categories = [], isLoading, isError, refetch } = useServiceCategorieAll(search);
  //#endregion

  //#region Methods
  const addCategory = async () => {
    if (!name.trim() || isCreating) return;

    try {
      setIsCreating(true);
      await serviceCategorieRepository.createServiceCategorie({ name });
      setName("");
      refetch();
    } catch (error) {

    } finally {
      setIsCreating(false);
    }
  };

    const deleteCategory = async (id: number) => {
    if (isDeleting !== null) return;

    try {
      setIsDeleting(id);
      await serviceCategorieRepository.deleteServiceCategorie(id);
      refetch();
    } catch (error) {
      console.error("Error al eliminar la categoría", error);
    } finally {
      setIsDeleting(null);
    }
  };

    const openEditModal = (category: ServiceCategorie) => {
    setEditingCategory(category);
  };

    const updateCategory = async () => {
    if (!editingCategory || isUpdating) return;

    try {
      setIsUpdating(true);
      await serviceCategorieRepository.updateServiceCategorie(editingCategory);
      setEditingCategory(null);
      refetch();
    } catch (error) {
      console.error("Error al actualizar la categoría", error);
    } finally {
      setIsUpdating(false);
    }
  };
  //#endregion
  
  //#region  Return

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

    // 👇 search
    search,
    setSearch,

    // editar
    editingCategory,
    setEditingCategory,
    openEditModal,
    updateCategory,
    isUpdating,
  };

  //#endregion

}
