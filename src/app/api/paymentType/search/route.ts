import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") ?? "";

  return handleApi(req, {
    method: "GET",
    path: "/paymenttype/search",
    params: { query },
  });
}