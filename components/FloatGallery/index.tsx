import React from 'react';
import { motion } from 'framer-motion';
import useMouseRotation from '@libs/hooks/useMouseRotation';
import useWindowHeight from '@libs/hooks/useWindowHeight';
import { FloatingProjects } from "../../data/projectData";
import FloatGalleryItem from "@components/FloatGallery/FloatItem";

const ITEMS_PER_ROW = 5;
const RADIUS = 380;
const Y_OFFSET_PER_ROW = 80;

const FloatGallery: React.FC = () => {
	const windowHeight = useWindowHeight();
	const { rotation, handleMouseMove } = useMouseRotation(windowHeight);

	if (windowHeight === null) return null;

	return (
		<div
			className="relative w-full h-[100vh] bg-[url('/images/wall5.webp')] bg-cover flex items-center justify-center"
			onMouseMove={handleMouseMove}
		>
			<motion.div
				className="relative w-full max-w-[1200px] h-[100vh] mx-auto"
				style={{
					perspective: 200,
					transformStyle: 'preserve-3d',
				}}
				animate={{
					perspective: 1000,
					rotateX: rotation.x, rotateY: rotation.y, rotateZ: 0 }}
				transition={{ type: 'spring', stiffness: 250, damping: 100 }}
			>
				{FloatingProjects.map((project, index) => {
					const rowIndex = Math.floor(index / ITEMS_PER_ROW);
					const itemsInThisRow = Math.min(ITEMS_PER_ROW, FloatingProjects.length - rowIndex * ITEMS_PER_ROW);
					const itemIndex = index % ITEMS_PER_ROW;

					const angle = (itemIndex / (itemsInThisRow - 1)) * Math.PI;
					let adjustedRadius = RADIUS + rowIndex * 150;
					if (itemIndex === Math.floor(itemsInThisRow / 2)) {
						adjustedRadius += 150;
					}

					const yOffset = rowIndex * Y_OFFSET_PER_ROW * 1.5;

					const isCenter = itemIndex === Math.floor(itemsInThisRow / 2);
					const tilt = isCenter ? 0 : (itemIndex < Math.floor(itemsInThisRow / 2) ? -25 : 25);

					if (itemsInThisRow === 1) {
						adjustedRadius = 0;
						const centeredYOffset = (windowHeight - 130) / 2 - yOffset;
						return (
							<FloatGalleryItem
								key={project.id}
								project={project}
								angle={angle}
								radius={adjustedRadius}
								yOffset={centeredYOffset}
								tilt={tilt}
							/>
						);
					}

					return (
						<FloatGalleryItem
							key={project.id}
							project={project}
							angle={angle}
							radius={adjustedRadius}
							yOffset={yOffset}
							tilt={tilt}
						/>
					);
				})}
				<div className="absolute inset-0 flex flex-col items-center justify-center z-1000">
					<h1 className="text-4xl md:text-6xl lg:text-5xl font-bold text-white text-center leading-tight">
						Explore<br />Our Projects
					</h1>
					<button
						onClick={() => {
							window.location.href = '/';
						}}
						className="z-40 px-6 py-3 bg-transparent/20 mt-20 backdrop-blur-md border-2 text-white font-semibold rounded-xl hover:bg-purple-800 focus:outline-none">
						Go Home
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default FloatGallery;
