/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	trailingSlash: true,
	swcMinify: true,
	i18n: {
		locales: ["en", "tr"],
		defaultLocale: "en",
	},
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"c.tenor.com"
		],
		// remotePatterns: [
		// 	"https://avatars.githubusercontent.com/*",
		// ],
	},
	async redirects() {
		return [
			{
				source: "/github",
				destination: "https://github.com/hi-naresh",
				permanent: true,
			},
			{
				source: "/instagram",
				destination: "https://www.instagram.com/nareshjhawar",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
