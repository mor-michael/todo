/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    loader: "akamai",
    path: "/",
  }
}

module.exports = nextConfig
