// src/data/hooks/useSalesByDateRange.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { saleRepository } from "@/data/repositories/saleRepository";
import type { Sale } from "@/core/models/sales/Sale";

export const useSalesByDateRange = (fromDate: string, toDate: string) => {
  const query = useQuery<Sale[]>({
    queryKey: ["sales-by-date-range", fromDate, toDate],
    queryFn: () => saleRepository.getSalesByDateRange(fromDate, toDate),
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
