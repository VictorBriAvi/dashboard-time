import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";
import type { EmployeeSaleChartData, EmployeeSaleSummaryRaw } from "@/core/models/reports/EmployeeSaleSummaryReportModel";
import { employeeSaleRawService } from "@/core/mappers/statics/employeeSaleSummaryService";

export const useEmployeeSaleSummary = (fromDate: string, toDate: string) => {
  return useQuery<EmployeeSaleChartData[]>({
    queryKey: ["employee-sale-summary", fromDate, toDate],
    queryFn: () => reportRepository.getEmployeeSaleSummary(fromDate, toDate),
  });
};


export const useEmployeeSaleSummaryRaw = (fromDate: string, toDate: string) => {
  return useQuery<EmployeeSaleSummaryRaw[]>({
    queryKey: ["employee-sale-summary-raw", fromDate, toDate],
    queryFn: async () => {
      const raw = await reportRepository.getEmployeeSalePorcentSummary(fromDate, toDate);
      return employeeSaleRawService.toRaw(raw);
    },
    enabled: !!fromDate && !!toDate,
  });
};
