import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import AnimatedTextWithHover from "@components/Animations/Text2";
import ModelCode from "@components/Home/Model";
import { Footer } from "@components/Layout/Footer";
import LoadingScreen from "../Layout/loading";

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
		}, 3000); // Minimum of 2 seconds for loading screen

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
						<div className="lg:w-[100%] xl:w-[100%] xl:scale-100 lg:scale-[140%] md:w-[200%] md:scale-[460%] sm:w-[100%] xs:w-[100%] sm:scale-[160%] xs:scale-[160%] overflow-clip xs:-mt-40 md:mt-44">
							<AnimatedNeonSvg />
							{/*/!*<img src={"/images/neon.svg"} />*!/*/}
							{/*{*/}
							{/*	isMobile ? <img src={"/images/neon.svg"} /> : <AnimatedNeonSvg />*/}
							{/*}*/}
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
						{/*<ambientLight intensity={0.28} />*/}
						<pointLight position={[-5, 0, 0]} color="#47709c" intensity={100} />
						<pointLight position={[5, 10, -5]} color="#47709c" intensity={200} />
						{/*<pointLight position={[0, 10, 0]} color="#FFFFFF" intensity={200} />*/}
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
