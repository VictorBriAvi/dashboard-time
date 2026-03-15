import { create, StateCreator } from "zustand"
import { VOCABULARY, DEFAULT_VOCAB, VocabMap } from "@/config/vocabulary"

export interface AuthState {
  storeName: string
  storeType: string
  storeId:   number
  role:      string
  vocab:     VocabMap
  setStoreProfile: (storeName: string, storeType: string, role: string, storeId: number) => void
  clear:           () => void
}

const storeCreator: StateCreator<AuthState> = (set) => ({
  storeName: "",
  storeType: "business",
  storeId:   0,
  role:      "User",
  vocab:     DEFAULT_VOCAB,

  setStoreProfile: (storeName, storeType, role, storeId) =>
    set({ storeName, storeType, role, storeId, vocab: VOCABULARY[storeType] ?? DEFAULT_VOCAB }),

  clear: () =>
    set({ storeName: "", storeType: "business", storeId: 0, role: "User", vocab: DEFAULT_VOCAB }),
})

export const useAuthStore = create<AuthState>(storeCreator)  // ← esto faltaba