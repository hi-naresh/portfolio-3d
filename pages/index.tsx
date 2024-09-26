import { Layout } from "@components/Layout";
import { useLocaleParser } from "@libs/localeParser";
import type {  NextPage } from "next";
import HeroSection from "@components/Home/Main";

const IndexPage: NextPage = () => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("home_title")}>
			<HeroSection />
		</Layout>
	);
};

export default IndexPage;