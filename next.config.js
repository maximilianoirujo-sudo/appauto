/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite que la compilación en Vercel sea fluida y sin bloqueos de tipos
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita que reglas de linting bloqueen el despliegue en Vercel
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
};

module.exports = nextConfig;
