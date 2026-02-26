import axios from "axios";
import {
  CreateServiceCategorie,
  ServiceCategorie,
} from "@/core/models/serviceCategorie/serviceCategorie";

export const serviceCategorieApi = {
  // 🔎 SEARCH
  search: async (query: string): Promise<ServiceCategorie[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<ServiceCategorie[]>(
      "/api/serviceCategorie/search",
      { params: { query } }
    );

    return response.data;
  },

  // 📄 GET ALL
  All: async (search: string): Promise<ServiceCategorie[]> => {
    const response = await axios.get<ServiceCategorie[]>(
      "/api/serviceCategorie",
      { params: { search } }
    );

    return response.data;
  },

  // ➕ CREATE
  Create: async (payload: CreateServiceCategorie) => {
    const { data } = await axios.post(
      "/api/serviceCategorie",
      payload
    );
    return data;
  },

  // ✏️ UPDATE
  Update: async (payload: ServiceCategorie) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/serviceCategorie/${id}`,
      body
    );

    return data;
  },

  // ❌ DELETE
  Delete: async (id: number) => {
    await axios.delete(`/api/serviceCategorie/${id}`);
  },
};