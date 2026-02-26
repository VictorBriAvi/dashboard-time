import { NextRequest } from "next/server";
import { handleApi } from "@/lib/serverApi";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Calculamos total antes de enviar
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
    method: "POST",
    path: "/Sale",
    body: dotnetPayload,
  });
}