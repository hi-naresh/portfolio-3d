import { Layout } from "@components/Layout";
import { CONFIG } from "@libs/config";
import {
	getMostStarredRepos,
	getPinnedRepos,
	IStarredRepo,
} from "@libs/graphql";
import { useLocaleParser } from "@libs/localeParser";
import type { GetStaticProps, NextPage } from "next";
import HeroSection from "@components/Home/Main";

export interface IIndexPage {
	repos: IStarredRepo[];
	pinned: IStarredRepo[];
}

const IndexPage: NextPage<IIndexPage> = () => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("home_title")}>
			<HeroSection />
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IIndexPage> = async () => {
	const repos = await getMostStarredRepos();
	const pinned = await getPinnedRepos();

	return {
		props: {
			repos,
			pinned,
		},
		revalidate: CONFIG.REVALIDATION,
	};
};
