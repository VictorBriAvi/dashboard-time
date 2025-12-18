// employeeSaleSummaryService.ts
import type { EmployeeSaleSummaryRaw } from "@/core/models/EmployeeSaleSummaryReportModel";
import type { EmployeeSaleChartData } from "@/core/models/EmployeeSaleSummaryReportModel";

export const employeeSaleSummaryService = {

  formatForChart: (items: EmployeeSaleSummaryRaw[]): EmployeeSaleChartData[] => {

    return items.map((item) => ({
      name: item.empleado,
      value: item.totalAPagar,

    }));

  },
  
};

export const employeeSaleRawService = {
  toRaw: (items: EmployeeSaleSummaryRaw[]): EmployeeSaleSummaryRaw[] => {
    return items;
  },
};

