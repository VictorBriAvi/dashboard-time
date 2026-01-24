import { ExpenseCategoryRaw } from "@/core/models/reports/ExpenseCategoryRaw";

//revisar despues, ya que esta pertenece al reporte del dashboard

export const expenseCategoryService = {
  formatForPieChart: (items: ExpenseCategoryRaw[]) => {
    return items.map((i) => ({
      name: i.categoria,
      value: i.totalGasto,
    }));
  },
};
