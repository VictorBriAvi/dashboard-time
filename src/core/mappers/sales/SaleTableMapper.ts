import { Sale } from "@/core/models/sales/Sale";
import { SaleTableModel } from "@/core/models/sales/SaleTableModel";

export const mapSaleToTableModel = (sale: Sale): SaleTableModel => {
  // Agrupar pagos
  const paymentMap = new Map<string, number>();

  sale.payments.forEach(p => {
    paymentMap.set(
      p.paymentTypeName,
      (paymentMap.get(p.paymentTypeName) || 0) + p.amountPaid
    );
  });

  const paymentsSummary = Array.from(paymentMap.entries()).map(
    ([name, total]) => ({
      name,
      total
    })
  );

  // Empleados únicos
  const employeesSummary = Array.from(
    new Set(sale.saleDetail.map(d => d.nameEmployeeSale))
  );

  // Servicios únicos
  const servicesSummary = Array.from(
    new Set(sale.saleDetail.map(d => d.nameServiceTypeSale))
  );

  return {
    id: sale.id,
    dateSale: sale.dateSale,
    clientName: sale.nameClient,
    totalAmount: sale.totalAmount,
    paymentsSummary,
    employeesSummary,
    servicesSummary
  };
};