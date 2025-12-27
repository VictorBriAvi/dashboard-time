export interface SalePayment {
  paymentTypeId: number;
  paymentTypeName: string;
  amountPaid: number;
}

export interface SaleDetail {
  id: number;
  serviceTypeId: number;
  nameServiceTypeSale: string;
  employeeId: number;
  nameEmployeeSale: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  totalCalculated : number;
  isDeleted: boolean;
}

export interface SaleByDateRange {
  id: number;
  clientId: number;
  nameClient: string;
  totalAmount: number;
  dateSale: string;
  isDeleted: boolean;
  saleDetail: SaleDetail[];
  payments: SalePayment[];
}

