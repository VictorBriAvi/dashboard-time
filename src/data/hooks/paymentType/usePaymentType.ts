"use client";

import { useCallback } from "react";
import { paymentTypeRepository } from "@/data/repositories/paymentTypeRepository";
import type { Option } from "@/ui/inputs/SearchSelect";

export const usePaymentTypeSearch = () => {
  const loadPaymentType = useCallback(async (input: string): Promise<Option[]> => {
    return await paymentTypeRepository.searchServiceType(input);
  }, []);

  return { loadPaymentType };
};
