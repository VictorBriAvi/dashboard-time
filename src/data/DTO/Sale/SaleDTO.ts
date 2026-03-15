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
    appDiscountPercent: number;   // ✅ % que cobra la app
  appDiscountAmount: number;    // ✅ monto que cobra la app
  netAmountReceived: number;  
}

export interface SaleDTO {
  id: number;
  clientId: number;
  nameClient: string;
    baseAmount: number;           // ✅ servicios sin recargo
  surchargePercent: number;     // ✅ recargo aplicado
  surchargeAmount: number;      // ✅ monto del recargo
  totalAmount: number;
  dateSale: string;
  isDeleted: boolean;
  saleDetail: SaleDetailDTO[];
  payments: SalePaymentDTO[];
}
