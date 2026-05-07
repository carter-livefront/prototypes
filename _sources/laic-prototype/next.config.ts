import type { NextConfig } from "next";

const isExport = process.env.STATIC_EXPORT === "true";
const exportBasePath = process.env.EXPORT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        basePath: exportBasePath,
        trailingSlash: true,
        images: {
          loader: "custom",
          loaderFile: "./lib/image-loader.ts",
        },
      }
    : {}),
};

export default nextConfig;
