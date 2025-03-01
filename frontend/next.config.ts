import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow images from any domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ Allows images from any domain
      },
    ],
  },

    // output: "standalone"
  /* config options here */
  // experimental: {
  //   dynamicIO: true,
  //   authInterrupts: true,
  // },
};

export default nextConfig;
