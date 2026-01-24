"use client";

import { useCallback } from "react";
import { serviceTypeRepository } from "@/data/repositories/serviceTypeRepository";
import type { Option } from "@/ui/inputs/SearchSelect";

export const useServiceTypeSearch = () => {
  const loadServiceType = useCallback(async (input: string): Promise<Option[]> => {
    return await serviceTypeRepository.searchServiceType(input);
  }, []);

  return { loadServiceType };
};