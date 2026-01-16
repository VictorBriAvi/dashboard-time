import { axiosClient } from "@/lib/axiosClient";
import { SaleDTO } from "../DTO/Sale/SaleDTO";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export const saleApi = {
  getByDateRange: async (fromDate: string,toDate: string): Promise<SaleDTO[]> => {
    
    const response = await axiosClient.get<SaleDTO[]>("/sale/by-date-rangeComun",{ params: { fromDate, toDate } });

    return response.data;
  },
    create: async (payload: CreateSaleDraft) => {
    const { data } = await axiosClient.post("/sale", payload);
    return data;
  },
};
