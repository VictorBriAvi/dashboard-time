export interface SaleTableModel {
  id: number;
  dateSale: string;
  clientName: string;
  totalAmount: number;
  paymentsSummary: { name: string; total: number }[];
  employeesSummary: string[];
  servicesSummary: string[];
}

