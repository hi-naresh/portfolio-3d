import React, { memo } from "react";
import { motion } from "framer-motion";
import { CardContainer } from "@components/ui/3d-card";
import CardDetails from "@components/Card/CardDetails";

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
	isActive: boolean;
	initialLoad: boolean;
}

// eslint-disable-next-line react/display-name
const ProjectCardSlider: React.FC<ProjectCardProps> = memo(({ project, position, isActive, initialLoad }) => (
	<motion.div
		className={`absolute glassmorphism ${position.zIndex === 10 ? 'opacity-100' : 'opacity-0'} rounded-4xl bg-white bg-opacity-5 project-card`}
		initial={{
			opacity: initialLoad ? 0 : 1,
			scale: initialLoad ? 0.8 : position.scale,
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
			stiffness: 180,
			damping: 24,
			mass: 0.6,
			duration: 0.6,
			delay: initialLoad ? position.zIndex * 0.08 : 0,
		}}
		style={{
			width : isActive ? "620px" : "420px",
			height: isActive ? "90%" : "100%",
			zIndex: position.zIndex,
			display: "flex",
		}}
	>
		{isActive? (
				<CardContainer className="w-full h-[60vh]  ">
					<CardDetails isDetail={true} project={project}/>
				</CardContainer>)
				:(<div className="flex w-full h-[97%] hover:scale-105 hover:border-2 hover:border-white/60 hover:rounded-4xl opacity-70 hover:opacity-100">
					<CardDetails isDetail={false} project={project}/>
				</div>)}
	</motion.div>
));


export default ProjectCardSlider;


// import React, { memo } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { CardBody, CardContainer, CardItem } from "../ui/3d-card"; // Import your 3D card components
//
// interface ProjectCardProps {
// 	project: {
// 		id: number;
// 		image: string;
// 		title: string;
// 		description: string;
// 		tech: string;
// 		link: string;
// 	};
// 	position: {
// 		translateX: number;
// 		scale: number;
// 		zIndex: number;
// 		opacity: number;
// 		rotateY: number;
// 		translateZ: number;
// 	};
// 	isActive: boolean; // New prop to check if this is the active card
// 	initialLoad: boolean;
// }
//
// const ProjectCard = (({ project, position, isActive, initialLoad }) => (
// 	<motion.div
// 		className={`absolute ${isActive ? 'group/card active ' : ''}`}
// 		initial={{
// 			opacity: initialLoad ? 0 : 1,
// 			scale: initialLoad ? 0.8 : position.scale,
// 			x: 0,
// 			rotateY: 0,
// 			zIndex: 1,
// 		}}
// 		animate={{
// 			x: position.translateX,
// 			scale: position.scale,
// 			opacity: position.opacity,
// 			rotateY: position.rotateY,
// 			z: position.translateZ,
// 			zIndex: position.zIndex,
// 		}}
// 		exit={{ opacity: 0, scale: 0.9 }}
// 		transition={{
// 			type: "spring",
// 			stiffness: 180,
// 			damping: 24,
// 			mass: 0.6,
// 			duration: 0.6,
// 			delay: initialLoad ? position.zIndex * 0.08 : 0,
// 		}}
// 		style={{ 
// 			perspective: "1000px", transformStyle: "preserve-3d", width: "30rem", height: "auto" }}
// 	>
// 		<CardContainer className="inter-var">
// 			<CardBody className="bg-white bg-opacity-10 relative group/card border-black/[0.1] w-full h-auto rounded-3xl p-6 border">
// 				{/* Title with 3D pop effect for active card */}
// 				<CardItem
// 					translateZ={isActive ? "50" : "0"} // Only the active card has the pop effect
// 					className="text-xl font-bold text-neutral-600 dark:text-white"
// 				>
// 					{project.title}
// 				</CardItem>
//
// 				{/* Description */}
// 				<CardItem
// 					as="p"
// 					translateZ={isActive ? "60" : "0"} // Only the active card has the pop effect
// 					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
// 				>
// 					{project.description}
// 				</CardItem>
//
// 				{/* Image with 3D effect for active card */}
// 				<CardItem translateZ={isActive ? "100" : "0"} className="w-full mt-4">
// 					<Image
// 						src={project.image}
// 						height="1000"
// 						width="1000"
// 						className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
// 						alt={project.title}
// 					/>
// 				</CardItem>
//
// 				{/* Tech Stack */}
// 				<CardItem
// 					translateZ={isActive ? "60" : "0"}
// 					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
// 				>
// 					Tech Used: {project.tech}
// 				</CardItem>
//
// 				{/* Buttons */}
// 				<div className="flex justify-between items-center mt-20">
// 					<CardItem
// 						translateZ={isActive ? "20" : "0"}
// 						as={Link}
// 						href={project.link}
// 						target="__blank"
// 						className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
// 					>
// 						Visit →
// 					</CardItem>
// 					<CardItem
// 						translateZ={isActive ? "20" : "0"}
// 						as="button"
// 						className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
// 					>
// 						Sign up
// 					</CardItem>
// 				</div>
// 			</CardBody>
// 		</CardContainer>
// 	</motion.div>
// ));
//
// export default ProjectCard;
