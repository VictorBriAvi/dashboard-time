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

  let body: any;

  try {
    body = await req.json();
  } catch (e) {
    console.error("[PUT /api/sale/:id] ❌ Error al parsear el body:", e);
    return new Response(JSON.stringify({ message: "Body inválido" }), { status: 400 });
  }

  // ─── LOG: lo que manda el frontend ───────────────────────────────────────
  console.log("[PUT /api/sale/:id] ✅ Body recibido del frontend:", JSON.stringify(body, null, 2));
  console.log("[PUT /api/sale/:id] saleDetails count:", body?.saleDetails?.length ?? "UNDEFINED");
  console.log("[PUT /api/sale/:id] payments count:", body?.payments?.length ?? "UNDEFINED");

  // ─── Validación defensiva ─────────────────────────────────────────────────
  if (!body?.clientId) {
    console.error("[PUT /api/sale/:id] ❌ clientId faltante");
    return new Response(JSON.stringify({ message: "clientId es obligatorio" }), { status: 400 });
  }

  if (!Array.isArray(body?.saleDetails) || body.saleDetails.length === 0) {
    console.error("[PUT /api/sale/:id] ❌ saleDetails vacío o inválido");
    return new Response(JSON.stringify({ message: "saleDetails es obligatorio" }), { status: 400 });
  }

  if (!Array.isArray(body?.payments) || body.payments.length === 0) {
    console.error("[PUT /api/sale/:id] ❌ payments vacío o inválido");
    return new Response(JSON.stringify({ message: "payments es obligatorio" }), { status: 400 });
  }

  // ─── Transformación al formato que espera el backend .NET ─────────────────
  // SaleCreationDTO espera: clientId, payments[], saleDetails[]
  // El frontend manda "total" en cada detail — el backend lo ignora, calcula su propio total
  const dotnetPayload = {
    clientId: body.clientId,
    payments: body.payments.map((p: any) => ({
      paymentTypeId: p.paymentTypeId,
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

  // ─── LOG: lo que se envía al backend .NET ────────────────────────────────
  console.log("[PUT /api/sale/:id] 🚀 Payload enviado al backend .NET:", JSON.stringify(dotnetPayload, null, 2));

  const result = await handleApi(req, {
    method: "PUT",
    path: `/sale/${id}`,
    body: dotnetPayload,
  });

  // ─── LOG: respuesta del backend ──────────────────────────────────────────
  const cloned = result.clone();
  const responseText = await cloned.text();
  console.log("[PUT /api/sale/:id] 📨 Respuesta del backend (.NET):", result.status, responseText);

  return result;
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