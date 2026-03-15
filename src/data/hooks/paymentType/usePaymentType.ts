"use client";

import { paymentTypeRepository } from "@/data/repositories/paymentTypeRepository";
import { PaymentType, PaymentTypeOption } from "@/core/models/paymentType/PaymentType";
import { useQuery } from "@tanstack/react-query";

export const usePaymentTypeAll = (search: string) => {
  const result = useQuery<PaymentType[]>({
    queryKey: ["paymentType", search],
    queryFn: () => paymentTypeRepository.AllPaymentType(search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  return {
    data: result.data ?? [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
};

export function usePaymentTypeAllSearch() {
  const loadPaymentTypeSearch = async (input: string): Promise<PaymentTypeOption[]> => {
    const types = await paymentTypeRepository.AllPaymentType(input);
    return types.map((t) => ({
      value: t.id,
      label: t.name,
      applyDiscount: t.applyDiscount,
      discountPercent: t.discountPercent,
      applySurcharge: t.applySurcharge,
      surchargePercent: t.surchargePercent,
    }));
  };

  return { loadPaymentTypeSearch };
}