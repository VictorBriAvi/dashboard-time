"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saleRepository } from "@/data/repositories/saleRepository";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSaleDraft) =>
      saleRepository.createSale(payload),

    onSuccess: () => {
      // 🔄 refresca cualquier listado de ventas
      queryClient.invalidateQueries({
        queryKey: ["sales-by-date-range"],
      });
    },
  });
};
