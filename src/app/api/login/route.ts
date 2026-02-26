import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosClient } from "@/lib/axiosClient";

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = Buffer.from(payload, "base64").toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axiosClient.post("/auth/login", body);
    const { token } = response.data;

    if (!token) {
      return NextResponse.json(
        { message: "Token no recibido del backend" },
        { status: 500 }
      );
    }

    const decoded = decodeJwt(token);

    if (!decoded?.exp) {
      return NextResponse.json(
        { message: "Token inválido" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(decoded.exp * 1000),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  }
}