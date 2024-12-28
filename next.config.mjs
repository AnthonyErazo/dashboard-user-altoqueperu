/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Mantiene barras al final de las rutas
  basePath: '/intranet', // Prefijo de las rutas
  assetPrefix: '/intranet', // Prefijo para recursos estáticos
  images: {
    unoptimized: true, // Requerido para exportación estática
  },
};

export default nextConfig;
