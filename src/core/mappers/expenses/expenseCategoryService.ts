import { ExpenseCategoryRaw } from "@/core/models/reports/ExpenseCategoryRaw";

export const expenseCategoryService = {
  formatForPieChart: (items: ExpenseCategoryRaw[]) => {
    return items.map((i) => ({
      name: i.categoria,
      value: i.totalGasto,
    }));
  },
};
