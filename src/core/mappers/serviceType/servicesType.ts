import { ServiceTypeSearchDTO } from "@/core/models/serviceType/ServiceTypeSearchDTO";
import { Option } from "@/ui/inputs/SearchSelect";


export const servicesTypeMapper = { fromSearchpDto(dtos: ServiceTypeSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      price: c.price
    }));
  },
};
