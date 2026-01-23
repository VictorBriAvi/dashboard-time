"use client";

import { useCallback } from "react";
import { employeeRepository } from "@/data/repositories/employeeRepository";
import type { Option } from "@/ui/inputs/SearchSelect";

export const useEmployeeSearch = () => {
  const loadEmployees = useCallback(async (input: string): Promise<Option[]> => {
    return await employeeRepository.searchEmployees(input);
  }, []);

  return { loadEmployees };
};
