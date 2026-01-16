export interface CreateSaleDetailDraft {
  serviceTypeId: number;
  employeeId: number;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
}

export interface CreateSalePaymentDraft {
  paymentTypeId: number;
  amountPaid: number;
}

export interface CreateSaleDraft {
  clientId: number;
  saleDetails: CreateSaleDetailDraft[];
  payments: CreateSalePaymentDraft[];
}
