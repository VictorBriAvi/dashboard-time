import { NextResponse } from "next/server"
import { cookies }      from "next/headers"

export async function POST() {
  const cookieStore = await cookies()

  const expiredConfig = {           // ← declarado ANTES de usarlo
    httpOnly: true,
    sameSite: "lax" as const,
    secure:   true,
    path:     "/",
    expires:  new Date(0),
  }

  cookieStore.set("token",     "", expiredConfig)
  cookieStore.set("storeName", "", { ...expiredConfig, httpOnly: false })
  cookieStore.set("storeType", "", { ...expiredConfig, httpOnly: false })
  cookieStore.set("role",      "", { ...expiredConfig, httpOnly: false })  // ← nuevo

  return NextResponse.json({ success: true })
}