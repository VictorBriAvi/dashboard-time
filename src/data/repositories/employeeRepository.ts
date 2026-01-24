import { employeeApi } from "@/data/api/employeeApi";
import { employeeMapper } from "@/core/mappers/employee/employee";

export const employeeRepository = {
  searchEmployees: async (query: string) => {
    const raw = await employeeApi.search(query);
    return employeeMapper.fromSearchpDto(raw);
  },
};
