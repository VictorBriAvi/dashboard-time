"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseRepository } from "@/data/repositories/expenseRepository";
import { CreateExpense, EditExpense } from "@/core/models/expense/expense";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExpense) =>
      expenseRepository.createExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditExpense) =>
      expenseRepository.updateExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => expenseRepository.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
