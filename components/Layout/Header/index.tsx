import React from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/display-name
const Header: React.FC = React.memo(() => (
	<motion.div
		className="absolute top-0 mt-16 w-full flex justify-center"
		initial={{ width: 0 }}
		animate={{ width: "100%" }}
		transition={{ delay: 0.2, duration: 2, ease: "easeOut" }}
	>
		<motion.div
			className="glassmorphism shadow-2xl w-[60rem] p-1.5 rounded-full flex justify-between items-center space-x-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
			initial={{ width: 0 }}
			animate={{ width: "50rem" }}
			transition={{ delay: 0.1, duration: 2, ease: "easeOut" }}
		>
			<motion.button
				onClick={() => window.open("/", "_self")}
				className="glassmorphism rounded-full p-2"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
			>
				<img className="w-6 h-6 filter invert" src="/icons/site/icon9.svg" />
			</motion.button>

			<motion.p
				className="bg-black bg-opacity-40 text-xs space-x-6 flex justify-center items-center rounded-full px-16 p-3 backdrop-blur-2xl"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
			>
        <span>
          <img className="w-3 h-3 mr-2 filter invert" src="/icons/site/icon1.svg" />
        </span>
				www.nareshjhawar.in/projects
			</motion.p>

			<motion.div
				className="space-x-2 flex"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
			>
				<motion.button
					className="glassmorphism rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
					onClick={() => window.open("/gallery", "_self")}
				>
					<img className="w-6 h-6 filter invert" src="/icons/site/icon3.svg" />
				</motion.button>
				<motion.button
					className="glassmorphism rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
				>
					<img className="w-6 h-6 filter invert" src="/icons/site/icon2.svg" />
				</motion.button>
				<motion.button
					className="glassmorphism font-black rounded-full p-2 backdrop-blur-2xl"
					whileHover={{ scale: 1.1 }}
				>
					<img className="w-6 h-6 filter invert" src="/icons/site/icon4.svg" />
				</motion.button>
			</motion.div>
		</motion.div>
	</motion.div>
));

export default Header;
