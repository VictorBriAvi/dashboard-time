import { CreateExpenseCategorie, ExpenseCategorie} from "@/core/models/expenseCategorie/expenseCategorie";
import { axiosClient } from "@/lib/axiosClient";

export const expenseCategorieApi = {

  All: async (search: string): Promise<ExpenseCategorie[]> => {
    const response = await axiosClient.get<ExpenseCategorie[]>("/expenseType", { params: { search } } );
    return response.data;
  },
  Create: async (payload: CreateExpenseCategorie) => {
    const { data } = await axiosClient.post("/expenseType", payload);
    return data;
  },
  Update: async (payload: ExpenseCategorie) => {
    const { id, ...body } = payload;
    const { data } = await axiosClient.put(`/expenseType/${id}`, body);

    return data;
  },
  Delete: async (id: number) => {
    await axiosClient.delete(`/expenseType/${id}`);
  },
};
