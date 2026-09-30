import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática para servirse en Cloudflare Workers (migrado desde Netlify).
  output: 'export',
  images: { unoptimized: true },
  /* config options here */
};

export default nextConfig;
