import { ClientSearchDTO } from "@/core/models/client/ClientSearchDTO";
import { axiosClient } from "@/lib/axiosClient";

export const clientApi = {
  search: async (query: string): Promise<ClientSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<ClientSearchDTO[]>("/client/search",
      {
        params: { query },
      }
    );

    return response.data;
  },
};
