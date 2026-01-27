import { Expense, CreateExpense, EditExpense } from "@/core/models/expense/expense";
import { axiosClient } from "@/lib/axiosClient";
import { ExpenseDTO } from "../DTO/expense/expenseDTO";

export const expenseApi = {
    

All: async (
  search?: string,
  expenseTypeId?: number,
  fromDate?: string,
  toDate?: string
): Promise<ExpenseDTO[]> => {
  const { data } = await axiosClient.get<ExpenseDTO[]>("/Expense", {
    params: {
      search,
      expenseTypeId,
      fromDate,
      toDate,
    },
  });

  return data;
},



  Create: async (payload: CreateExpense) => {
    const {data} = await axiosClient.post("/Expense", payload);
    return data;
  },

  Update: async(payload: EditExpense) => {
    const {id, ...body} = payload;
    const { data } = await axiosClient.put(`/Expense/${id}`, body);

    return data;
  },

  Delete: async (id: number) => {
    await axiosClient.delete(`/Expense/${id}`);
  },
};
