// next.config.js
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'asegalbyfasesorias.cl', 
      'www.asegalbyfasesorias.cl', 
      'fs-asegal.vercel.app',
      'vtlwovpzhwawdmncuxpi.supabase.co' // ← DOMINIO DE SUPABASE AÑADIDO AQUÍ
    ],
    unoptimized: false,
  },
  output: 'standalone',
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
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

module.exports = nextConfig;