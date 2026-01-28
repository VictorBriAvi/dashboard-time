"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceCategorieRepository } from "@/data/repositories/serviceCategorieRepository";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export const useCreateServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) =>
      serviceCategorieRepository.createServiceCategorie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCategorie"] });
    },
  });
};

export const useUpdateServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ServiceCategorie) =>
      serviceCategorieRepository.updateServiceCategorie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCategorie"] });
    },
  });
};

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      serviceCategorieRepository.deleteServiceCategorie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCategorie"] });
    },
  });
};
