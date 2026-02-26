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
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  // ======================
  // Query
  // ======================
  const { data: employees = [] } = useEmployeeAll(search);

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
  };

  // ======================
  // Eliminar
  // ======================
  const removeEmployee = async (id: number) => {
    await deleteEmployee.mutateAsync(id);
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const updateEmployeeData = async () => {
    if (!editingEmployee) return;

    await updateEmployee.mutateAsync(editingEmployee);
    setEditingEmployee(null);
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
