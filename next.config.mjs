/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;