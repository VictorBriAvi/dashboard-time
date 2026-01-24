"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";
import { useServiceTypeAll } from "@/data/hooks/serviceType/useServiceType";
import type {
  CreateServiceType,
  EditServiceType,
  ServiceType,
} from "@/core/models/serviceType/ServiceType";
import { serviceTypeRepository } from "@/data/repositories/serviceTypeRepository";
import { useQueryClient } from "@tanstack/react-query";

export function useServiceTypePage() {
  const [categorySelected, setCategorySelected] = useState<Option | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Option | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingService, setEditingService] = useState<EditServiceType | null>(null );
  const [isUpdating, setIsUpdating] = useState(false);
  const [editCategory, setEditCategory] = useState<Option | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  

  const { data: services = [], isLoading, isError, refetch } = useServiceTypeAll(search, categoryFilter?.value);


    const queryClient = useQueryClient();
  // =========================
  // Crear
  // =========================
  const addService = async () => {
    if (!categorySelected || !name.trim() || !price || isCreating) return;

    try {
      setIsCreating(true);

      await serviceTypeRepository.createServiceType({
        name,
        price: Number(price),
        serviceCategorieId: categorySelected.value,
      });

      queryClient.invalidateQueries({
        queryKey: ["service-types"],
      });

      setName("");
      setPrice("");
      setCategorySelected(null);
    } catch (error) {
      console.error("Error al crear el servicio", error);
    } finally {
      setIsCreating(false);
    }
  };

  const openEditModal = (service: ServiceType) => {
    
    setEditingService(service);
    setEditName(service.name);
    setEditPrice(String(service.price));
    setEditCategory({ value: service.serviceCategorieId, label: service.serviceCategorieName});

  };

  const saveEditService = async () => {
    if (!editingService || !editCategory) return;

    try {
      setIsUpdating(true);

      await serviceTypeRepository.updateServiceType({
        id: editingService.id,
        name: editName.trim(),
        price: Number(editPrice),
        serviceCategorieId: editCategory.value,
      });


      setEditingService(null);
            refetch();
    } catch (error) {
      console.error("Error al actualizar el servicio", error);
    } finally {
      setIsUpdating(false);
    }
  };


      const deleteServiceType = async (id: number) => {
      if (isDeleting !== null) return;
  
      try {
        setIsDeleting(id);
        await serviceTypeRepository.deleteServiceType(id);
        refetch();
      } catch (error) {
        console.error("Error al eliminar la categoría", error);
      } finally {
        setIsDeleting(null);
      }
    };

  return {
    // crear
    categorySelected,
    setCategorySelected,
    name,
    setName,
    price,
    setPrice,
    addService,
    isCreating,

    // filtros
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,

    // listar
    services,
    isLoading,
    isError,

    // eliminar
    isDeleting,
    deleteServiceType,

    // editar
    editingService,
    setEditingService,
    openEditModal,

    editCategory,
    setEditCategory,
    editName,
    setEditName,
    editPrice,
    setEditPrice,

    isUpdating,
    saveEditService,

  };
}
