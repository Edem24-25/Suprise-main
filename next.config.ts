import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/anniversaire',
        destination: '/anniversaire/miroir',
        permanent: false, // On utilise false pour éviter que le navigateur ne mette en cache cette redirection trop longtemps pendant qu'on débogue
      },
    ];
  },
};

export default nextConfig;
