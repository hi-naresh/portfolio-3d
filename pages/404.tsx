import { Layout } from "@components/Layout";
import { shimmer } from "@libs/shimmer";
import type { NextPage } from "next";
import Image from "next/image";
import ThreeSixtyBackground from "@components/Gallery/MotionBg";
import { motion} from "framer-motion";
import React, {Suspense} from "react";
import {CardContainer} from "@components/ui/3d-card";
import {Footer} from "@components/Layout/Footer";

const NotFoundPage: NextPage = () => {
	return (
		<Layout title="Not Found">
			<section className="h-screen w-screen flex justify-center items-center text-center relative">
				<ThreeSixtyBackground
					background={'dark'}
				>
					<motion.div
						transition={{duration: 0.4, ease: "easeIn"}}
						className="relative w-full h-screen flex items-center justify-center overflow-hidden"
					>
						<CardContainer
							className={"flex-col"}
						>
							<motion.h1  
								initial={{opacity: 0,scale:0, scaleX: 0.0}}
								animate={{opacity: 1,scale:1, scaleX: 1}}
								transition={{duration: 0.4}}
								className="text-white glassmorphism rounded-full sm:text-3xl flex items-center justify-center">
								<motion.div
									initial={{opacity: 0,scale:0, scaleX: 0.0}}
									animate={{opacity: 1,scale:1, scaleX: 1}}
									transition={{duration: 0.4}}
									style={{WebkitTextStroke: "1px white"}}
									className="flex md:mx-2 xs:mx-2
									hover:scale-[101%]
									hover:text-white 
									hover:drop-shadow-[0_0_20px_rgba(0,0,0,1)] 
									text-transparent md:h-32 md:w-full xs:w-80 xs:h-20 rounded-full xs:text-[6rem] md:text-[6rem] justify-center items-center"
								>
									<div
										className={" glassBg xs:p-1 left-0 xs:w-[4rem] xs:h-[4rem] md:w-[7rem]  flex items-center justify-center md:h-[7rem] rounded-full"}>
										4{" "}
									</div>
									<Suspense fallback={
										<Image
											width={360}
											height={360}
											src={"/assets/siri.png"} alt="Error" />
									}>
										<Image
											width={360}
											height={360}
											className="max-w-auto mx-auto my-12 md:max-w-sm"
											src={"/assets/siri.gif"}
											alt="Error"
										/>
									</Suspense>
									<div
										className={" glassBg xs:p-1 right-0 xs:w-[4rem] xs:h-[4rem] md:w-[7rem]  flex items-center justify-center md:h-[7rem] rounded-full"}>
										{" "}4
									</div>
								</motion.div>
							</motion.h1>
							<div
								className="text-white/70 hover:text-white glassmorphism p-6 rounded-4xl md:text-sm sm:text-md mt-20">
								We couldn't find the page you are looking for. <br/>
								Please go back to the home page.
							</div>
							<div className={"flex space-x-4 z-50"}>
								<button
									className="mt-8 glassmorphism px-6 py-3 rounded-3xl text-sm text-white/70 border border-white hover:scale-105 hover:text-white"
									onClick={() => window.history.back()}
								>
									Go Back
								</button>
								<button
									className="mt-8 glassmorphism px-6 py-3 rounded-3xl text-sm text-white/70 border border-white hover:scale-105 hover:text-white"
									onClick={
										() => window.location.href = "/"
									}
								>
									Go Home
								</button>
							</div>

						</CardContainer>

					</motion.div>
					<Footer isVisible={false}/>
				</ThreeSixtyBackground>
			</section>
		</Layout>
	);
};

export default NotFoundPage;
