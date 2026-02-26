import axios from "axios";
import { CreateEmployee, Employee } from "@/core/models/employee/employee";
import { EmployeeSearchDTO } from "@/core/models/employee/EmployeeSearchDTO";
import { EditEmployeeDTO } from "../DTO/employee/employeeDTO";

export const employeeApi = {
  search: async (query: string): Promise<EmployeeSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axios.get<EmployeeSearchDTO[]>(
      "/api/employee/search",
      { params: { query } }
    );

    return response.data;
  },

  All: async (search: string): Promise<Employee[]> => {
    const response = await axios.get<Employee[]>(
      "/api/employee",
      { params: { search } }
    );

    return response.data;
  },

  Create: async (payload: CreateEmployee) => {
    const { data } = await axios.post(
      "/api/employee",
      payload
    );
    return data;
  },

  Update: async (payload: EditEmployeeDTO) => {
    const { id, ...body } = payload;

    const { data } = await axios.put(
      `/api/employee/${id}`,
      body
    );

    return data;
  },

  Delete: async (id: number) => {
    await axios.delete(`/api/employee/${id}`);
  },
};