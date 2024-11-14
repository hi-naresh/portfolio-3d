import { Layout } from "@components/Layout";
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
			<section className="h-screen w-screen flex justify-center items-center text-center fixed">
				<ThreeSixtyBackground
					background={'dark'}
				>
					<motion.div
						transition={{duration: 0.4, ease: "easeIn"}}
						className="relative w-full h-full flex items-center justify-center overflow-hidden"
					>
						<CardContainer
							className={"flex-col"}
						>
							<motion.h1  
								initial={{scale:0}}
								animate={{scale:1}}
								transition={{duration: 0.4}}
								className="text-white rounded-full xs:w-[4rem] md:w-[31rem] h-32 sm:text-3xl flex items-center justify-center">
								<motion.div
									initial={{scale:0, scaleX: 0.0}}
									animate={{scale:1, scaleX: 1}}
									transition={{duration: 0.4}}
									whileHover={{scaleX: 0,scaleY: 0.5}}
									style={{WebkitTextStroke: "1px white"}}
									className=" absolute flex md:mx-2 xs:mx-2
									space-x-64
									glassmorphism rounded-full z-0
									mx-10
									text-transparent md:h-32 md:w-full xs:w-80 xs:h-20 xs:text-[6rem] md:text-[6rem] justify-center items-center"
								>
									<motion.div
										initial={{scale:0, scaleX: 0.0}}
										animate={{scale:1, scaleX: 1}}
										transition={{duration: 0.4}}
										exit={{scale: 0}}
										className={" glassBg xs:p-1 left-0 xs:w-[4rem] xs:h-[4rem] md:w-[7rem]  flex items-center justify-center md:h-[7rem] rounded-full"}>
										4{" "}
									</motion.div>
									<motion.div
										initial={{scale:0, scaleX: 0.0}}
										animate={{scale:1, scaleX: 1}}
										transition={{duration: 0.4}}
										className={" glassBg xs:p-1 right-0 xs:w-[4rem] xs:h-[4rem] md:w-[7rem]  flex items-center justify-center md:h-[7rem] rounded-full"}>
										{" "}4
									</motion.div>
								</motion.div>
								<Suspense fallback={
									<Image
										className={"fixed z-10 pointer-events-none top-0 flex items-center justify-center"}
										width={360}
										height={360}
										src={"/assets/siri.png"} alt="Error" />
								}>
									<Image
										width={360}
										height={360}
										className="max-w-auto z-10 pointer-events-none mx-auto my-12 md:max-w-sm"
										src={"/assets/siri.gif"}
										alt="Error"
									/>
								</Suspense>
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
					<div className="absolute bottom-0 w-full">
						<Footer isVisible={false}/>
					</div>
				</ThreeSixtyBackground>
			</section>
		</Layout>
	);
};

export default NotFoundPage;
