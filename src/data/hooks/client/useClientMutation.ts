import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRepository } from "@/data/repositories/clientRepository";
import { Client } from "@/core/models/client/client";

export const useCreateClient = () => {

    const queryClient = useQueryClient();
    
    return useMutation({ mutationFn: clientRepository.createClient, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["client"] });}});
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientRepository.updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientRepository.deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
  });
};
