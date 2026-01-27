import { CreateEmployee, EditEmployee, Employee } from "@/core/models/employee/employee";
import { EmployeeSearchDTO } from "@/core/models/employee/EmployeeSearchDTO";
import { axiosClient } from "@/lib/axiosClient";
import { EditEmployeeDTO } from "../DTO/employee/employeeDTO";

export const employeeApi = {
  search: async (query: string): Promise<EmployeeSearchDTO[]> => {
    if (!query || query.length < 1) return [];

    const response = await axiosClient.get<EmployeeSearchDTO[]>("/employee/search",
      {
        params: { query },
      }
    );

    return response.data;
  },
      All: async (search: string): Promise<Employee[]> => {
      const response = await axiosClient.get<Employee[]>("/employee", { params: { search } } );
      return response.data;
    },
    Create: async (payload: CreateEmployee) => {
      const { data } = await axiosClient.post("/employee", payload);
      return data;
    },
    Update: async (payload: EditEmployeeDTO) => {
      const { id, ...body } = payload;
      const { data } = await axiosClient.put(
        `/employee/${id}`,
        body
      );

      return data;
    },
    Delete: async (id: number) => {
      await axiosClient.delete(`/employee/${id}`);
    },
};


