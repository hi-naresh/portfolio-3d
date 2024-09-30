"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useParallaxEffect from "@libs/hooks/useParallaxEffect";
import projects from "../../data/projects";
import ProjectCard from "@components/Card";
import Header from "@components/Layout/Header";
import NavControls from "@components/Gallery/NavControls";
import MobileProjectSlider from "@components/Gallery/MobileSlider";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const Gallery3D: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(2); // Active card index
	const [initialLoad, setInitialLoad] = useState(true);
	const handleMouseMove = useParallaxEffect(); // Mouse movement for parallax
	// const [lightsOn, setLightsOn] = useState(true); // State for lights on/off
	// const toggleLights = () => setLightsOn((prevState) => !prevState); // Function to toggle lights
	const isMobile = useIsMobile();


	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
	}, []);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
	}, []);

	// Get position and styling for each card
	const getPosition = useMemo(() => {
		return (index: number) => {
			const offset = index - currentIndex;
			if (offset === 0) {
				// Active card
				return { translateX: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0, translateZ: 0 };
			}
			if (offset === -1 || (offset === projects.length - 1 && currentIndex === 0)) {
				// Left card
				return { translateX: -600, scale: 0.8, zIndex: 5, opacity: 0.9, rotateY: 60, translateZ: -380 };
			}
			if (offset === 1 || (offset === -(projects.length - 1) && currentIndex === projects.length - 1)) {
				// Right card
				return { translateX: 600, scale: 0.8, zIndex: 5, opacity: 0.9, rotateY: -60, translateZ: -380 };
			}
			// Hidden cards
			return { translateX: 0, scale: 0, zIndex: 1, opacity: 0, rotateY: 0, translateZ: 0 };
		};
	}, [currentIndex]);

	useEffect(() => setInitialLoad(false), []);

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1 },
			}}
			transition={{ duration: 1, ease: "easeOut" }}
			className="relative w-full h-screen flex items-center justify-center bg-black bg-cover bg-center overflow-hidden"
		>
			{/* Background Image */}
			<motion.div
				initial={{ opacity: 0.05 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 4, ease: "easeInOut" }}
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/images/wall5.webp')",
					background: "url('/images/wall5.webp') center/cover",
					backgroundPosition: `var(--parallaxBgX) var(--parallaxBgY)`,
					backgroundSize: "115%",
				}}
			/>
			<Header />

			{isMobile ?(
				<MobileProjectSlider  />
			): (
				<motion.div
					className="relative w-full max-w-[100%] h-[600px] flex items-center justify-center overflow-hidden z-10"
					style={{perspective: "900px", transformStyle: "preserve-3d"}}
				>
					{/* Cards Slider */}
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							position={getPosition(index)}
							isActive={index === currentIndex} // Check if card is active
							initialLoad={initialLoad}
						/>
					))}
				</motion.div>
			)}

			{/* Lights On/Off Button */}
			{/*<button*/}
			{/*	onClick={toggleLights}*/}
			{/*	className="absolute bottom-10 right-10 bg-white text-black px-4 py-2 rounded-lg z-20"*/}
			{/*>*/}
			{/*	{lightsOn ? "Turn Lights Off" : "Turn Lights On"}*/}
			{/*</button>*/}

			{/* Navigation Controls */}
			{!isMobile && (
				<NavControls nextSlide={nextSlide} prevSlide={prevSlide} currentIndex={currentIndex}/>
			)}
		</motion.div>
	);
};

export default Gallery3D;
