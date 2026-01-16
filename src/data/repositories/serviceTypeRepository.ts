import { serviceTypeApi } from "@/data/api/servicesTypeApi";
import { servicesTypeMapper } from "@/core/mappers/serviceType/servicesType";

export const serviceTypeRepository = {
  searchServiceType: async (query: string) => {
    const raw = await serviceTypeApi.search(query);
    return servicesTypeMapper.fromSearchpDto(raw);
   
  },
};
