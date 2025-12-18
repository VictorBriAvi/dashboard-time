import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: "export",
  
  basePath: "/dashboard-time",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
