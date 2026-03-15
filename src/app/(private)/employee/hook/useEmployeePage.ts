"use client";

import { useState } from "react";
import { Employee } from "@/core/models/employee/employee";
import { useEmployeeAll } from "@/data/hooks/employee/useEmployeeSearch";
import {
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from "@/data/hooks/employee/useEmployeeMutations";

export function useEmployeePage() {
  // ======================
  // Crear
  // ======================
  const [name, setName] = useState("");
  const [identityDocument, setIdentityDocument] = useState("");
  const [paymentPercentage, setPaymentPercentage] = useState("");
  const [dateBirth, setDateBirth] = useState("");

  // ======================
  // Buscar
  // ======================
  const [search, setSearch] = useState("");

  // ======================
  // Editar
  // ======================
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // ======================
  // Query
  // ======================
  const { data: employees, isLoading, isError } = useEmployeeAll(search);

  // ======================
  // Mutations
  // ======================
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  // ======================
  // Crear
  // ======================
  const addEmployee = async () => {
    if (
      !name.trim() ||
      !identityDocument.trim() ||
      !paymentPercentage ||
      !dateBirth
    )
      return;

    try {
      await createEmployee.mutateAsync({
        name,
        identityDocument,
        paymentPercentage: Number(paymentPercentage),
        dateBirth,
      });

      setName("");
      setIdentityDocument("");
      setPaymentPercentage("");
      setDateBirth("");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al crear el colaborador. Intentá de nuevo.";
      alert(msg);
    }
  };

  // ======================
  // Eliminar
  // ======================
  const removeEmployee = async (id: number) => {
    try {
      await deleteEmployee.mutateAsync(id);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al eliminar el colaborador. Intentá de nuevo.";
      alert(msg);
    }
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const updateEmployeeData = async () => {
    if (!editingEmployee) return;

    // ✅ FIX: try/catch agregado — antes los errores de mutateAsync no se manejaban
    try {
      await updateEmployee.mutateAsync(editingEmployee);
      setEditingEmployee(null);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al guardar el colaborador. Intentá de nuevo.";
      alert(msg);
    }
  };

  return {
    // crear
    name,
    setName,
    identityDocument,
    setIdentityDocument,
    paymentPercentage,
    setPaymentPercentage,
    dateBirth,
    setDateBirth,
    addEmployee,
    isCreating: createEmployee.isPending,

    // listar
    employees,
    isLoading,
    isError,

    // buscar
    search,
    setSearch,

    // editar
    editingEmployee,
    setEditingEmployee,
    openEditModal,
    updateEmployee: updateEmployeeData,
    isUpdating: updateEmployee.isPending,

    // eliminar
    removeEmployee,
    isDeleting: deleteEmployee.isPending,
  };
}