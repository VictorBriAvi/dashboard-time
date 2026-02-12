import { PaymentTypeBalance } from "@/core/models/reports/SalesByPayment";


// export const salesByPaymentService = {
//   formatForChart: (items: PaymentTypeBalance[]) => {
//     return items.map((item) => ({
//       name: item.medioDePago,
//       value: item.totalDisponible,
//     }));
//   },
// };



export const salesByPaymentService = {
  formatForGroupedChart: (items: PaymentTypeBalance[]) => {
    return items.map((item) => ({
      name: item.medioDePago,
      ventas: item.totalVentas,
      gastos: item.totalGastos,
      disponible: item.totalDisponible,
    }));
  },
};

