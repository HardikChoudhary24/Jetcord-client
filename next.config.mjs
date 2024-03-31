/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "jetcord-dev.s3.ap-south-1.amazonaws.com",
      "giphy.com",
      "www.shutterstock.com",
    ],
  },
};

export default nextConfig;
