export interface PaymentType {
  id: number;
  name: string;
  applyDiscount: boolean;
  discountPercent: number;
  applySurcharge: boolean;
  surchargePercent: number;
}

export interface CreatePaymentType {
  name: string;
  applyDiscount: boolean;
  discountPercent: number;
  applySurcharge: boolean;
  surchargePercent: number;
}

// Extiende Option para transportar los datos de recargo/descuento
// en los selectores async sin hacer llamadas extra al servidor
export interface PaymentTypeOption {
  value: number;
  label: string;
  applyDiscount: boolean;
  discountPercent: number;
  applySurcharge: boolean;
  surchargePercent: number;
}




