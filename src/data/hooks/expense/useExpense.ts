"use client";

import { useQuery } from "@tanstack/react-query";
import type { Expense } from "@/core/models/expense/expense";
import { expenseRepository } from "@/data/repositories/expenseRepository";

export const useExpenseAll = (
  search: string,
  expenseCategorieId?: number,
  date?: string
) => {
  const result = useQuery<Expense[]>({
    queryKey: ["expense", search, expenseCategorieId, date],
    queryFn: () =>
      expenseRepository.AllExpense(search, expenseCategorieId, date),
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
