import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import Model from "@components/Home/Main/Model";
import ThreeDText from "@components/Animations/Text";
import AnimatedTextWithHover from "@components/Animations/Text2";

const HeroSection = () => {
	// const images = [
	// 	'/images/projects/work1.webp',
	// 	'/images/projects/work2.webp',
	// 	'/images/projects/work3.webp',
	// 	'/images/projects/work4.webp',
	// 	'/images/projects/work5.webp',
	// 	'/images/projects/work6.webp',
	// ];
	
	return (
		<section className="relative h-screen w-full overflow-hidden ">

			<motion.div
				className="absolute inset-0 flex justify-center items-center transition duration-500 ease-in-out"
			>
				<div 
					className="w-[150%] mt-44" 
				>
					<AnimatedNeonSvg/>
				</div>
			</motion.div>
			<div className="absolute w-full h-screen flex justify-center items-center">
				<ThreeDText/>
			</div>
			<div
				className="absolute z-10 hover:z-50 hover:opacity-90 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/6 text-center  ">
				<AnimatedTextWithHover text="Jhawar" 
					// imageUrls={images}
				/>
			</div>
			<div
				className="pointer-events-none absolute z-40 h-96 bottom-0 w-full bg-gradient-to-t from-black to-transparent  "></div>
			
			<Canvas
				camera={{
					position: [0, 1.75, 3],
					fov: 35
				}}
				style={{
					background: 'transparent',
				}} 
			>
				<ambientLight intensity={0.7}/>
				<pointLight position={[-15, 0, 5]} color="#FF005D" intensity={200}/>
				<pointLight position={[15, 0, 5]} color="#4BECE9" intensity={200}/>
				<OrbitControls enableZoom={false} enableRotate={false}/>
				<Model url="/model/model.glb"/>
			</Canvas>
			{/* Black overlay for fade to black effect */}
			<div
				id="black-overlay"
				className="absolute z-50 inset-0 bg-black opacity-0 transition-opacity duration-1000"
				style={{pointerEvents: 'none'}}
			></div>
		</section>
	);
};
export default HeroSection;




