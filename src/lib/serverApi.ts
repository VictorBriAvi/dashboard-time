import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { Method } from "axios";
import https from "https";

const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

const BASE_URL = "https://victoravila-001-site1.ktempurl.com/api";

// https://localhost:7116/api
// https://victoravila-001-site1.ktempurl.com/api

type ApiOptions = {
  method: Method;
  path: string;
  body?: any;
  params?: any;
};

export async function handleApi(
  req: NextRequest,
  options: ApiOptions
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

if (!token) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

  try {
    const response = await axios({
      method: options.method,
      url: `${BASE_URL}${options.path}`,
      data: options.body,
      params: options.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data ?? "Error" },
      { status: error.response?.status ?? 500 }
    );
  }
}