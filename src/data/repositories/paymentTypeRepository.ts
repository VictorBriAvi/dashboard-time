import { paymentTypeApi } from "@/data/api/paymentTypeApi";
import { paymentTypeMapper, paymentTypeAllMapper } from "@/core/mappers/paymentType/paymentType";
import { CreatePaymentType, PaymentType } from "@/core/models/paymentType/PaymentType";


export const paymentTypeRepository = {
  searchServiceType: async (query: string) => {
    const raw = await paymentTypeApi.search(query);
    return paymentTypeMapper.fromSearchpDto(raw);
   
  },
    AllPaymentType: async (search: string) => {
      const raw = await paymentTypeApi.All(search);
      return paymentTypeAllMapper.All(raw);
    },
    createPaymentType: async (create: CreatePaymentType) => {
      return await paymentTypeApi.Create(create);
    },
    updatePaymentType: async (update: PaymentType) => {
      return await paymentTypeApi.Update(update);
    },
    deletePaymentType: async (id: number) => {
      return paymentTypeApi.Delete(id);
    },
};
