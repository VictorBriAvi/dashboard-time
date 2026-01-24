import { EmployeeSearchDTO } from "@/core/models/employee/EmployeeSearchDTO";
import type { Option } from "@/ui/inputs/SearchSelect";

export const employeeMapper = { fromSearchpDto(dtos: EmployeeSearchDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.name,
      name: c.name
    }));
  },
};
