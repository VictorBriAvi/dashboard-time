"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceCategorieRepository } from "@/data/repositories/serviceCategorieRepository";
import type { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export const useServiceCategorieAll = (query: string) => {
  const result = useQuery<ServiceCategorie[]>({
    queryKey: ["service-categories", query],
    queryFn: () => serviceCategorieRepository.AllServiceCategorie(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: result.data ?? [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
};
