import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://amicito-001-site1.qtempurl.com/api",
  headers: 
  {
    "Content-Type": "application/json",
  },
});
