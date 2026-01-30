"use client";

import { useCallback } from "react";
import { clientRepository } from "@/data/repositories/clientRepository";
import type { Option } from "@/ui/inputs/SearchSelect";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@/core/models/client/client";

export const useClientSearch = () => {
  const loadClients = useCallback(async (input: string): Promise<Option[]> => {
    return await clientRepository.searchClients(input);
  }, []);

  return { loadClients };
};

export const useClientAll = (search: string) => {
  const result = useQuery<Client[]>({
    queryKey: ["client", search],
    queryFn: () => clientRepository.AllClient(search),
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

export function useClientAllSearch() {
  const loadClient = async (input: string): Promise<Option[]> => {
    const clients = await clientRepository.AllClient(input);

    return clients.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  };

  return {
    loadClient,
  };
}
