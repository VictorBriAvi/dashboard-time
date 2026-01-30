// src/data/hooks/useSalesByDateRange.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";
import type { SaleByDateRange } from "@/core/models/reports/SaleByDateRangeModel";

export const useSalesByDateRange = (fromDate: string, toDate: string) => {
  const query = useQuery<SaleByDateRange[]>({
    queryKey: ["reports", "sales", "by-date-range", fromDate, toDate],
    queryFn: () => reportRepository.getSalesByDateRange(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
