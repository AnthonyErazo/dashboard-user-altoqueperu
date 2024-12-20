/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Importante para las rutas estáticas
  basePath: '/intranet', // Prefijo de las rutas
  assetPrefix: '/intranet', // Prefijo para recursos estáticos
  images: {
    unoptimized: true, // Requerido para exportación estática
  },
};

export default nextConfig;