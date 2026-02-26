import { saleApi } from "@/data/api/saleApi";
import { saleOriginMapper } from "@/core/mappers/sales/SaleByDateMapper";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";
import { Sale } from "@/core/models/sales/Sale";


export const saleRepository = {
  getSalesByDateRange: async (fromDate: string, toDate: string) => {
    const raw = await saleApi.getByDateRange(fromDate, toDate);
    return saleOriginMapper.fromDto(raw);
  },

    createSale: async (draft: CreateSaleDraft) => {
    return await saleApi.create(draft);
  },
  getFilteredSales: async (filters: any): Promise<Sale[]> => {
    const raw = await saleApi.getFiltered(filters);
    return saleOriginMapper.fromDto(raw);
  },
};
