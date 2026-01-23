"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";

export interface ExpenseUI {
  description: string;
  value: number;
  categoryName: string;
}

export function useExpensePage() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [categorySelected, setCategorySelected] = useState<Option | null>(null);
  const [expenses, setExpenses] = useState<ExpenseUI[]>([]);

  const addExpense = () => {
    if (!description || !value || !categorySelected) return;

    setExpenses((prev) => [
      ...prev,
      {
        description,
        value: Number(value),
        categoryName: categorySelected.label,
      },
    ]);

    setDescription("");
    setValue("");
    setCategorySelected(null);
  };

  return {
    description,
    setDescription,
    value,
    setValue,
    categorySelected,
    setCategorySelected,
    expenses,
    addExpense,
  };
}
