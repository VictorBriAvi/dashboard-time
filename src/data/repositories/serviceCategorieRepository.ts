import { serviceCategorieApi } from "@/data/api/servicesCategorieApi";
import { serviceCategorieMapper } from "@/core/mappers/serviceCategorie/serviceCategorieMapper";
import { CreateServiceCategorie, ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export const serviceCategorieRepository = {
  AllServiceCategorie: async (search: string) => {
    const raw = await serviceCategorieApi.All(search);
    return serviceCategorieMapper.All(raw);
  },
  createServiceCategorie: async (create: CreateServiceCategorie) => {
    return await serviceCategorieApi.Create(create);
  },
  updateServiceCategorie: async (update: ServiceCategorie) => {
    return await serviceCategorieApi.Update(update);
  },
  deleteServiceCategorie: async (id: number) => {
    return serviceCategorieApi.Delete(id);
  },
};
