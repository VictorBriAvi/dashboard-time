import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

export async function GET(req: NextRequest) {
  const fromDate = req.nextUrl.searchParams.get("fromDate");
  const toDate = req.nextUrl.searchParams.get("toDate");

  return handleApi(req, {
    method: "GET",
    path: "/sale/by-date-range",
    params: { fromDate, toDate },
  });
}