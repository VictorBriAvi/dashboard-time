import axios from "axios";
import https from "https";

const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

export const axiosClient = axios.create({
  baseURL: "https://victoravila-001-site1.ktempurl.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent,
});

// https://localhost:7116/api
// https://victoravila-001-site1.ktempurl.com/api
