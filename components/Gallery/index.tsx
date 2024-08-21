import React, {useCallback, useEffect, useMemo, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useParallaxEffect from "@libs/hooks/useParallaxEffect";
import projects from "../../data/projects";
import ProjectCard from "@components/Card";
import Header from "@components/Layout/Header";
import NavControls from "@components/Gallery/NavControls";
import GradientBlob from "@components/Siri";

const Gallery3D: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(2);
	const [initialLoad, setInitialLoad] = useState(true);
	const handleMouseMove = useParallaxEffect();

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
	}, []);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
	}, []);

	const getPosition = useMemo(() => {
		return (index: number) => {
			const offset = index - currentIndex;
			if (offset === 0) return { translateX: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0, translateZ: 0 };
			if (offset === -1 || (offset === projects.length - 1 && currentIndex === 0))
				return { translateX: -650, scale: 0.8, zIndex: 5, opacity: 0.7, rotateY: 60, translateZ: -380 };
			if (offset === 1 || (offset === -(projects.length - 1) && currentIndex === projects.length - 1))
				return { translateX: 650, scale: 0.8, zIndex: 5, opacity: 0.7, rotateY: -60, translateZ: -380 };
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
			{/* Background Image Fade-in */}
			<motion.div
				initial={{ opacity: 0.05 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 4, ease: "easeInOut" }} // Long duration for the "lights turning on" effect
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: "url('/images/wall5.webp')",
					backgroundPosition: `var(--parallaxBgX) var(--parallaxBgY)`,
					backgroundSize: "115%",
				}}
			/>

			{/* Content */}
			<Header />
			<motion.div
				className="relative w-full max-w-[100%] h-[600px] flex items-center justify-center overflow-hidden z-10"
				style={{
					perspective: "1000px",
					transformStyle: "preserve-3d",
				}}
			>
				<AnimatePresence>
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} position={getPosition(index)} initialLoad={initialLoad} />
					))}
				</AnimatePresence>
			</motion.div>
			<NavControls nextSlide={nextSlide} prevSlide={prevSlide} currentIndex={currentIndex} />
			<div>
				<GradientBlob size={200} />
			</div>
		</motion.div>
	);
};

export default Gallery3D;
