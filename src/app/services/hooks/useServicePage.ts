"use client";

import { useState } from "react";
import { Option } from "@/ui/inputs/SearchSelect";

export interface ServiceUI {
  name: string;
  price: number;
  categoryName: string;
}

export function useServicePage() {
  const [categorySelected, setCategorySelected] = useState<Option | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState<ServiceUI[]>([]);

  const addService = () => {
    if (!categorySelected || !name || !price) return;

    setServices((prev) => [
      ...prev,
      {
        name,
        price: Number(price),
        categoryName: categorySelected.label,
      },
    ]);

    // reset
    setName("");
    setPrice("");
    setCategorySelected(null);
  };

  return {
    categorySelected,
    setCategorySelected,
    name,
    setName,
    price,
    setPrice,
    services,
    addService,
  };
}
