"use client"

import { useQuery } from "@tanstack/react-query"
import { userRepository } from "@/data/repositories/userRepository"
import { UserModel } from "@/core/models/user/user"

export function useUsersByStore(storeId: number) {
  return useQuery<UserModel[]>({
    queryKey: ["users", storeId],
    queryFn:  () => userRepository.getByStore(storeId),
    enabled:  !!storeId,
    staleTime: 1000 * 60 * 5,
  })
}