/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["springchat-user-uploads.s3.eu-west-1.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/competitions",
        destination: "https://api.staging.springprod.com/corev1/competitions/",
      },
    ];
  },
};

module.exports = nextConfig;






