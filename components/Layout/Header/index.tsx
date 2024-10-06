// import React from "react";
// import { motion } from "framer-motion";
//
// // eslint-disable-next-line react/display-name
// const Header: React.FC = React.memo(() => (
// 	<motion.div
// 		className="absolute top-0 md:mt-16 xs:mt-4 w-full flex justify-center px-4 sm:px-6"
// 		initial={{ scaleX: 0 }} // Expand from center
// 		animate={{ scaleX: 1 }}
// 		transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
// 	>
// 		<motion.div
// 			className="glassmorphism w-full max-w-[60rem] sm:max-w-[40rem] px-1.5 md:py-[0.35rem] xs:py-1.5 rounded-full flex justify-between items-center space-x-4 bg-white bg-opacity-10"
// 			initial={{ scaleX: 0 }} 
// 			animate={{ scaleX: 1 }}
// 			transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
// 		>
// 			{/* Pop-Out Buttons after Width Animation Completes */}
// 			<motion.button
// 				className="space-x-2 flex"
// 				initial={{scale: 0, opacity: 0}} // Start hidden
// 				animate={{scale: 1, opacity: 1}} // Pop out after width animation
// 				transition={{delay: 1.8, duration: 0.5, ease: "easeOut"}} // Delayed until width completes
// 			>
// 				<motion.button
// 					className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
// 					whileHover={{scale: 1.2}} // Pop out further on hover
// 					transition={{duration: 0.2}}
// 					onClick={() => window.open("/", "_self")}
// 				>
// 					<img className="w-6 h-6 filter invert" src="/icons/site/icon9.svg" alt={"back"}/>
// 				</motion.button>
// 			</motion.button>
//
// 			{/* Header Text with Pop-Out Effect */}
// 			<motion.p
// 				className="bg-black bg-opacity-30 border-[1px] border-white/40 text-xs sm:text-sm flex justify-center items-center rounded-full px-6 sm:px-16 py-2"
// 				initial={{scale: 0, opacity: 0}} // Start hidden
// 				animate={{scale: 1, opacity: 1}} // Pop out after width animation
// 				transition={{delay: 1.9, duration: 0.5, ease: "easeOut"}} // Delayed until width completes
// 			>
// 				<span>
// 				  <img className="w-3 h-3 mr-2 filter invert" src="/assets/icons/lock.svg" alt={"secure"} />
// 				</span>www.nareshjhawar.in/projects
// 			</motion.p>
//
// 			{/* Button Group with Pop-Out Effect */}
// 			<motion.div
// 				className="space-x-2 flex"
// 				initial={{ scale: 0, opacity: 0 }} // Start hidden
// 				animate={{ scale: 1, opacity: 1 }} // Pop out after width animation
// 				transition={{ delay: 2.0, duration: 0.5, ease: "easeOut" }} // Delayed until width completes
// 			>
// 				<motion.button
// 					className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
// 					whileHover={{ scale: 1.2 }} // Pop out further on hover
// 					transition={{ duration: 0.2 }}
// 					onClick={
// 						() => window.location.reload()
// 					}
// 				>
// 					<img className="w-6 h-6 filter invert" src="/assets/icons/reload.svg" alt={"reload"} />
// 				</motion.button>
// 				<motion.button
// 					className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
// 					whileHover={{ scale: 1.2 }} // Pop out further on hover
// 					transition={{ duration: 0.2 }}
// 				>
// 					<img className="w-6 h-6 filter invert" src="/assets/icons/contact.svg" alt={"contact"} />
// 				</motion.button>
// 				<motion.button
// 					className="glassBg bg-white bg-opacity-10 font-black rounded-full p-1.5 "
// 					whileHover={{ scale: 1.2 }} // Pop out further on hover
// 					transition={{ duration: 0.2 }}
// 					onClick={
// 						() => window.open("tel:+91-9099939930", "_self")
// 					}
// 				>
// 					<img className="w-6 h-6 filter invert" src="/assets/icons/call.svg" alt={"call"} />
// 				</motion.button>
// 			</motion.div>
// 		</motion.div>
// 	</motion.div>
// ));
//
// export default Header;

