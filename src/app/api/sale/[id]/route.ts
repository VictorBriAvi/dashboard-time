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
// ✅ FIX: transforma el payload igual que el POST para que el backend .NET lo acepte
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const totalAmount = body.saleDetails.reduce(
    (sum: number, d: any) => sum + d.total,
    0
  );

  const dotnetPayload = {
    clientId: body.clientId,
    totalAmount,
    payments: body.payments.map((p: any) => ({
      paymentTypeId: p.paymentTypeId,
      paymentTypeName: "",
      amountPaid: p.amountPaid,
    })),
    saleDetails: body.saleDetails.map((d: any) => ({
      saleId: 0,
      serviceTypeId: d.serviceTypeId,
      employeeId: d.employeeId,
      unitPrice: d.unitPrice,
      discountPercent: d.discountPercent,
      additionalCharge: d.additionalCharge,
    })),
  };

  return handleApi(req, {
    method: "PUT",
    path: `/sale/${id}`,
    body: dotnetPayload,
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