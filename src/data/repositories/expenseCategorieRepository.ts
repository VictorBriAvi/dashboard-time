import { expenseCategorieApi } from "@/data/api/expenseCategorieApi";
import { expenseCategorieMapper } from "@/core/mappers/expenseCategorie/expenseCategorieMapper";
import { CreateServiceCategorie, ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export const expenseCategorieRepository = {
  AllExpenseCategorie: async (search: string) => {
    const raw = await expenseCategorieApi.All(search);
    return expenseCategorieMapper.All(raw);
  },
  createExpenseCategorie: async (create: CreateServiceCategorie) => {
    return await expenseCategorieApi.Create(create);
  },
  updateExpenseCategorie: async (update: ServiceCategorie) => {
    return await expenseCategorieApi.Update(update);
  },
  deleteExpenseCategorie: async (id: number) => {
    return expenseCategorieApi.Delete(id);
  },
};
