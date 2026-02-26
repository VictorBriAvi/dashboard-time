import axios from "axios";
import { SaleDTO } from "../DTO/Sale/SaleDTO";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";

export const saleApi = {
  // 🔎 SEARCH
  search: async (query: string): Promise<SaleDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<SaleDTO[]>(
      "/api/sale/search",
      { params: { query } }
    );

    return response.data;
  },

  getFiltered: async (filters: any): Promise<SaleDTO[]> => {
    const response = await axios.get<SaleDTO[]>(
      "/api/sale/filtered",
      { params: filters }
    );

    return response.data;
  },

  // 📅 GET BY DATE RANGE
  getByDateRange: async (
    fromDate: string,
    toDate: string
  ): Promise<SaleDTO[]> => {
    const response = await axios.get<SaleDTO[]>(
      "/api/sale/by-date-rangeComun",
      { params: { fromDate, toDate } }
    );

    return response.data;
  },

  // 📄 GET ALL
  All: async (search: string): Promise<SaleDTO[]> => {
    const response = await axios.get<SaleDTO[]>(
      "/api/sale",
      { params: { search } }
    );

    return response.data;
  },

  // ➕ CREATE
  create: async (payload: CreateSaleDraft) => {
    const { data } = await axios.post(
      "/api/sale",
      payload
    );
    return data;
  },

  // ✏️ UPDATE
  update: async (id: number, body: any) => {
    const { data } = await axios.put(
      `/api/sale/${id}`,
      body
    );

    return data;
  },

  // ❌ DELETE
  delete: async (id: number) => {
    await axios.delete(`/api/sale/${id}`);
  },
};