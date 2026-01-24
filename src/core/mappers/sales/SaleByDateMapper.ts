import type { SaleDTO } from "@/data/DTO/Sale/SaleDTO";
import type {SaleByDateRange,SaleDetail,SalePayment} from "@/core/models/reports/SaleByDateRangeModel";
import { Sale } from "@/core/models/sales/Sale";


export const saleMapper = {
  fromDto(dtos: SaleDTO[]): SaleByDateRange[] {

    return dtos.map((dto) => ({
      id: dto.id,
      clientId: dto.clientId,
      nameClient: dto.nameClient,
      totalAmount: dto.totalAmount,
      dateSale: dto.dateSale,
      isDeleted: dto.isDeleted,

      saleDetail: dto.saleDetail.map<SaleDetail>((d) => ({
        id: d.id,
        serviceTypeId: d.serviceTypeId,
        nameServiceTypeSale: d.nameServiceTypeSale,
        employeeId: d.employeeId,
        nameEmployeeSale: d.nameEmployeeSale,
        unitPrice: d.unitPrice,
        discountPercent: d.discountPercent,
        additionalCharge: d.additionalCharge,
        totalCalculated: d.totalCalculated,
        isDeleted: d.isDeleted,
      })),

      payments: dto.payments.map<SalePayment>((p) => ({
        paymentTypeId: p.paymentTypeId,
        paymentTypeName: p.paymentTypeName,
        amountPaid: p.amountPaid,
      })),
    }));
  },
};


export const saleOriginMapper = { fromDto(dtos: SaleDTO[]): Sale[] {
  
  return dtos.map((dto) => ({
      id: dto.id,
      clientId: dto.clientId,
      nameClient: dto.nameClient,
      totalAmount: dto.totalAmount,
      dateSale: dto.dateSale,
      isDeleted: dto.isDeleted,

      saleDetail: dto.saleDetail.map<SaleDetail>((d) => ({
        id: d.id,
        serviceTypeId: d.serviceTypeId,
        nameServiceTypeSale: d.nameServiceTypeSale,
        employeeId: d.employeeId,
        nameEmployeeSale: d.nameEmployeeSale,
        unitPrice: d.unitPrice,
        discountPercent: d.discountPercent,
        additionalCharge: d.additionalCharge,
        totalCalculated: d.totalCalculated,
        isDeleted: d.isDeleted,
      })),

      payments: dto.payments.map<SalePayment>((p) => ({
        paymentTypeId: p.paymentTypeId,
        paymentTypeName: p.paymentTypeName,
        amountPaid: p.amountPaid,
      })),
    }));
  },
};
