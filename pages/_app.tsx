import Favicon from "@assets/icon.svg";
import { CONFIG } from "@libs/config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import NextProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "@styles/blog.scss";
import "@styles/index.scss";
import "@styles/global.css";
import "@styles/gradient.css";

import "highlight.js/styles/tomorrow-night-bright.css";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {

	return (
		<>
			<Head>
				<title>{CONFIG.SEO.title}</title>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href={Favicon.src} />
				<link rel="canonical" href={CONFIG.SEO.publishDomain} />
				<meta charSet="utf-8" />
				<meta name="HandheldFriendly" content="true" />
				<meta
					name="copyright"
					content="Naresh Jhawar, hello.nareshjhawar@gmail.com"
				/>
				<meta name="theme-color" content={CONFIG.SEO.themeColor} />
				<meta
					name="author"
					content="Naresh Jhawar, hello.nareshjhawar@gmail.com"
				/>
				<meta name="keywords" content={CONFIG.SEO.keywords.join(",")} />
				<meta name="description" content={CONFIG.SEO.description} />
				<meta property="og:title" content={CONFIG.SEO.title} />
				<meta
					property="og:description"
					content={CONFIG.SEO.description}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={CONFIG.SEO.publishDomain} />
				<meta property="og:site_name" content={CONFIG.SEO.title} />
				<meta property="og:image" content={Favicon.src} />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:locale:alternate" content="tr_TR" />
				<meta property="og:locale:alternate" content="en_US" />
				<meta
					property="twitter:url"
					content={CONFIG.SEO.publishDomain}
				/>
				<meta property="twitter:title" content={CONFIG.SEO.title} />
				<meta
					property="twitter:description"
					content={CONFIG.SEO.description}
				/>
				<meta property="twitter:image" content={Favicon.src} />

				<meta property="twitter:card" content={Favicon.src} />
			</Head>
			<ThemeProvider defaultTheme="dark" attribute="class">
				<Script
					strategy="afterInteractive"
					data-domain={CONFIG.SEO.domain}
					src="https://plausible.io/js/plausible.js"
				/>
				<Script
					strategy="afterInteractive"
					src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_TRACKING_ID}`}
				/>
				<Script
					id="gtag-init"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag() {
								dataLayer.push(arguments);
							}
							gtag("js", new Date());
							gtag("config", "${CONFIG.GA_TRACKING_ID}", {
								page_path: window.location.pathname,
							});
						`,
					}}
				/>
				<Script src="https://cdn.polyfill.io/v3/polyfill.min.js"/>
				<Script
					id={"video"}
					strategy={"afterInteractive"}
					dangerouslySetInnerHTML={{
						__html: `
							const videos = document.querySelectorAll(" .video .video");
							for (const video of videos) {
								video.setAttribute("playsinline", "");
								video.setAttribute("muted", "");
								video.play();
							}
						`,
					}}
				/>
				<NextProgress color={CONFIG.SEO.themeColor}/>
				<DefaultSeo titleTemplate={CONFIG.SEO.layoutTitle}/>
				<Component {...pageProps} />
				<ToastContainer position="bottom-right"/>
			</ThemeProvider>
		</>
	);
};

export default App;
