import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:7116/api",
  headers: 
  {
    "Content-Type": "application/json",
  },
});
// https://localhost:7116/api
// https://victoravila-001-site1.ktempurl.com/api