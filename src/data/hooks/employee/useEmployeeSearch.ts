"use client";

import { useCallback } from "react";
import { employeeRepository } from "@/data/repositories/employeeRepository";
import type { Option } from "@/ui/inputs/SearchSelect";
import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/core/models/employee/employee";

export const useEmployeeSearch = () => {
  const loadEmployees = useCallback(async (input: string): Promise<Option[]> => {
    return await employeeRepository.searchEmployees(input);
  }, []);

  return { loadEmployees };
};

export const useEmployeeAll = (search: string) => {
  const result = useQuery<Employee[]>({
    queryKey: ["employee", search],
    queryFn: () => employeeRepository.AllEmployee(search),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: result.data ?? [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
};

export function useEmployeeAllSearch() {
  const loadPaymentType = async (input: string): Promise<Option[]> => {
    const categories = await employeeRepository.AllEmployee(input);

    return categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  };

  return {
    loadPaymentType,
  };
}
