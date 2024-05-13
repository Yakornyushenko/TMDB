/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'default',
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/**',
            },
        ],
    },
};
export default nextConfig;
