/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.wixstatic.com', 'via.placeholder.com'],
    unoptimized: true, // Desactiva la optimización de imágenes para permitir la exportación estática
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath: '/intranet',
};

export default nextConfig;