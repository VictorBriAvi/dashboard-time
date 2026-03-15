import axios from "axios"
import { UserCreateModel, ChangePasswordModel, ResetPasswordModel } from "@/core/models/user/user"

export const userApi = {
  getByStore: async (storeId: number) => {
    const { data } = await axios.get(`/api/users?storeId=${storeId}`)
    return data
  },

  create: async (payload: UserCreateModel) => {
    const { data } = await axios.post("/api/users", payload)
    return data
  },

  delete: async (id: number) => {
    await axios.delete(`/api/users/${id}`)
  },

  resetPassword: async (id: number, payload: ResetPasswordModel) => {
    await axios.post(`/api/users/${id}/reset-password`, payload)
  },

  changePassword: async (payload: ChangePasswordModel) => {
    await axios.post("/api/users/change-password", payload)
  },
}