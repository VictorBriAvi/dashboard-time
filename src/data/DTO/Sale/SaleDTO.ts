export interface SaleDetailDTO {
  id: number;
  serviceTypeId: number;
  nameServiceTypeSale: string;
  employeeId: number;
  nameEmployeeSale: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  totalCalculated: number;
  isDeleted: boolean;
}

export interface SalePaymentDTO {
  paymentTypeId: number;
  paymentTypeName: string;
  amountPaid: number;
}

export interface SaleDTO {
  id: number;
  clientId: number;
  nameClient: string;
  totalAmount: number;
  dateSale: string;
  isDeleted: boolean;
  saleDetail: SaleDetailDTO[];
  payments: SalePaymentDTO[];
}
