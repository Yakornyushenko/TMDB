/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzYyMzQ2YjQ3NzUzZjY1YmJkMTg5YjBjNzJjOTI2MSIsInN1YiI6IjY2MzY0ZDk5NjYxMWI0MDEyYTY3ZTEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eJ1d8L0sPLih-_QQzvlpePKxBckeMok0y6N02fFjYfM',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
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
