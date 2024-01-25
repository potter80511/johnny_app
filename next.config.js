const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: true,
  },
  basePath: "/johnny_app",
  assetPrefix:"/johnny_app",
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
