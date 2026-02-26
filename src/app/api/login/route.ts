import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosClient } from "@/lib/axiosClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Body recibido:", body);

    // 🔥 Llamada al backend .NET
    const response = await axiosClient.post("/auth/login", body);

    const { token } = response.data;

    if (!token) {
      return NextResponse.json(
        { message: "Token no recibido del backend" },
        { status: 500 }
      );
    }

    // 🔥 Next 16 requiere await
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false, // 🔥 en desarrollo mejor forzarlo a false
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error en login:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  }
}
