// src/data/hooks/useDailySummary.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";
import type { DailyChartData } from "@/core/models/reports/DailySummaryReportModel";

export interface UseDailySummaryParams {
  fromDate: string;
  toDate: string;
  enabled?: boolean;
}

export const useDailySummary = ({
  fromDate,
  toDate,
  enabled = true,
}: UseDailySummaryParams) => {
  const query = useQuery<DailyChartData[]>({
    queryKey: ["daily-summary", fromDate, toDate],
    queryFn: () => reportRepository.getDailySummary(fromDate, toDate),
    staleTime: 1000 * 60 * 5,
    enabled: enabled && !!fromDate && !!toDate,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
