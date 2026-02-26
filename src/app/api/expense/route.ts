import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

// 🔹 GET ALL (con filtros)
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") ?? "";
  const expenseTypeId = req.nextUrl.searchParams.get("expenseTypeId");
  const paymentTypeId = req.nextUrl.searchParams.get("paymentTypeId");
  const fromDate = req.nextUrl.searchParams.get("fromDate");
  const toDate = req.nextUrl.searchParams.get("toDate");

  return handleApi(req, {
    method: "GET",
    path: "/Expense",
    params: {
      search,
      expenseTypeId,
      paymentTypeId,
      fromDate,
      toDate,
    },
  });
}

// 🔹 CREATE
export async function POST(req: NextRequest) {
  const body = await req.json();

  return handleApi(req, {
    method: "POST",
    path: "/Expense",
    body,
  });
}