"use client"
import { useEffect } from "react"
import { useAuthStore, AuthState } from "@/shared/store/useAuthStore"  // ← agregar useAuthStore

interface Props {
  storeName: string
  storeType: string
  role:      string
  storeId:   number
}

export default function StoreProfileInitializer({ storeName, storeType, role, storeId }: Props) {
  const setStoreProfile = useAuthStore((s: AuthState) => s.setStoreProfile)

  useEffect(() => {
    setStoreProfile(storeName, storeType, role, storeId)
  }, [storeName, storeType, role, storeId, setStoreProfile])

  return null
}