"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saleRepository } from "@/data/repositories/saleRepository";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSaleDraft) => saleRepository.createSale(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreateSaleDraft }) =>
      saleRepository.updateSale(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => saleRepository.deleteSale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
};