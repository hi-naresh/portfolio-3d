import { Layout } from "@components/Layout";
import { useLocaleParser } from "@libs/localeParser";
import type {  NextPage } from "next";
import HomeSection from "@components/Home";

const IndexPage: NextPage = () => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("home_title")}>
			<HomeSection />
		</Layout>
	);
};

export default IndexPage;