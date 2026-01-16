import {  serviceCategorieApi} from "@/data/api/servicesCategorieApi";
import { serviceCategorieMapper } from "@/core/mappers/serviceCategorie/serviceCategorie";

export const serviceCategorieRepository = {
  AllServiceCategorie: async (query: string) => {
    const raw = await serviceCategorieApi.All(query);
    return serviceCategorieMapper.All(raw);
   
  },
};
