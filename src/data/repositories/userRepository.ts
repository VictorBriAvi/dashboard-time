import { userApi } from "@/data/api/userApi"
import { UserCreateModel, ChangePasswordModel, ResetPasswordModel } from "@/core/models/user/user"

export const userRepository = {
  getByStore:     (storeId: number)                              => userApi.getByStore(storeId),
  create:         (payload: UserCreateModel)                     => userApi.create(payload),
  delete:         (id: number)                                   => userApi.delete(id),
  resetPassword:  (id: number, payload: ResetPasswordModel)      => userApi.resetPassword(id, payload),
  changePassword: (payload: ChangePasswordModel)                 => userApi.changePassword(payload),
}