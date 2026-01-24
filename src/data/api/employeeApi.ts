import { EmployeeSearchDTO } from "@/core/models/employee/EmployeeSearchDTO";
import { axiosClient } from "@/lib/axiosClient";

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
};
