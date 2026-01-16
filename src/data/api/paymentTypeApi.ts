import { PaymentType } from "@/core/models/paymentType/PaymentTypeDTO";
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
};
