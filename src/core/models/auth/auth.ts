export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token:     string
  storeName: string  // ← nuevo
  storeType: string  // ← nuevo
}