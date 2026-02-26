import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

// 🔹 GET ALL
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") ?? "";

  return handleApi(req, {
    method: "GET",
    path: "/serviceCategorie",
    params: { search },
  });
}

// 🔹 CREATE
export async function POST(req: NextRequest) {
  const body = await req.json();

  return handleApi(req, {
    method: "POST",
    path: "/serviceCategorie",
    body,
  });
}