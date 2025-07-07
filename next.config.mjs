/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['asegalbyfasesorias.cl', 'www.asegalbyfasesorias.cl', 'fs-asegal.vercel.app'],
    unoptimized: true, // Desactiva optimización si hay problemas
  },
  output: 'standalone', // Para mejor compatibilidad con Vercel
  trailingSlash: true,
  // Configuración para evitar errores de MIME type
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
};

// Usa export default en lugar de module.exports
export default nextConfig;