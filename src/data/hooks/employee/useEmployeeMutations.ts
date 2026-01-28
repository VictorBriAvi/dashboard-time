import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeRepository } from "@/data/repositories/employeeRepository";
import { Employee } from "@/core/models/employee/employee";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeRepository.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeRepository.updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeRepository.deteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};
