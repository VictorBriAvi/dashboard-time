// core/models/SaleByDateRangeModel.ts
export interface SaleDetail {
  id: number;
  serviceTypeId: number;
  nameServiceTypeSale: string;
  employeeId: number;
  nameEmployeeSale: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  totalCalculated: number;
}

export interface SalePayment {
  paymentTypeName: string;
  amountPaid: number;
}

export interface Sale {
  id: number;
  clientId: number;
  nameClient: string;
  totalAmount: number;
  dateSale: string;
  isDeleted: boolean;
  saleDetail: SaleDetail[];
  payments: SalePayment[];
}

