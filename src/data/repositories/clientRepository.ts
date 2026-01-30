import { clientApi } from "@/data/api/clientApi";
import { clientAllMapper, ClientEditMapper, clientMapper } from "@/core/mappers/client/client";
import { Client, CreateClient } from "@/core/models/client/client";

export const clientRepository = {
  searchClients: async (query: string) => {
    const raw = await clientApi.search(query);
    return clientMapper.fromSearchpDto(raw);
  },
  AllClient: async (search: string) => {
    const raw = await clientApi.All(search);
    return clientAllMapper.All(raw);
  },
  createClient: async (create: CreateClient) => {
    return await clientApi.Create(create);
  },
  updateClient: async (employee: Client) => {
    const dto = ClientEditMapper.toDto(employee);
    return clientApi.Update(dto);
  },
  deleteClient: async (id: number) => {
    return clientApi.Delete(id);
  },
};
