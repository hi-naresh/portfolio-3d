// import { ResumeAbout } from "@components/Resume/About";
// // import { ResumeCertificates } from "@components/Resume/Certificates";
// // import { ResumeEducation } from "@components/Resume/Education";
// import { ResumeWorkExperience } from "@components/Resume/Experience";
// import { ResumeHeader } from "@components/Resume/Header";
// import { ResumeProjects } from "@components/Resume/Projects";
// import { ResumeSider } from "@components/Resume/Sider";
// import { CONFIG } from "@libs/config";
// import {
// 	IStarredRepo,
// 	getMostStarredRepos,
// 	getPinnedRepos,
// } from "@libs/graphql";
// import { useLocaleParser } from "@libs/localeParser";
// import type { GetStaticProps, NextPage } from "next";
// import { NextSeo } from "next-seo";
//
// export interface IResumePage {
// 	repos: IStarredRepo[];
// 	pinned: IStarredRepo[];
// }
//
// const ResumePage: NextPage<IResumePage> = ({ repos, pinned }) => {
// 	// const router = useRouter();
// 	const parser = useLocaleParser();
//
// 	return (
// 		<>
// 			<NextSeo
// 				title={parser.get("resume")}
// 				// canonical={`${CONFIG.SEO.publishDomain}${router.pathname}`}
// 			/>
// 			<div id="resume" className="flex content-center bg-white text-black justify-center">
// 				<div className="mb-20 mt-20 w-4/5 rounded-2xl border border-gray-300 px-20 py-20 shadow-lg">
// 					<ResumeHeader />
// 					<main className="mt-10 flex gap-x-10">
// 						<ResumeSider />
// 						<div className="w-4/6">
// 							<ResumeAbout />
// 							{/*<ResumeCertificates />*/}
// 							<ResumeWorkExperience />
// 						</div>
// 					</main>
// 					<ResumeProjects repos={repos} pinned={pinned} />
// 					<footer className="px-20 pt-5 text-center text-sm">
// 						{parser.get("resume_footer")}
// 					</footer>
// 				</div>
// 			</div>
// 		</>
// 	);
// };
//
// export default ResumePage;
//
// export const getStaticProps: GetStaticProps<IResumePage> = async () => {
// 	const repos = await getMostStarredRepos();
// 	const pinned = await getPinnedRepos();
//
// 	return {
// 		props: {
// 			repos,
// 			pinned,
// 		},
// 		revalidate: CONFIG.REVALIDATION,
// 	};
// };

const ResumePage = () => {
	return (
		<div>
			<h1>Resume Page</h1>
		</div>
	);
};

export default ResumePage;