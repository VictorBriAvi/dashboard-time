
import { CreatePaymentType, PaymentType } from "@/core/models/paymentType/PaymentType";
import { axiosClient } from "@/lib/axiosClient";

export const paymentTypeApi = {
  search: async (query: string): Promise<PaymentType[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<PaymentType[]>("/paymenttype",
      {
        params: { query },
      }
    );

    return response.data;
  },
    All: async (search: string): Promise<PaymentType[]> => {
      const response = await axiosClient.get<PaymentType[]>("/paymenttype", { params: { search } } );
      return response.data;
    },
    Create: async (payload: CreatePaymentType) => {
      const { data } = await axiosClient.post("/paymenttype", payload);
      return data;
    },
    Update: async (payload: PaymentType) => {
      const { id, ...body } = payload;
      const { data } = await axiosClient.put(`/paymenttype/${id}`, body);
  
      return data;
    },
    Delete: async (id: number) => {
      await axiosClient.delete(`/paymenttype/${id}`);
    },
};
