"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateServiceType,
  EditServiceType,
} from "@/core/models/serviceType/ServiceType";
import { serviceTypeRepository } from "@/data/repositories/serviceTypeRepository";

const QUERY_KEY = ["service-types"];

export const useCreateServiceType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateServiceType) =>
      serviceTypeRepository.createServiceType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useUpdateServiceType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditServiceType) =>
      serviceTypeRepository.updateServiceType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useDeleteServiceType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      serviceTypeRepository.deleteServiceType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
