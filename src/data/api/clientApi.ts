import { Client, CreateClient } from "@/core/models/client/client";
import { ClientSearchDTO } from "@/core/models/client/ClientSearchDTO";
import { axiosClient } from "@/lib/axiosClient";
import { ClientDTO, EditClientDTO } from "../DTO/client/clientDTO";

export const clientApi = {
  search: async (query: string): Promise<ClientSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<ClientSearchDTO[]>(
      "/client/search",
      {
        params: { query },
      },
    );

    return response.data;
  },
  All: async (search: string): Promise<ClientDTO[]> => {
    const response = await axiosClient.get<ClientDTO[]>(
      "/client",
      { params: { search } }
    );
    return response.data;
  },
  Create: async (payload: CreateClient) => {
    const { data } = await axiosClient.post("/client", payload);
    return data;
  },
  Update: async (payload: EditClientDTO) => {
    const { id, ...body } = payload;
    const { data } = await axiosClient.put(`/client/${id}`, body);
    return data;
  },
  Delete: async (id: number) => {
    await axiosClient.delete(`/client/${id}`);
  },
};
