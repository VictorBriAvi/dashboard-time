import type { ServiceCategorieDTO } from "@/data/DTO/serviceCategorie/serviceCategorieDTO";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export const serviceCategorieMapper = {
  All(dtos: ServiceCategorieDTO[]): ServiceCategorie[] {
    return dtos.map((dto) => ({ id: dto.id, name: dto.name }));
  },
};
