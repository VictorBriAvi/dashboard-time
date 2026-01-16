"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";

function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateRange(type: "day" | "week" | "month" | "year") {
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
    const fromDate = toLocalDateString(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const toDate = toLocalDateString(
      new Date(today.getFullYear(), today.getMonth() + 1, 0)
    );
    return { fromDate, toDate };
  } 

  if (type === "year") {
    return {
      fromDate: `${today.getFullYear()}-01-01`,
      toDate: `${today.getFullYear()}-12-31`,
    };
  }

  throw new Error("Tipo de rango no válido");
}

export const useSummary = (rangeType: "day" | "week" | "month" | "year") => {
  const { fromDate, toDate } = getDateRange(rangeType);

  const query = useQuery({
    queryKey: ["summary", rangeType, fromDate, toDate],
    queryFn: () => reportRepository.getSummary(fromDate, toDate),
  });

  return { ...query, fromDate, toDate };
};
