// src/core/services/salesByDateRangeService.ts
import type { SaleByDateRange } from "@/core/models/SaleByDateRangeModel";

export const salesByDateRangeService = {
  toRaw: (items: SaleByDateRange[]): SaleByDateRange[] => {
    return items;
  },
};
