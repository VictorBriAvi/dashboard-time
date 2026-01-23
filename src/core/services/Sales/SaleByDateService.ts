import type { SaleByDateRange } from "@/core/models/reports/SaleByDateRangeModel";

export const salesByDateDomainService = {
  getEmployees(sales: SaleByDateRange[]) {
    const map = new Map<number, string>();

    sales.forEach((sale) => {
      sale.saleDetail.forEach((d) => {
        if (!map.has(d.employeeId)) {
          map.set(d.employeeId, d.nameEmployeeSale);
        }
      });
    });

    return Array.from(map, ([id, name]) => ({ id, name }));
  },

  filterByEmployee(
    sales: SaleByDateRange[],
    employeeId: number | null,
  ): SaleByDateRange[] {
    if (!employeeId) return sales;

    return sales
      .map((sale) => {
        const details = sale.saleDetail.filter(
          (d) => d.employeeId === employeeId,
        );

        if (details.length === 0) return null;

        return {
          ...sale,
          saleDetail: details,
          totalAmount: details.reduce((sum, d) => sum + d.totalCalculated, 0),
        };
      })
      .filter(Boolean) as SaleByDateRange[];
  },
};
