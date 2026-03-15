"use client"

import { useState }                         from "react"
import { ReactNode }                         from "react"
import { QueryClient, QueryClientProvider }  from "@tanstack/react-query"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          retry:     1,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}