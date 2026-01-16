import { PaymentType } from "@/core/models/paymentType/PaymentTypeDTO";
import type { Option } from "@/ui/inputs/SearchSelect";

export const paymentTypeMapper = { fromSearchpDto(dtos: PaymentType[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};
