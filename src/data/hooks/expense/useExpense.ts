"use client";

import { useQuery } from "@tanstack/react-query";
import type { Expense } from "@/core/models/expense/expense";
import { expenseRepository } from "@/data/repositories/expenseRepository";

export const useExpenseAll = (
  search: string,
  expenseTypeId?: number,
  fromDate?: string,
  toDate?: string
) => {
  const query = useQuery<Expense[]>({
    queryKey: ["expenses", search, expenseTypeId, fromDate, toDate],
    queryFn: () =>
      expenseRepository.All(search, expenseTypeId, fromDate, toDate),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
