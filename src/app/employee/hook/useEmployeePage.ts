"use client";

import { useState } from "react";
import { Employee } from "@/core/models/employee/employee";
import { useEmployeeAll } from "@/data/hooks/employee/useEmployeeSearch";
import { employeeRepository } from "@/data/repositories/employeeRepository";

export function useEmployeePage() {
  // Crear
  const [name, setName] = useState("");
  const [identityDocument, setIdentityDocument] = useState("");
  const [paymentPercentage, setPaymentPercentage] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Listar / buscar
  const [search, setSearch] = useState("");

  // Editar
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Eliminar
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const { data: employees = [], refetch } = useEmployeeAll(search);

  // Crear
  const addEmployee = async () => {
    if (
      !name.trim() ||
      !identityDocument.trim() ||
      !paymentPercentage ||
      !dateBirth ||
      isCreating
    )
      return;

    try {
      setIsCreating(true);
      await employeeRepository.createEmployee({
        name,
        identityDocument,
        paymentPercentage: Number(paymentPercentage),
        dateBirth,
      });

      setName("");
      setIdentityDocument("");
      setPaymentPercentage("");
      setDateBirth("");

      refetch();
    } finally {
      setIsCreating(false);
    }
  };

  // Eliminar
  const deleteEmployee = async (id: number) => {
    if (isDeleting !== null) return;

    try {
      setIsDeleting(id);
      await employeeRepository.deteEmployee(id);
      refetch();
    } finally {
      setIsDeleting(null);
    }
  };

  // Editar
  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const updateEmployee = async () => {
    if (!editingEmployee || isUpdating) return;

    try {
      setIsUpdating(true);
      await employeeRepository.updateEmployee(editingEmployee);
      setEditingEmployee(null);
      refetch();
    } finally {
      setIsUpdating(false);
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
    isCreating,

    // listar
    employees,

    // buscar
    search,
    setSearch,

    // editar
    editingEmployee,
    setEditingEmployee,
    openEditModal,
    updateEmployee,
    isUpdating,

    // eliminar
    isDeleting,
    deleteEmployee,
  };
}
