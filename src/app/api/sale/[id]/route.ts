import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

// 🔹 GET BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return handleApi(req, {
    method: "GET",
    path: `/sale/${id}`,
  });
}

// 🔹 UPDATE
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  return handleApi(req, {
    method: "PUT",
    path: `/sale/${id}`,
    body,
  });
}

// 🔹 DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return handleApi(req, {
    method: "DELETE",
    path: `/sale/${id}`,
  });
}