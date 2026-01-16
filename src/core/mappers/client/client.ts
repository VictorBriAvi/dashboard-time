import { ClientSearchDTO } from "@/core/models/client/ClientSearchDTO";
import type { Option } from "@/ui/inputs/SearchSelect";

export const clientMapper = { fromSearchpDto(dtos: ClientSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};
