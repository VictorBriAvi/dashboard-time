"use client";

import { useCallback } from "react";
import { paymentTypeRepository } from "@/data/repositories/paymentTypeRepository";
import type { Option } from "@/ui/inputs/SearchSelect";
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { useQuery } from "@tanstack/react-query";

export const usePaymentTypeSearch = () => {
  const loadPaymentType = useCallback(async (input: string): Promise<Option[]> => {
    return await paymentTypeRepository.searchServiceType(input);
  }, []);

  return { loadPaymentType };
};

export const usePaymentTypeAll = (search: string) => {
  const result = useQuery<PaymentType[]>({
    queryKey: ["payment - type", search],
    queryFn: () => paymentTypeRepository.AllPaymentType(search),
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

export function usePaymentTypeAllSearch() {
  const loadPaymentType = async (input: string): Promise<Option[]> => {
    const categories = await paymentTypeRepository.AllPaymentType(input);

    return categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  };

  return {
    loadPaymentType,
  };
}