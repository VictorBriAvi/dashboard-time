import axios from "axios";
import { CreatePaymentType, PaymentType } from "@/core/models/paymentType/PaymentType";

export const paymentTypeApi = {
  // 🔎 SEARCH
  search: async (query: string): Promise<PaymentType[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<PaymentType[]>(
      "/api/paymentType/search",
      { params: { query } }
    );

    return response.data;
  },

  // 📄 GET ALL
  All: async (search: string): Promise<PaymentType[]> => {
    const response = await axios.get<PaymentType[]>(
      "/api/paymentType",
      { params: { search } }
    );

    return response.data;
  },

  // ➕ CREATE
  Create: async (payload: CreatePaymentType) => {
    const { data } = await axios.post(
      "/api/paymentType",
      payload
    );
    return data;
  },

  // ✏️ UPDATE
  Update: async (payload: PaymentType) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/paymentType/${id}`,
      body
    );

    return data;
  },

  // ❌ DELETE
  Delete: async (id: number) => {
    await axios.delete(`/api/paymentType/${id}`);
  },
};