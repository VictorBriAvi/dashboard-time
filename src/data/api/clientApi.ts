import axios from "axios";
import { CreateClient } from "@/core/models/client/client";
import { ClientSearchDTO } from "@/core/models/client/ClientSearchDTO";
import { ClientDTO, EditClientDTO } from "../DTO/client/clientDTO";

export const clientApi = {
  search: async (query: string): Promise<ClientSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<ClientSearchDTO[]>(
      "/api/client/search",
      {
        params: { query },
      }
    );

    return response.data;
  },

  All: async (search: string): Promise<ClientDTO[]> => {
    const response = await axios.get<ClientDTO[]>(
      "/api/client",
      {
        params: { search },
      }
    );

    return response.data;
  },

  Create: async (payload: CreateClient) => {
    const { data } = await axios.post(
      "/api/client",
      payload
    );

    return data;
  },

  Update: async (payload: EditClientDTO) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/client/${id}`,
      body
    );

    return data;
  },

  Delete: async (id: number) => {
    await axios.delete(`/api/client/${id}`);
  },
};
