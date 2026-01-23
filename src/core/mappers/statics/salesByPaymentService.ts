import { SalesByPayment } from "@/core/models/reports/SalesByPayment";

export const salesByPaymentService = {
  formatForChart: (items: SalesByPayment[]) => {
    return items.map((item) => ({
      name: item.medioDePago,
      value: item.totalRecaudado,
      operaciones: item.cantidadOperaciones,
    }));
  },
};