import React from "react";
import {AnimatePresence, motion} from "framer-motion";

interface HeaderProps {
	handleContactClick: () => void; // Function to handle the contact button click
	goBack: () => void; // Function to handle the back button click
}

// eslint-disable-next-line react/display-name
const Header: React.FC<HeaderProps> = React.memo(({ handleContactClick,goBack }) => (
	// <AnimatePresence>
		<motion.div
			className="absolute z-50 top-0 md:mt-16 xs:mt-4 w-full flex justify-center px-4 sm:px-6"
			initial={{scaleX: 0}} // Expand from center
			animate={{scaleX: 1}}
			// exit={{scale: 0}}
			transition={{delay: 0.1, duration: 1.0, ease: "easeInOut"}}
		>
			<motion.div
				className="glassmorphism w-full max-w-[60rem] sm:max-w-[40rem] px-1.5 md:py-[0.35rem] xs:py-1.5 rounded-full flex justify-between items-center space-x-4 bg-white bg-opacity-10"
				initial={{scaleX: 0}}
				animate={{scaleX: 1}}
				transition={{delay: 0.2, duration: 1.5, ease: "easeInOut"}}
			>
				{/* Pop-Out Buttons after Width Animation Completes */}
				<motion.button
					className="space-x-2 flex"
					initial={{scale: 0, opacity: 0}} // Start hidden
					animate={{scale: 1, opacity: 1}} // Pop out after width animation
					transition={{delay: 1.8, duration: 0.5, ease: "easeOut"}} // Delayed until width completes
				>
					<motion.button
						className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
						whileHover={{scale: 1.2}} // Pop out further on hover
						transition={{duration: 0.2}}
						onClick={goBack}
					>
						<img className="w-6 h-6 filter invert" src="/icons/site/icon9.svg" alt="back"/>
					</motion.button>
				</motion.button>

				{/* Header Text with Pop-Out Effect */}
				<motion.p
					className="bg-black bg-opacity-30 border-[1px] border-white/40 text-xs sm:text-sm flex justify-center items-center rounded-full px-6 sm:px-16 py-2"
					initial={{scale: 0, opacity: 0}} // Start hidden
					animate={{scale: 1, opacity: 1}} // Pop out after width animation
					transition={{delay: 1.9, duration: 0.5, ease: "easeOut"}} // Delayed until width completes
				>
        <span>
          <img className="w-3 h-3 mr-2 filter invert" src="/assets/icons/lock.svg" alt="secure"/>
        </span>
					www.nareshjhawar.in/projects
				</motion.p>

				{/* Button Group with Pop-Out Effect */}
				<motion.div
					className="space-x-2 flex"
					initial={{scale: 0, opacity: 0}} // Start hidden
					animate={{scale: 1, opacity: 1}} // Pop out after width animation
					transition={{delay: 2.0, duration: 0.5, ease: "easeOut"}} // Delayed until width completes
				>
					<motion.button
						className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
						whileHover={{scale: 1.2}} // Pop out further on hover
						transition={{duration: 0.2}}
						onClick={() => window.location.reload()}
					>
						<img className="w-6 h-6 filter invert" src="/assets/icons/reload.svg" alt="reload"/>
					</motion.button>

					<motion.button
						className="glassBg bg-white bg-opacity-10 xs:hidden md:flex rounded-full p-1.5 " // Applying backdrop blur for glassmorphism
						whileHover={{scale: 1.2}} // Pop out further on hover
						transition={{duration: 0.2}}
						onClick={handleContactClick} // Call the function to show the contact component
					>
						<img className="w-6 h-6 filter invert" src="/assets/icons/contact.svg" alt="contact"/>
					</motion.button>

					<motion.button
						className="glassBg bg-white bg-opacity-10 font-black rounded-full p-1.5 "
						whileHover={{scale: 1.2}} // Pop out further on hover
						transition={{duration: 0.2}}
						onClick={() => window.open("tel:+91-9099939930", "_self")}
					>
						<img className="w-6 h-6 filter invert" src="/assets/icons/call.svg" alt="call"/>
					</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	// </AnimatePresence>
));

export default Header;
