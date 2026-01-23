export interface ServiceOption {
  value: number;
  label: string;
  name: string;
  price: number; 
}

export interface SaleDetailUI {
  serviceTypeId: number;
  serviceName: string;
  employeeId: number;
  employeeName: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
}
