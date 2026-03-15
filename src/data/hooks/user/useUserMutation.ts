"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userRepository } from "@/data/repositories/userRepository"
import { UserCreateModel, ChangePasswordModel, ResetPasswordModel } from "@/core/models/user/user"

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: UserCreateModel) => userRepository.create(payload),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ["users"] }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => userRepository.delete(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: ["users"] }),
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ResetPasswordModel }) =>
      userRepository.resetPassword(id, payload),
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordModel) => userRepository.changePassword(payload),
  })
}