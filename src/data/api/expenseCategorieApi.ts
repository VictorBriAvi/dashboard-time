import axios from "axios";
import {
  CreateExpenseCategorie,
  ExpenseCategorie,
} from "@/core/models/expenseCategorie/expenseCategorie";

export const expenseCategorieApi = {

  // 🔹 ALL
  All: async (search: string): Promise<ExpenseCategorie[]> => {
    const response = await axios.get<ExpenseCategorie[]>(
      "/api/expenseCategorie",
      { params: { search } }
    );

    return response.data;
  },

  // 🔹 CREATE
  Create: async (payload: CreateExpenseCategorie) => {
    const { data } = await axios.post(
      "/api/expenseCategorie",
      payload
    );

    return data;
  },

  // 🔹 UPDATE
  Update: async (payload: ExpenseCategorie) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/expenseCategorie/${id}`,
      body
    );

    return data;
  },

  // 🔹 DELETE
  Delete: async (id: number) => {
    await axios.delete(`/api/expenseCategorie/${id}`);
  },
};