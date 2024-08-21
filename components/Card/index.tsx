import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";

interface ProjectCardProps {
	project: {
		id: number;
		image: string;
		title: string;
		description: string;
		tech: string;
		link: string;
	};
	position: {
		translateX: number;
		scale: number;
		zIndex: number;
		opacity: number;
		rotateY: number;
		translateZ: number;
	};
	initialLoad: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, position, initialLoad }) => (
	<motion.div
		className={`absolute glassmorphism ${position.zIndex === 10 ? '' : 'opacity-0'} rounded-4xl shadow-lg overflow-hidden bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg project-card`}
		initial={{
			opacity: initialLoad ? 0 : 1,
			scale: initialLoad ? 0.2 : position.scale,
			x: 0,
			rotateY: 0,
			zIndex: 1,
		}}
		animate={{
			x: position.translateX,
			scale: position.scale,
			opacity: position.opacity,
			rotateY: position.rotateY,
			z: position.translateZ,
			zIndex: position.zIndex,
		}}
		exit={{ opacity: 0, scale: 0.9 }}
		transition={{
			type: "spring",
			stiffness: 250, // Reduced stiffness slightly to smooth out the animation
			damping: 25,
			mass: 0.5,
			duration: 0.5,
			delay: initialLoad ? position.zIndex * 0.1 : 0,
		}}
		style={{
			width: "620px",
			height: "90%",
			zIndex: position.zIndex,
			transformStyle: "preserve-3d",
			display: "flex",
		}}
	>
		<div className="relative w-1/2 h-full rounded-l-2xl overflow-hidden">
			<Image
				src={project.image}
				alt={project.title}
				layout="fill"
				objectFit="cover"
				className="rounded-l-2xl"
				priority // Use priority to ensure images load before animation
			/>
		</div>
		<div className="w-1/2 p-6 flex flex-col justify-center space-y-4">
			<div className="glassmorphism bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl p-4 rounded-2xl">
				<h2 className="text-white text-xl font-semibold">{project.title}</h2>
			</div>
			<div className="glassmorphism bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl p-4 rounded-2xl">
				<p className="text-white text-sm">{project.description}</p>
			</div>
			<div className="glassmorphism bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl p-4 rounded-2xl">
				<span className="text-white text-sm">Tech Used: {project.tech}</span>
			</div>
			<div className="flex space-x-4 justify-center">
				<button className="glass-button p-3 rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
					<img className="w-6 h-6 filter invert" src="/icons/site/icon8.svg" />
				</button>
				<button className="glass-button p-3 rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
					<img className="w-6 h-6 filter invert " src="/icons/site/icon7.svg" />
				</button>
				<Link href={project.link} className="glass-button p-3 rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
					<img className="w-6 h-6 filter text-white" src="/icons/site/icon6.svg" />
				</Link>
			</div>
		</div>
	</motion.div>
));

export default ProjectCard;
