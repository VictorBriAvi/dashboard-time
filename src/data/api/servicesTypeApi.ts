import { ServiceTypeSearchDTO } from "@/core/models/serviceType/ServiceTypeSearchDTO";
import { axiosClient } from "@/lib/axiosClient";

export const serviceTypeApi = {
  search: async (query: string): Promise<ServiceTypeSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<ServiceTypeSearchDTO[]>("/serviceType/search",
      {
        params: { query },
      }
    );

    return response.data;
  },
};
