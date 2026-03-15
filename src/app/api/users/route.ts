import { NextRequest } from "next/server"
import { handleApi } from "@/lib/serverApi"

export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get("storeId") ?? ""
  return handleApi(req, { method: "GET", path: `/users/store/${storeId}` })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return handleApi(req, { method: "POST", path: "/users", body })
}