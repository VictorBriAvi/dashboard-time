import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    secure: false, // en producción true
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // 💣 invalida inmediatamente
  });

  return NextResponse.json({ success: true });
}