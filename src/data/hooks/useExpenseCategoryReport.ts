"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";

export const useExpenseCategoryReport = (fromDate: string, toDate: string) => {
  return useQuery({
    queryKey: ["expensesByCategory", fromDate, toDate],
    queryFn: async () => {
      if (!fromDate || !toDate) return [];
      return await reportRepository.getExpensesByCategory(fromDate, toDate);
    },
    enabled: !!fromDate && !!toDate, // evita ejecutar si aún no hay fechas
  });
};
