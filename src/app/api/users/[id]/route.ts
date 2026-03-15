import { NextRequest } from "next/server"
import { handleApi } from "@/lib/serverApi"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return handleApi(req, { method: "DELETE", path: `/users/${id}` })
}