"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseCategorieRepository } from "@/data/repositories/expenseCategorieRepository";

export const useCreateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategorieRepository.createExpenseCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseCategories"] });
    },
  });
};

export const useUpdateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategorieRepository.updateExpenseCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseCategories"] });
    },
  });
};

export const useDeleteExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseCategorieRepository.deleteExpenseCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseCategories"] });
    },
  });
};
