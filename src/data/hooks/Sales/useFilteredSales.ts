"use client";

import { useQuery } from "@tanstack/react-query";
import { saleRepository } from "@/data/repositories/saleRepository";
import type { Sale } from "@/core/models/sales/Sale";
import { mapSaleToTableModel } from "@/core/mappers/sales/SaleTableMapper";

export interface SalesFilter {
  fromDate?: string;
  toDate?: string;
  clientId?: number | null;
  employeeId?: number | null;
  paymentTypeId?: number | null;
  serviceTypeId?: number | null;
}

export const useFilteredSales = (filters: SalesFilter) => {
  const query = useQuery({
    queryKey: ["sales", "filtered", filters],
    queryFn: () => saleRepository.getFilteredSales(filters),
    select: (data: Sale[]) => data.map(mapSaleToTableModel),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};