"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";
import { useServiceTypeAll } from "@/data/hooks/serviceType/useServiceType";
import {
  CreateServiceType,
  EditServiceType,
  ServiceType,
} from "@/core/models/serviceType/ServiceType";
import {
  useCreateServiceType,
  useUpdateServiceType,
  useDeleteServiceType,
} from "@/data/hooks/serviceType/useServiceTypeMutation";

export function useServiceTypePage() {
  // ======================
  // Create state
  // ======================
  const [categorySelected, setCategorySelected] = useState<Option | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // ======================
  // Filters
  // ======================
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Option | null>(null);

  // ======================
  // Edit state
  // ======================
  const [editingService, setEditingService] =
    useState<ServiceType | null>(null);
  const [editCategory, setEditCategory] = useState<Option | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // ======================
  // Query
  // ======================
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServiceTypeAll(search, categoryFilter?.value);

  // ======================
  // Mutations
  // ======================
  const createService = useCreateServiceType();
  const updateService = useUpdateServiceType();
  const deleteService = useDeleteServiceType();

  // ======================
  // Create
  // ======================
  const addService = () => {
    if (!categorySelected || !name.trim() || !price) return;

    const payload: CreateServiceType = {
      name: name.trim(),
      price: Number(price),
      serviceCategorieId: categorySelected.value,
    };

    createService.mutate(payload, {
      onSuccess: () => {
        setName("");
        setPrice("");
        setCategorySelected(null);
      },
    });
  };

  // ======================
  // Edit
  // ======================
  const openEditModal = (service: ServiceType) => {
    setEditingService(service);
    setEditName(service.name);
    setEditPrice(String(service.price));
    setEditCategory({
      value: service.serviceCategorieId,
      label: service.serviceCategorieName,
    });
  };

  const saveEditService = () => {
    if (!editingService || !editCategory) return;

    const payload: EditServiceType = {
      id: editingService.id,
      name: editName.trim(),
      price: Number(editPrice),
      serviceCategorieId: editCategory.value,
    };

    updateService.mutate(payload, {
      onSuccess: () => setEditingService(null),
    });
  };

  // ======================
  // Delete
  // ======================
  const removeService = (id: number) => {
    deleteService.mutate(id);
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
    isCreating: createService.isPending,

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
    removeService,
    isDeleting: deleteService.isPending,

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

    saveEditService,
    isUpdating: updateService.isPending,
  };
}
