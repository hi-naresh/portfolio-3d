// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
//
// interface FloatItemProps {
// 	project: {
// 		id: number;
// 		image: string;
// 		title: string;
// 	};
// 	angle: number;
// 	radius: number;
// 	yOffset: number;
// 	tilt: number;
// }
//
// const FloatItem: React.FC<FloatItemProps> = React.memo(({ project, angle, radius, yOffset, tilt }) => {
// 	const xOffset = Math.cos(angle) * radius;
// 	const yOffsetAdjusted = Math.sin(angle) * radius + yOffset;
//
// 	return (
// 		<motion.div
// 			className="absolute w-64 h-48 rounded-xl bg-transparent shadow-lg cursor-pointer overflow-hidden"
// 			style={{
// 				transform: `translate(${xOffset}px, ${yOffsetAdjusted}px) rotateY(${tilt}deg)`,
// 				left: '50%',
// 				top: '20%',
// 				transformStyle: 'preserve-3d',
// 				marginLeft: '-8rem',
// 				marginTop: '-6rem',
// 				zIndex: Math.floor(radius - yOffsetAdjusted),
// 			}}
// 			whileHover={{
// 				scale: 1.1,
// 				rotateX: 10,
// 				rotateY: tilt,
// 				transform: `translate(${xOffset}px, ${yOffsetAdjusted}px) rotateY(${tilt}deg) scale(1.1) rotateX(10deg)`,
// 				zIndex: 10,
// 			}}
// 			transition={{ type: 'spring', stiffness: 100 }}
// 		>
// 			<div style={{ height: '100%', width: '100%' }}>
// 				<Image
// 					src={project.image}
// 					alt={project.title}
// 					layout="fill"
// 					objectFit="cover"
// 					className="rounded-xl"
// 				/>
// 				<div className="absolute inset-0 bg-black backdrop-blur-md bg-opacity-20 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-700">
// 					{project.title}
// 				</div>
// 			</div>
// 		</motion.div>
// 	);
// });
//
// FloatItem.displayName = 'ProjectItem';
// export default FloatItem;


import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FloatGalleryItemProps {
	project: {
		id: number;
		image: string;
		title: string;
	};
	angle: number;
	radius: number;
	yOffset: number;
	tilt: number;
}

const FloatGalleryItem: React.FC<FloatGalleryItemProps> = ({ project, angle, radius, yOffset, tilt }) => {
	const xOffset = Math.cos(angle) * radius;
	const yOffsetAdjusted = Math.sin(angle) * radius + yOffset;

	return (
		<motion.div
			className="absolute w-64 h-32 p-1 rounded-lg glassmorphism shadow-lg cursor-pointer overflow-hidden"
			style={{
				transform: `translate(${xOffset}px, ${yOffsetAdjusted}px) rotateY(${tilt}deg)`,
				left: '50%',
				top: '20%',
				transformStyle: 'preserve-3d',
				marginLeft: '-8rem',
				marginTop: '-4rem',
				zIndex: Math.floor(radius - yOffsetAdjusted),
			}}
			whileHover={{
				scale: 1.1,
				rotateX: 10,
				rotateY: tilt,
				transform: `translate(${xOffset}px, ${yOffsetAdjusted}px) rotateY(${tilt}deg) scale(1.1) rotateX(10deg)`,
				zIndex: 10,
			}}
			transition={{ type: 'spring', stiffness: 100 }}
		>
			<div className="flex h-full w-full">
				{/* Left Image Section */}
				<div className="relative w-1/2 h-full rounded-l-lg overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						layout="fill"
						objectFit="cover"
						className="rounded-l-lg"
					/>
				</div>

				{/* Right Content Section */}
				<div className="flex flex-col justify-between p-2 w-1/2">
					{/* Title */}
					<h2 className="text-white text-sm font-semibold">{project.title}</h2>

					{/* Circle Buttons */}
					<div className="flex space-x-2 justify-end">
						<div className="w-3 h-3 bg-white/20 backdrop-filter backdrop-blur-lg rounded-full"></div>
						<div className="w-3 h-3 bg-white/20 backdrop-filter backdrop-blur-lg rounded-full"></div>
						<div className="w-3 h-3 bg-white/20 backdrop-filter backdrop-blur-lg rounded-full"></div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FloatGalleryItem;
