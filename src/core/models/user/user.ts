export interface UserModel {
  id:        number
  fullName:  string
  username:  string
  email:     string
  isActive:  boolean
  createdOn: string
  storeId:   number
  roleName?: string
}

export interface UserCreateModel {
  fullName: string
  username: string
  email:    string
  password: string
  storeId:  number
}

export interface ChangePasswordModel {
  currentPassword: string
  newPassword:     string
}

export interface ResetPasswordModel {
  newPassword: string
}