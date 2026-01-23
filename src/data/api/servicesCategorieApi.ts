import {CreateServiceCategorie,ServiceCategorie} from "@/core/models/serviceCategorie/serviceCategorie";
import { axiosClient } from "@/lib/axiosClient";

export const serviceCategorieApi = {

  All: async (search: string): Promise<ServiceCategorie[]> => {
    const response = await axiosClient.get<ServiceCategorie[]>( "/serviceCategorie", { params: { search } } );
    return response.data;
  },
  Create: async (payload: CreateServiceCategorie) => {
    const { data } = await axiosClient.post("/serviceCategorie", payload);
    return data;
  },
  Update: async (payload: ServiceCategorie) => {
    const { id, ...body } = payload;
    const { data } = await axiosClient.put(`/serviceCategorie/${id}`, body);

    return data;
  },
  Delete: async (id: number) => {
    await axiosClient.delete(`/serviceCategorie/${id}`);
  },
};
