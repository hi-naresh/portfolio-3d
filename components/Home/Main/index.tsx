// import React from 'react';
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls} from '@react-three/drei';
// import { motion } from 'framer-motion';
// import AnimatedNeonSvg from "@components/Animations/Neon";
// import AnimatedTextWithHover from "@components/Animations/Text2";
// import ModelCode from "@components/Home/Main/ModelJSX";
// import {Footer} from "@components/Layout/Footer";
// // import {BackgroundLines} from "@components/ui/background_lines";
//
//
// const HeroSection = () => {
// 	// const images = [
// 	// 	'/images/projects/work1.webp',
// 	// 	'/images/projects/work2.webp',
// 	// 	'/images/projects/work3.webp',
// 	// 	'/images/projects/work4.webp',
// 	// 	'/images/projects/work5.webp',
// 	// 	'/images/projects/work6.webp',
// 	// ];
//	
// 	return (
// 		<div className={"w-screen fixed bg-black"}>
// 			{/*<BackgroundLines*/}
// 			{/*	svgOptions={{duration:12}}*/}
// 			{/*	className="flex items-center justify-center w-full flex-col px-4">*/}
// 				<section className="relative h-screen w-full overflow-hidden ">
// 					<motion.div
// 						className="absolute inset-0 flex justify-center items-center transition duration-500 ease-in-out"
// 					>
// 						<div
// 							className="lg:w-[150%] md:w-[200%] sm:w-[300%] xs:w-[300%] overflow-clip md:mt-44"
// 						>
// 							<AnimatedNeonSvg />
// 						</div>
// 					</motion.div>
// 					<div
// 						className="absolute z-10 hover:z-50 hover:opacity-90 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/6 text-center  ">
// 						<AnimatedTextWithHover text="JHAWAR"
// 							// imageUrls={images}
// 						/>
// 					</div>
// 					<div
// 						className="pointer-events-none absolute z-40 h-96 bottom-0 w-full bg-gradient-to-t from-black to-transparent  "></div>
//
// 					<Canvas
// 						camera={{
// 							position: [0, 1.3, 3.2],
// 							fov: 35
// 						}}
// 						gl={{antialias: false}}
//
// 						style={{
// 							background: 'transparent',
// 						}}
// 						className={"pt-[3rem]"}
// 					>
// 						{/*<Environment*/}
// 						{/*	background*/}
// 						{/*	backgroundBlurriness={0.5}*/}
// 						{/*	preset={"lobby"}*/}
// 						{/*	blur={0.25} />*/}
// 						<ambientLight intensity={0.28}/>
// 						<pointLight position={[-15, 0, 0]} color="#FF005D" intensity={200}/>
// 						<pointLight position={[15, 0, 0]} color="#4BECE9" intensity={200}/>
// 						<pointLight position={[0, 10, 0]} color="#FFFFFF" intensity={200}/>
// 						<OrbitControls enableZoom={false} enableRotate={false}/>
// 						{/*<Model url="/model/model.glb"/>*/}
// 						<ModelCode/>
// 					</Canvas>
// 					{/* Black overlay for fade to black effect */}
// 					<Footer />
//
// 					<div
// 						id="black-overlay"
// 						className="absolute z-50 inset-0 bg-black opacity-0 transition-opacity duration-1000"
// 						style={{pointerEvents: 'none'}}
// 					></div>
// 				</section>
// 			{/*</BackgroundLines>*/}
// 		</div>
// 	);
// };
// export default HeroSection;

import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import AnimatedTextWithHover from "@components/Animations/Text2";
import ModelCode from "@components/Home/Main/ModelJSX";
import { Footer } from "@components/Layout/Footer";
import LoadingScreen from "../../../pages/loading";

const HeroSection = () => {
	const [isLoaded, setIsLoaded] = useState(false); // Tracks if the content is fully loaded
	const [minimumTimePassed, setMinimumTimePassed] = useState(false); // Tracks if 2 seconds have passed

	// 1. Simulate page loading (set the loading state to true when the page is fully loaded)
	useEffect(() => {
		// Trigger the loading to complete once everything is loaded (Canvas onCreated or window load)
		const handleLoad = () => setIsLoaded(true);
		window.addEventListener('load', handleLoad);

		return () => window.removeEventListener('load', handleLoad); // Clean up the event listener
	}, []);

	// 2. Enforce a minimum of 2 seconds for the loading screen
	useEffect(() => {
		const timer = setTimeout(() => {
			setMinimumTimePassed(true);
		}, 2000); // Minimum of 2 seconds for loading screen

		return () => clearTimeout(timer); // Clean up the timer
	}, []);

	const isFullyLoaded = isLoaded && minimumTimePassed; // Content is fully loaded when both conditions are met

	return (
		<div className="w-screen fixed bg-black">
			{/* Loading Screen */}
			{!isFullyLoaded && (
				<LoadingScreen />
			)}

			{/* Main Content */}
			<motion.div
				className="relative"
				initial={{ opacity: 0 }}
				animate={{ opacity: isFullyLoaded ? 1 : 0 }}
				transition={{ duration: 1 }}
			>
				<section className="relative h-screen w-full overflow-hidden">
					<motion.div className="absolute inset-0 flex justify-center items-center transition duration-500 ease-in-out">
						<div className="lg:w-[150%] md:w-[200%] sm:w-[300%] xs:w-[300%] overflow-clip md:mt-44">
							<AnimatedNeonSvg />
						</div>
					</motion.div>

					<div className="absolute z-10 hover:z-50 hover:opacity-90 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/6 text-center">
						<AnimatedTextWithHover text="JHAWAR" />
					</div>

					<div className="pointer-events-none absolute z-40 h-96 bottom-0 w-full bg-gradient-to-t from-black to-transparent"></div>

					<Canvas
						camera={{ position: [0, 1.3, 3.2], fov: 35 }}
						gl={{ antialias: false }}
						style={{ background: 'transparent' }}
						className="pt-[3rem]"
						onCreated={() => setIsLoaded(true)} // Mark as loaded when the canvas is created
					>
						<ambientLight intensity={0.28} />
						<pointLight position={[-15, 0, 0]} color="#FF005D" intensity={200} />
						<pointLight position={[15, 0, 0]} color="#4BECE9" intensity={200} />
						<pointLight position={[0, 10, 0]} color="#FFFFFF" intensity={200} />
						<OrbitControls enableZoom={false} enableRotate={false} />
						<ModelCode />
					</Canvas>

					{/* Footer */}
					<Footer />

					{/* Black overlay for fade effect */}
					<div
						id="black-overlay"
						className="absolute z-50 inset-0 bg-black opacity-0 transition-opacity duration-1000"
						style={{ pointerEvents: 'none' }}
					></div>
				</section>
			</motion.div>
		</div>
	);
};

export default HeroSection;
