/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['static.wixstatic.com', 'via.placeholder.com'],
    },
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
  };
  
  export default nextConfig;  