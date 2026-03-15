"use client"

import { useState } from "react"
import { useAuthStore } from "@/shared/store/useAuthStore"
import { useUsersByStore } from "@/data/hooks/user/useUser"
import { useCreateUser, useDeleteUser, useResetPassword } from "@/data/hooks/user/useUserMutation"
import { UserModel } from "@/core/models/user/user"

export function useUsersPage() {
  const { storeId, role } = useAuthStore()
  const isSuperAdmin = role === "SuperAdmin"

  // ── Crear ──────────────────────────────────────────────────────────────
  const [fullName,  setFullName]  = useState("")
  const [username,  setUsername]  = useState("")
  const [email,     setEmail]     = useState("")
  const [password,  setPassword]  = useState("")

  // ── Reset password modal ───────────────────────────────────────────────
  const [resettingUser,  setResettingUser]  = useState<UserModel | null>(null)
  const [newPassword,    setNewPassword]    = useState("")

  // ── Query ──────────────────────────────────────────────────────────────
  const { data: users = [], isLoading, isError } = useUsersByStore(storeId)

  // ── Mutations ─────────────────────────────────────────────────────────
  const createUser  = useCreateUser()
  const deleteUser  = useDeleteUser()
  const resetPwd    = useResetPassword()

  // ── Crear ──────────────────────────────────────────────────────────────
  const addUser = () => {
    if (!fullName.trim() || !username.trim() || !email.trim() || !password.trim()) return

    createUser.mutate(
      { fullName, username, email, password, storeId },
      {
        onSuccess: () => {
          setFullName(""); setUsername(""); setEmail(""); setPassword("")
        },
      }
    )
  }

  // ── Reset password ─────────────────────────────────────────────────────
  const openResetModal = (user: UserModel) => {
    setResettingUser(user)
    setNewPassword("")
  }

  const confirmReset = () => {
    if (!resettingUser || !newPassword.trim()) return

    resetPwd.mutate(
      { id: resettingUser.id, payload: { newPassword } },
      { onSuccess: () => { setResettingUser(null); setNewPassword("") } }
    )
  }

  return {
    // auth
    isSuperAdmin,
    storeId,

    // crear
    fullName, setFullName,
    username, setUsername,
    email,    setEmail,
    password, setPassword,
    addUser,
    isCreating: createUser.isPending,

    // listar
    users, isLoading, isError,

    // eliminar
    deleteUser: (id: number) => deleteUser.mutate(id),
    isDeleting: deleteUser.isPending,

    // reset password
    resettingUser, setResettingUser,
    newPassword,   setNewPassword,
    openResetModal, confirmReset,
    isResetting: resetPwd.isPending,
  }
}