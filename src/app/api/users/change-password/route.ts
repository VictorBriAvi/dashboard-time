import { NextRequest } from "next/server"
import { handleApi } from "@/lib/serverApi"

export async function POST(req: NextRequest) {
  const body = await req.json()
  return handleApi(req, { method: "POST", path: "/users/change-password", body })
}