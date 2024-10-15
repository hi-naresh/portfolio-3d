import { CONFIG } from "@libs/config";
import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => (
	<div className="fixed bottom-0 z-50 w-screen">
		<div className=" flex mx-6 flex-col xs:flex-col-reverse items-center px-3 pb-5 pt-5 text-center text-sm text-gray-600 dark:text-gray-400 md:flex-row">
			<div className={" rounded-full p-1 px-3"}>
				<div className=" ">
					&copy; 2023 - {CONFIG.NOW} All rights reserved by Naresh Jhawar.
				</div>
			</div>
			<div className="mt-2 flex flex-row gap-2 md:flex-auto md:flex-row-reverse">
				<div className={" flex rounded-full p-1.5 px-3"}>
					{CONFIG.CONTACT.map((social, idx) => (
						<Link 
							className={" rounded-full mx-2 p-0.5 "}
							key={idx} href={social.href} target="_blank">
							<social.icon className="w-5 cursor-pointer text-gray-600 hover:text-black hover:underline dark:text-gray-400 dark:hover:text-white" />
						</Link>
					))}
				</div>
				
			</div>
		</div>
	</div>
);
