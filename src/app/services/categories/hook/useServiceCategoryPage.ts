"use client";

import { useState } from "react";
// import { useServiceCategorieAll } from "@/data/hooks/serviceCategorie/useServiceCategorieAll";
import { useServiceCategorieAll } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import type { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";



export function useServiceCategoryPage() {
  const [name, setName] = useState("");

  // 🔹 Trae todas las categorías (query vacío o " ")
  const {
    data: categories,
    isLoading,
    isError,
  } = useServiceCategorieAll(" ");

  const addCategory = () => {
    if (!name.trim()) return;

    // ⚠️ Acá luego irá el POST real
    console.log("Crear categoría:", name);

    setName("");
  };

  return {
    name,
    setName,
    categories,
    isLoading,
    isError,
    addCategory,
  };
}
