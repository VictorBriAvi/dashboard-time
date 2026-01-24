import { CreateServiceType, EditServiceType, ServiceType } from "@/core/models/serviceType/ServiceType";
import { ServiceTypeSearchDTO } from "@/core/models/serviceType/ServiceTypeSearchDTO";
import { axiosClient } from "@/lib/axiosClient";
import { ServiceTypeDTO } from "../DTO/serviceType/ServiceTypeDTO";

export const serviceTypeApi = {
  search: async (query: string): Promise<ServiceTypeSearchDTO[]> => {
    if (!query || query.length < 1) return [];

  const response = await axiosClient.get<ServiceTypeSearchDTO[]>("/serviceType/search",{params: { query },},);
  return response.data;
  },

  All: async (search?: string, serviceCategorieId?: number): Promise<ServiceTypeDTO[]> => {
    const response = await axiosClient.get<ServiceTypeDTO[]>("/serviceType", {params: {search,serviceCategorieId},});
    return response.data;
  },

  Create: async (payload: CreateServiceType) => {
    const {data} = await axiosClient.post("/serviceType", payload);
    return data;
  },

  Update: async(payload: EditServiceType) => {
    const {id, ...body} = payload;
    const { data } = await axiosClient.put(`/serviceType/${id}`, body);

    return data;
  },

  Delete: async (id: number) => {
    await axiosClient.delete(`/serviceType/${id}`);
  },
};
