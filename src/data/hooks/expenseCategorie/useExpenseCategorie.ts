"use client";

import { useQuery } from "@tanstack/react-query";
import { expenseCategorieRepository } from "@/data/repositories/expenseCategorieRepository";
import type { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";
import { Option } from "@/ui/inputs/SearchSelect";

export const useExpenseCategorieAll = (search: string) => {
  const result = useQuery<ExpenseCategorie[]>({
    queryKey: ["expense-categories", search],
    queryFn: () => expenseCategorieRepository.AllExpenseCategorie(search),
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



export function useExpenseCategorieSearch() {
  const loadExpenseCategories = async (input: string): Promise<Option[]> => {
    const categories = await expenseCategorieRepository.AllExpenseCategorie(input);

    return categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  };

  return {
    loadExpenseCategories,
  };
}