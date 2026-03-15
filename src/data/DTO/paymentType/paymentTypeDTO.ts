export interface PaymentTypeDTO {
  id: number;
  name: string;
  applyDiscount: boolean;
  discountPercent: number;
  applySurcharge: boolean;
  surchargePercent: number;
}