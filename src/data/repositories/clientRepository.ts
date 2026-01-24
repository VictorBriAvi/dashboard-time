import { clientApi } from "@/data/api/clientApi";
import { clientMapper } from "@/core/mappers/client/client";

export const clientRepository = {
  searchClients: async (query: string) => {
    const raw = await clientApi.search(query);
    return clientMapper.fromSearchpDto(raw);
  },
};
