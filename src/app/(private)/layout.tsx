import { cookies }       from "next/headers"
import { redirect }      from "next/navigation"
import Navbar            from "@/ui/Navbar"
import StoreProfileInitializer from "@/shared/components/StoreProfileInitializer"
import ClientProviders   from "@/shared/components/ClientProviders"

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
      <Navbar />
      <main className="pt-16">{children}</main>
    </ClientProviders>
  )
}