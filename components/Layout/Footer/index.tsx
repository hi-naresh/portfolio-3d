import { CONFIG } from "@libs/config";
import Link from "next/link";
import React, { FC } from "react";
import AnimatedTextWithHover from "@components/Animations/Text2";
import {AnimatePresence, motion} from "framer-motion";
// import {TextHoverEffect} from "@components/ui/Text_hover";

interface IFooter {
	isVisible?: boolean;
	isFade?: boolean;
}
export const Footer: FC<IFooter> = ({ isVisible = true , isFade=true}) => (
	<div className="z-0 w-screen">
		<AnimatePresence>
		{
			isVisible && (
				<motion.div
					//Y hide and display
					initial={{y: 200, scaleY: 0}}
					animate={{y: 0, scaleY: 1}}
					exit={{y: 200, scaleY: 0, scaleX: 0}}
					transition={
						{
							type: "spring",
							stiffness: 360,
							damping: 60,
							duration: 1.6,
						}
					}
					className="text-center  md:-mb-8">
					{/*<div className="h-[40rem] xs:scale-[100%] md:scale-[50%]  z-0 flex items-center justify-center">*/}
					{/*	<TextHoverEffect text="JHAWAR"/>*/}
					{/*</div>*/}
					<AnimatedTextWithHover text="JHAWAR"/>
				</motion.div>
			)
		}
		</AnimatePresence>
		<div
			className=" flex mx-6 flex-col xs:flex-col-reverse items-center px-3 pb-5 pt-0 text-center text-sm text-gray-600 dark:text-gray-400 md:flex-row">
			<div className={"z-20 rounded-full p-1 px-3"}>
				<div className=" ">
					&copy; 2023 - {CONFIG.NOW} All rights reserved by Naresh Jhawar.
				</div>
			</div>
			<div className="mt-2 z-20 flex flex-row gap-2 md:flex-auto md:flex-row-reverse">
				<div className={" flex rounded-full p-1.5 px-3"}>
					{CONFIG.CONTACT.map((social, idx) => (
						<Link
							className={" rounded-full mx-2 p-0.5 "}
							key={idx} href={social.href} target="_blank">
							<social.icon
								className="w-5 cursor-pointer text-gray-600 hover:text-black hover:underline dark:text-gray-400 dark:hover:text-white"/>
						</Link>
					))}
				</div>

			</div>

		</div>
		{
			isFade && (
				<div
					className="pointer-events-none absolute z-10 h-96 bottom-0 w-full bg-gradient-to-t from-black to-transparent"></div>

			)
		}
	</div>
);
