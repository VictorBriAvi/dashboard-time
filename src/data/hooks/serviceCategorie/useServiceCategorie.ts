"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceCategorieRepository } from "@/data/repositories/serviceCategorieRepository";
import type { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";
import { Option } from "@/ui/inputs/SearchSelect";

export const useServiceCategorieAll = (search: string) => {
  const result = useQuery<ServiceCategorie[]>({
    queryKey: ["serviceCategorie", search],
    queryFn: () => serviceCategorieRepository.AllServiceCategorie(search),
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



export function useServiceCategorieSearch() {
  const loadServiceCategories = async (input: string): Promise<Option[]> => {
    const categories = await serviceCategorieRepository.AllServiceCategorie(input);

    return categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  };

  return {
    loadServiceCategories,
  };
}