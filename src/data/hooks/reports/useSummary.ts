"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";

type RangeType = "day" | "week" | "month" | "year";

function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateRange(type: RangeType) {
  const today = new Date();

  if (type === "day") {
    const date = toLocalDateString(today);
    return { fromDate: date, toDate: date };
  }

  if (type === "week") {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      fromDate: toLocalDateString(monday),
      toDate: toLocalDateString(sunday),
    };
  }

  if (type === "month") {
    return {
      fromDate: toLocalDateString(
        new Date(today.getFullYear(), today.getMonth(), 1)
      ),
      toDate: toLocalDateString(
        new Date(today.getFullYear(), today.getMonth() + 1, 0)
      ),
    };
  }

  if (type === "year") {
    return {
      fromDate: `${today.getFullYear()}-01-01`,
      toDate: `${today.getFullYear()}-12-31`,
    };
  }

  throw new Error("Tipo de rango no válido");
}

export const useSummary = (fromDate: string, toDate: string) => {
  const query = useQuery({
    queryKey: ["summary", fromDate, toDate],
    queryFn: () => reportRepository.getSummary(fromDate, toDate),
    // Esto evita llamadas innecesarias si por alguna razón las fechas llegan vacías
    enabled: !!fromDate && !!toDate, 
  });

  return {
    ...query,
    fromDate,
    toDate,
  };
};
