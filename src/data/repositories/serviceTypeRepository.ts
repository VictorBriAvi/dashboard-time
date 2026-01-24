import { serviceTypeApi } from "@/data/api/servicesTypeApi";
import { servicesTypeMapper, serviceTypeAllMapper} from "@/core/mappers/serviceType/servicesTypeMapper";
import { CreateServiceType, EditServiceType, ServiceType } from "@/core/models/serviceType/ServiceType";

export const serviceTypeRepository = {
  searchServiceType: async (query: string) => {
    const raw = await serviceTypeApi.search(query);
    return servicesTypeMapper.fromSearchpDto(raw);
  },
  AllServiceType: async (search?: string, serviceCategorieId?: number) => {
    const raw = await serviceTypeApi.All(search, serviceCategorieId);
    return serviceTypeAllMapper.All(raw);
  },
  createServiceType: async (create: CreateServiceType) => {
    return await serviceTypeApi.Create(create);
  },
  updateServiceType: async (update: EditServiceType) => {
    return await serviceTypeApi.Update(update);
  },
  deleteServiceType: async (id: number) => {
    return serviceTypeApi.Delete(id);
  },
};
