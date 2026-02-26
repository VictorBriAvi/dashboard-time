import axios from "axios";
import {
  CreateServiceType,
  EditServiceType,
} from "@/core/models/serviceType/ServiceType";
import { ServiceTypeSearchDTO } from "@/core/models/serviceType/ServiceTypeSearchDTO";
import { ServiceTypeDTO } from "../DTO/serviceType/ServiceTypeDTO";

export const serviceTypeApi = {
  // 🔎 SEARCH
  search: async (query: string): Promise<ServiceTypeSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<ServiceTypeSearchDTO[]>(
      "/api/serviceType/search",
      { params: { query } }
    );

    return response.data;
  },

  // 📄 GET ALL
  All: async (
    search?: string,
    serviceCategorieId?: number
  ): Promise<ServiceTypeDTO[]> => {
    const response = await axios.get<ServiceTypeDTO[]>(
      "/api/serviceType",
      {
        params: { search, serviceCategorieId },
      }
    );

    return response.data;
  },

  // ➕ CREATE
  Create: async (payload: CreateServiceType) => {
    const { data } = await axios.post(
      "/api/serviceType",
      payload
    );
    return data;
  },

  // ✏️ UPDATE
  Update: async (payload: EditServiceType) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/serviceType/${id}`,
      body
    );

    return data;
  },

  // ❌ DELETE
  Delete: async (id: number) => {
    await axios.delete(`/api/serviceType/${id}`);
  },
};