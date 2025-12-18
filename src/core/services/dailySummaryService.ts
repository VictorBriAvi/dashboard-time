// src/core/services/dailySummaryService.ts
import type { DailySummaryRaw, DailyChartData } from "@/core/models/DailySummaryReportModel";

export const dailySummaryService = {
  formatForChart: (items: DailySummaryRaw[]): DailyChartData[] => {
    return items.map((item) => {
      const date = new Date(item.fecha);
      const day = date.getDate().toString().padStart(2, "0");
      const month = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][date.getMonth()];

      return {
        name: `${day} ${month}`,
        ingresos: item.totalVentas,
        gastos: item.totalGastos,
      };
    });
  },
};