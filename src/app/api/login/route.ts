import { NextResponse } from "next/server"
import { cookies }      from "next/headers"
import { axiosClient }  from "@/lib/axiosClient"

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(Buffer.from(payload, "base64").toString())
  } catch { return null }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("→ Login body:", body)

    const response = await axiosClient.post("/auth/login", body)
    console.log("→ Backend response:", response.data)

    const { token, storeName, storeType } = response.data

    if (!token) {
      return NextResponse.json({ message: "Token no recibido" }, { status: 500 })
    }

    const decoded = decodeJwt(token)
    console.log("→ JWT decoded:", decoded)

    if (!decoded?.exp) {
      return NextResponse.json({ message: "Token inválido" }, { status: 500 })
    }

    const cookieStore  = await cookies()
    const cookieExpiry = new Date(decoded.exp * 1000)
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? "User"
    const storeId = Number(decoded.storeId ?? 0)

    // ✅ FIX: secure: true en producción (Vercel usa HTTPS)
    const baseConfig = {
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path:     "/",
      expires:  cookieExpiry,
    }

    cookieStore.set("token",     token,                     { ...baseConfig, httpOnly: true  })
    cookieStore.set("storeName", storeName ?? "Mi Negocio", { ...baseConfig, httpOnly: false })
    cookieStore.set("storeType", storeType ?? "business",   { ...baseConfig, httpOnly: false })
    cookieStore.set("role",      role,                      { ...baseConfig, httpOnly: false })
    cookieStore.set("storeId",   String(storeId),           { ...baseConfig, httpOnly: false })

    console.log("→ Cookies seteadas OK")

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("→ Login error:", error?.response?.status, error?.message)
    return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
  }
}