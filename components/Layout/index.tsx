import { CONFIG } from "@libs/config";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { type FC, type ReactNode } from "react";
import PageWrapper from "@components/Utils/PageWrapper";
// import Header from "@components/Layout/Header";

export interface ILayout {
	title: string;
	children: ReactNode;
}

export const Layout: FC<ILayout> = ({ title, children }) => {
	const router = useRouter();

	return (
		<div className="select-none bg-black">
			<NextSeo
				title={title}
				canonical={`${CONFIG.SEO.publishDomain}${router.pathname}`}
			/>
			<PageWrapper>
				{children}
			</PageWrapper>
		</div>
	);
};
