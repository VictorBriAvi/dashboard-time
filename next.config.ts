import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 CLAVE
  images: {
    unoptimized: true, // 👈 requerido para GitHub Pages
  },
};

export default nextConfig;
