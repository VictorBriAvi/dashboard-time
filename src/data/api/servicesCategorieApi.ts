import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";
import { axiosClient } from "@/lib/axiosClient";

export const serviceCategorieApi = {
  All: async (query: string): Promise<ServiceCategorie[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<ServiceCategorie[]>("/serviceCategorie",
      {
        params: { query },
      }
    );

    return response.data;
  },
};
