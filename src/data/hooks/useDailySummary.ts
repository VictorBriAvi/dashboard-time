// src/data/hooks/useDailySummary.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";
import type { DailyChartData } from "@/core/models/DailySummaryReportModel"; // ← AÑADÍ ESTO

export type RangeType = "day" | "week" | "month" | "year";

function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export const useDailySummary = (rangeType: RangeType = "month") => {
  const today = new Date();
  let fromDate: string;
  let toDate: string = toLocalDateString(today);

  if (rangeType === "day") {
    fromDate = toDate;
  } else if (rangeType === "week") {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    fromDate = toLocalDateString(monday);
  } else if (rangeType === "month") {
    fromDate = toLocalDateString(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
  } else {
    fromDate = `${today.getFullYear()}-01-01`;
  }

  const query = useQuery<DailyChartData[]>({
    queryKey: ["daily-summary", rangeType, fromDate, toDate],
    queryFn: () => reportRepository.getDailySummary(fromDate, toDate),
    staleTime: 1000 * 60 * 5,
    enabled: !!fromDate && !!toDate,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    fromDate,
    toDate,

    // 👇 MOSTRAR SIN RECONSTRUIR Date UTC
    fromDateDisplay: fromDate.split("-").reverse().join("/"),
    toDateDisplay: toDate.split("-").reverse().join("/"),
  };
};
