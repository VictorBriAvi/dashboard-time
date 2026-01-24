
import { PaymentType } from "@/core/models/paymentType/PaymentType";
import type { PaymentTypeDTO } from "@/data/DTO/paymentType/paymentTypeDTO";
import type { Option } from "@/ui/inputs/SearchSelect";

export const paymentTypeMapper = { fromSearchpDto(dtos: PaymentType[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};

export const paymentTypeAllMapper = {
  All(dtos: PaymentTypeDTO[]): PaymentType[] {
    return dtos.map((dto) => ({ id: dto.id, name: dto.name }));
  },
};
