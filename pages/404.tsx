import { Layout } from "@components/Layout";
import { shimmer } from "@libs/shimmer";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage: NextPage = () => {

	return (
		<Layout title="Not Found">
			<section
				className="h-screen px-4 py-8 text-center text-black ">
				<h1 className=" flex items-center justify-center text-white text-9xl sm:text-7xl">
					<div className={"flex justify-center items-center"}>
						4{' '}
						<Image
							placeholder="blur"
							width={256}
							height={256}
							blurDataURL={shimmer(512, 512)}
							className="max-w-auto mx-auto my-12 md:max-w-sm"
							src={"https://c.tenor.com/Nl45qRGQk_0AAAAi/ghost-white.gif"}
							alt="Error"
						/>
						{' '}
						4
					</div>
				</h1>
				<p className="text-white text-lg sm:text-2xl mt-2">
					We couldnt find the page you are looking for.
				</p>
				<Link href="/">
					<div
						className="mt-12 inline-block bg-white text-black px-4 py-2 rounded-3xl text-sm border border-white transition-all duration-300 ease-in hover:bg-black hover:text-white">
						Back to home
					</div>
				</Link>
			</section>
		</Layout>
	);
};

export default NotFoundPage;
