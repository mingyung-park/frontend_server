/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'i.pinimg.com',
            'i.imgur.com',
            'threepark-bucket.s3.ap-northeast-2.amazonaws.com',
        ],
    },
    pageExtensions: ['js', 'jsx', 'tsx', 'ts'],

    experimental: {
        reactRoot: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    head: {
        meta: {
            charset: 'UTF-8',
        },
    },
}
module.exports = nextConfig
