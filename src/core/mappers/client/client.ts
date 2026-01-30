import { ClientSearchDTO } from "@/core/models/client/ClientSearchDTO";
import { ClientDTO, EditClientDTO } from "@/data/DTO/client/clientDTO";
import { Client } from "@/core/models/client/client"
import type { Option } from "@/ui/inputs/SearchSelect";

export const clientMapper = { fromSearchpDto(dtos: ClientSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};

export const clientAllMapper = {
  All(dtos: ClientDTO[]): Client[] {
    return dtos.map((dto) => ({
      id: dto.id,
      name: dto.name,
      identityDocument: dto.identityDocument,
      email: dto.email,
      phone: dto.phone,
      dateBirth: dto.parsedDateOfBirth ?? null,
    }));
  },
};



export const ClientEditMapper = {
  toDto(client: Client): EditClientDTO {
    return {
      id: client.id,
      name: client.name,
      identityDocument: client.identityDocument ?? "",
      email: client.email ?? "",
      phone: client.phone ?? "",
      dateBirth: client.dateBirth ?? null,
    };
  },
};

