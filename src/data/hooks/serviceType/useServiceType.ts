"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceTypeRepository } from "@/data/repositories/serviceTypeRepository";
import type { ServiceType } from "@/core/models/serviceType/ServiceType";

export const useServiceTypeAll = (
  search: string,
  serviceCategorieId?: number
) => {
  const result = useQuery<ServiceType[]>({
    queryKey: ["service-types", search, serviceCategorieId],
    queryFn: () =>
      serviceTypeRepository.AllServiceType(search, serviceCategorieId),
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
