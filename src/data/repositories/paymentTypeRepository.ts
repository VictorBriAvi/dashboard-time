import { paymentTypeApi } from "@/data/api/paymentTypeApi";
import { paymentTypeMapper } from "@/core/mappers/paymentType/paymentType";

export const paymentTypeRepository = {
  searchServiceType: async (query: string) => {
    const raw = await paymentTypeApi.search(query);
    return paymentTypeMapper.fromSearchpDto(raw);
   
  },
};
