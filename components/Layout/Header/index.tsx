import React from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/display-name
const Header: React.FC = React.memo(() => (
	<motion.div
		className="absolute top-0 md:mt-16 xs:mt-4 w-full flex justify-center px-4 sm:px-6"
		initial={{ width: 0 }}
		animate={{ width: "100%" }}
		transition={{ delay: 0.2, duration: 2, ease: "easeOut" }}
	>
		<motion.div
			className="glassmorphism shadow-2xl w-full max-w-[60rem] sm:max-w-[40rem] px-1.5 md:py-0.5 xs:py-1.5 rounded-full flex justify-between items-center space-x-4 bg-white bg-opacity-10"
			initial={{ width: 0 }}
			animate={{ width: "100%" }}
			transition={{ delay: 0.1, duration: 2, ease: "easeOut" }}
		>
			<motion.button
				onClick={() => window.open("/", "_self")}
				className="glassBg rounded-full md:p-2 xs:p-1"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
			>
				<img className="w-6 h-6 filter invert" src="/icons/site/icon9.svg" />
			</motion.button>

			<motion.p
				className="bg-black bg-opacity-30 border-[1px] border-white/40 text-xs sm:text-sm flex justify-center items-center rounded-full px-6 sm:px-16 py-2"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
			>
        <span>
          <img className="w-3 h-3 mr-2 filter invert" src="/assets/icons/lock.svg" />
        </span>
				www.nareshjhawar.in/projects
			</motion.p>

			<motion.div
				className="space-x-2 flex xs:hidden md:flex"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
			>
				<motion.button
					className="glassmorphism rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
					onClick={() => window.open("/gallery", "_self")}
				>
					<img className="w-6 h-6 filter invert" src="/assets/icons/reload.svg" />
				</motion.button>
				<motion.button
					className="glassmorphism rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
				>
					<img className="w-6 h-6 filter invert" src="/assets/icons/contact.svg" />
				</motion.button>
				<motion.button
					className="glassmorphism font-black rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
				>
					<img className="w-6 h-6 filter invert" src="/assets/icons/call.svg" />
				</motion.button>
			</motion.div>
		</motion.div>
	</motion.div>
));

export default Header;
