import { cookies }       from "next/headers"
import { redirect }      from "next/navigation"
import { Sidebar }       from "@/ui/Slidebar"
import StoreProfileInitializer from "@/shared/components/StoreProfileInitializer"
import ClientProviders   from "@/shared/components/ClientProviders"
import { SidebarAwareMain } from "@/shared/components/SidebarAwareMain"

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const token     = cookieStore.get("token")?.value
  const storeName = cookieStore.get("storeName")?.value ?? "Mi Negocio"
  const storeType = cookieStore.get("storeType")?.value ?? "business"
  const role      = cookieStore.get("role")?.value      ?? "User"
  const storeId   = Number(cookieStore.get("storeId")?.value ?? 0)

  if (!token) redirect("/login")

  return (
    <ClientProviders>
      <StoreProfileInitializer
        storeName={storeName}
        storeType={storeType}
        role={role}
        storeId={storeId}
      />

      {/* Sidebar fija — transiciona entre 210px y 56px */}
      <Sidebar />

      {/* Main — se desplaza en sync con el sidebar */}
      <SidebarAwareMain>
        {children}
      </SidebarAwareMain>
    </ClientProviders>
  )
}
