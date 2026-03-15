"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saleRepository } from "@/data/repositories/saleRepository";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export const useGetSaleById = (id: number | null) => {
  return useQuery({
    queryKey: ["sale", id],
    queryFn: () => saleRepository.getSaleById(id!),
    enabled: id !== null,
    staleTime: 0, // siempre fresco al abrir el modal
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