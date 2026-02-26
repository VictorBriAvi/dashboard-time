import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

export async function GET(req: NextRequest) {
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  return handleApi(req, {
    method: "GET",
    path: "/report/payment-type-balance",
    params: { startDate, endDate },
  });
}