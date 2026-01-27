import { expenseApi } from "@/data/api/expenseApi";
import { expenseAllMapper } from "@/core/mappers/expenses/expenseMapper";
import { CreateExpense, EditExpense } from "@/core/models/expense/expense";

export const expenseRepository = {
All: async (
  search?: string,
  expenseTypeId?: number,
  fromDate?: string,
  toDate?: string
) => {
  const raw = await expenseApi.All(
    search,
    expenseTypeId,
    fromDate,
    toDate
  );

  return expenseAllMapper.All(raw);
},



  createExpense: async (create: CreateExpense) => {
    return await expenseApi.Create(create);
  },
  updateExpense: async (update: EditExpense) => {
    return await expenseApi.Update(update);
  },
  deleteExpense: async (id: number) => {
    return expenseApi.Delete(id);
  },
};
