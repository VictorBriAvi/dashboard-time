import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

export async function GET(req: NextRequest) {
  const fromDate = req.nextUrl.searchParams.get("fromDate");
  const toDate = req.nextUrl.searchParams.get("toDate");
  const clientId = req.nextUrl.searchParams.get("clientId");
  const paymentTypeId = req.nextUrl.searchParams.get("paymentTypeId");
  const employeeId = req.nextUrl.searchParams.get("employeeId");
  const serviceTypeId = req.nextUrl.searchParams.get("serviceTypeId");

  return handleApi(req, {
    method: "GET",
    path: "/sale/filtered",
    params: {
      fromDate,
      toDate,
      clientId,
      paymentTypeId,
      employeeId,
      serviceTypeId,
    },
  });
}