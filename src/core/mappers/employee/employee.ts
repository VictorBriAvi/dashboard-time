import { EditEmployee, Employee } from "@/core/models/employee/employee";
import { EmployeeSearchDTO } from "@/core/models/employee/EmployeeSearchDTO";
import { EditEmployeeDTO, EmployeeDTO } from "@/data/DTO/employee/employeeDTO";
import type { Option } from "@/ui/inputs/SearchSelect";

export const employeeMapper = { fromSearchpDto(dtos: EmployeeSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};

export const employeeAllMapper = {
  All(dtos: EmployeeDTO[]): Employee[] {
    return dtos.map((dto) => ({
      id: dto.id,
      name: dto.name,
      identityDocument: dto.identityDocument,
      paymentPercentage: dto.paymentPercentage,
      employeeDateBirth: dto.employeeDateBirth,
      dateBirth: dto.dateBirth,
    }));
  },
};

export const employeeEditMapper = {
  toDto(employee: Employee): EditEmployeeDTO {
    const [day, month, year] = employee.employeeDateBirth.split("-");

    return {
      id: employee.id,
      name: employee.name,
      identityDocument: employee.identityDocument,
      paymentPercentage: employee.paymentPercentage,
      dateBirth: `${year}-${month}-${day}`, // ✅ ISO válido
    };
  },
};