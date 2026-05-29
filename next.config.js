/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.telegram.org'],
  },
  transpilePackages: [
    '@neondatabase/auth',
    '@neondatabase/auth-ui',
    '@daveyplate/better-auth-ui',
  ],
}

module.exports = nextConfig
