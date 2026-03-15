import { NextRequest } from "next/server"
import { handleApi } from "@/lib/serverApi"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body   = await req.json()
  return handleApi(req, { method: "POST", path: `/users/${id}/reset-password`, body })
}