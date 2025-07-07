/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'asegalbyfasesorias.cl',
      'www.asegalbyfasesorias.cl',
      'fs-asegal.vercel.app',
      'fs-asegal-*.vercel.app'
    ],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'standalone',
};

// Usa export default en lugar de module.exports
export default nextConfig;