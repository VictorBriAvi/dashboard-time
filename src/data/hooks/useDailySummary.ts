// src/data/hooks/useDailySummary.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";
import type { DailyChartData } from "@/core/models/DailySummaryReportModel"; // ← AÑADÍ ESTO

export type RangeType = "day" | "week" | "month" | "year";

export const useDailySummary = (rangeType: RangeType = "month") => {
  const today = new Date();
  let fromDate: string;
  let toDate: string = today.toISOString().split("T")[0];

  if (rangeType === "day") {
    fromDate = toDate;
  } else if (rangeType === "week") {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    fromDate = monday.toISOString().split("T")[0];
  } else if (rangeType === "month") {
    fromDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
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
    fromDateDisplay: new Date(fromDate).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
    }),
    toDateDisplay: new Date(toDate).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
};
