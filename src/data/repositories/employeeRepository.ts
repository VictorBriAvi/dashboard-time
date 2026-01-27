import { employeeApi } from "@/data/api/employeeApi";
import { employeeAllMapper, employeeEditMapper, employeeMapper } from "@/core/mappers/employee/employee";
import { CreateEmployee, EditEmployee, Employee } from "@/core/models/employee/employee";

export const employeeRepository = {
  searchEmployees: async (query: string) => {
    const raw = await employeeApi.search(query);
    return employeeMapper.fromSearchpDto(raw);
  },
  AllEmployee: async (search: string) => {
    const raw = await employeeApi.All(search);
    return employeeAllMapper.All(raw);
  },
  createEmployee: async (create: CreateEmployee) => {
    return await employeeApi.Create(create);
  },
  updateEmployee: async (employee: Employee) => {
    const dto = employeeEditMapper.toDto(employee);
    console.log(dto)
    return employeeApi.Update(dto);
  },
  deteEmployee: async (id: number) => {
    return employeeApi.Delete(id);
  },
};
