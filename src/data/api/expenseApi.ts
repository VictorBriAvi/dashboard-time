import axios from "axios";
import { CreateExpense, EditExpense } from "@/core/models/expense/expense";
import { ExpenseDTO } from "../DTO/expense/expenseDTO";

export const expenseApi = {

  // 🔹 SEARCH
  search: async (query: string): Promise<ExpenseDTO[]> => {
    if (!query || query.length < 1) return [];

    const { data } = await axios.get<ExpenseDTO[]>(
      "/api/expense/search",
      { params: { query } }
    );

    return data;
  },

  // 🔹 ALL (con filtros)
  All: async (
    search?: string,
    expenseTypeId?: number,
    paymentTypeId?: number,
    fromDate?: string,
    toDate?: string
  ): Promise<ExpenseDTO[]> => {

    const { data } = await axios.get<ExpenseDTO[]>(
      "/api/expense",
      {
        params: {
          search,
          expenseTypeId,
          paymentTypeId,
          fromDate,
          toDate,
        },
      }
    );

    return data;
  },

  // 🔹 CREATE
  Create: async (payload: CreateExpense) => {
    const { data } = await axios.post(
      "/api/expense",
      payload
    );
    return data;
  },

  // 🔹 UPDATE
  Update: async (payload: EditExpense) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/expense/${id}`,
      body
    );

    return data;
  },

  // 🔹 DELETE
  Delete: async (id: number) => {
    await axios.delete(`/api/expense/${id}`);
  },
};