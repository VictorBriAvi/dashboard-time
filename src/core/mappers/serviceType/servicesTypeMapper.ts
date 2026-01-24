import { ServiceType } from "@/core/models/serviceType/ServiceType";
import { ServiceTypeDTO } from "@/data/DTO/serviceType/ServiceTypeDTO";
import { ServiceTypeSearchDTO } from "@/core/models/serviceType/ServiceTypeSearchDTO";
import { Option } from "@/ui/inputs/SearchSelect";

export const servicesTypeMapper = {
  fromSearchpDto(dtos: ServiceTypeSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      price: Number(c.price.replace(",", ".")),
    }));
  },
};

export const serviceTypeAllMapper = {
  All(dtos: ServiceTypeDTO[]): ServiceType[] {
    return dtos.map((dto) => ({
      id: dto.id,
      name: dto.name,
      price: dto.price,
      serviceCategorieName: dto.serviceCategorieName,
      serviceCategorieId: dto.serviceCategorieId,
    }));
  },
};
