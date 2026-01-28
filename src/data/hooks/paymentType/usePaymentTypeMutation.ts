"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentTypeRepository } from "@/data/repositories/paymentTypeRepository";
import { PaymentType } from "@/core/models/paymentType/PaymentType";

export const useCreatePaymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) =>
      paymentTypeRepository.createPaymentType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentType"] });
    },
  });
};

export const useUpdatePaymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PaymentType) =>
      paymentTypeRepository.updatePaymentType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentType"] });
    },
  });
};

export const useDeletePaymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      paymentTypeRepository.deletePaymentType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentType"] });
    },
  });
};
