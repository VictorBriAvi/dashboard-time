import { saleApi } from "@/data/api/saleApi";
import { saleOriginMapper } from "@/core/mappers/sales/SaleByDateMapper";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";
import { Sale } from "@/core/models/sales/Sale";

export const saleRepository = {
  getSalesByDateRange: async (fromDate: string, toDate: string) => {
    const raw = await saleApi.getByDateRange(fromDate, toDate);
    return saleOriginMapper.fromDto(raw);
  },

  getFilteredSales: async (filters: any): Promise<Sale[]> => {
    const raw = await saleApi.getFiltered(filters);
    return saleOriginMapper.fromDto(raw);
  },

  getSaleById: async (id: number): Promise<Sale> => {
    const raw = await saleApi.getById(id);
    return saleOriginMapper.fromDto([raw])[0];
  },
  createSale: async (draft: CreateSaleDraft) => {
    return await saleApi.create(draft);
  },
  updateSale: async (id: number, payload: CreateSaleDraft) => {
    return await saleApi.update(id, payload);
  },

  deleteSale: async (id: number) => {
    return await saleApi.delete(id);
  },
};
