/** @type {import('next').NextConfig} */
const nextConfig = {
  // BasePath para GitHub Pages
  basePath: '/EXOstudioV',
  assetPrefix: '/EXOstudioV',
  
  // Output estático para GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Image optimization deshabilitado para export estático
  images: {
    unoptimized: true,
  },
  
  // Compression
  compress: true,
}

module.exports = nextConfig