"use client";

import { useCallback } from "react";
import { clientRepository } from "@/data/repositories/clientRepository";
import type { Option } from "@/ui/inputs/SearchSelect";

export const useClientSearch = () => {
  const loadClients = useCallback(async (input: string): Promise<Option[]> => {
    return await clientRepository.searchClients(input);
  }, []);

  return { loadClients };
};
