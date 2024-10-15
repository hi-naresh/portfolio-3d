import { CONFIG } from "@libs/config";
import Link from "next/link";
import React, { FC } from "react";
import AnimatedTextWithHover from "@components/Animations/Text2";

export const Footer: FC = () => (
	<div className="fixed bottom-0 z-50 w-screen">
		<div
			className=" z-10 hover:z-0 hover:opacity-90 text-center">
			<AnimatedTextWithHover text="JHAWAR"/>
		</div>
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
		<div
			className="pointer-events-none absolute z-10 h-96 bottom-0 w-full bg-gradient-to-t from-black to-transparent"></div>

	</div>
);
