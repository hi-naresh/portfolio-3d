import React, { useEffect, useState} from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import ModelCode from "@components/Home/Model";
import { Footer } from "@components/Layout/Footer";
import PopupDetails from "@components/Home/PopDetails";
import InfoContainer from "@components/Home/InfoBox";
import LoadingAnimation from "@components/Layout/loading";
import {customPose, sidePose} from "@libs/interactions/posing";
import {headMouseInteraction} from "@libs/interactions/interactions";

const HeroSection = () => {
	const [isLoaded, setIsLoaded] = useState(false); 
	const [isPopupVisible, setPopupVisible] = useState(false);

	// 1. Simulate page loading (set the loading state to true when the page is fully loaded)
	useEffect(() => {
		// Trigger the loading to complete once everything is loaded (Canvas onCreated or window load)
		const handleLoad = () => setIsLoaded(true);
		window.addEventListener('load', handleLoad);

		return () => window.removeEventListener('load', handleLoad);
	}, [
	]);

	return (
		<div className="w-screen fixed bg-black">
			{!isLoaded && (
					<LoadingAnimation/>
			)}
			<motion.div
				className="relative"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 1}}
			>
				<section className="relative h-screen w-full overflow-hidden">
					<motion.div
						initial={{opacity: 0, y:500}}
						animate={{opacity: 1,y:0}}
						exit={{opacity: 0,y:500}}
						transition={{duration: 1,ease: "easeIn"}}
						className={`absolute inset-0 z-10`}
					>
						<Canvas
							camera={{position: [0, 1.3, 3.2], fov: 35}}
							gl={{antialias: false}}
							style={{background: 'transparent'}}
							className="z-0 pt-[3rem]"
							onCreated={() => setIsLoaded(true)} // Mark as loaded when the canvas is created
						>
							<pointLight intensity={1.5} color="#197CE2" distance={10} decay={3}
										position={[0.920, 0.16, 0.960]}/>
							<pointLight intensity={1.8} color="#fff" distance={30} decay={2}
										position={[-0.2, -0.16, 3.060]}/>
							<directionalLight intensity={0.9} color="#197CE2"
											  position={[-0.320, 1.16, 0.90]}/>
							<OrbitControls enableZoom={false} enableRotate={false}/>
							<ModelCode customPose={customPose}
									   customInteraction={headMouseInteraction}
									   onPopupTrigger={() => setPopupVisible(true)}
									   props={undefined}/>
							{/*<ModelCode onPopupTrigger={() => setPopupVisible(true)} props={undefined}/>*/}
						</Canvas>
					</motion.div>
					
					<motion.div
						initial={{opacity: 0, scale: 0.25,y:500}}
						animate={{opacity: 1, scale: 1,y:0}}
						exit={{opacity: 0, scale: 0.25,y:500}}
						transition={{duration: 0.6, ease: "easeOut", delay: 0.5}} // Delay for Neon
						className="absolute inset-0 flex justify-center items-center transition duration-500 ease-in-out"
					>
						<div
							className="lg:w-[100%] xl:w-[100%] xl:scale-100 lg:scale-[140%] md:w-[200%] md:scale-[460%] sm:w-[100%] xs:w-[100%] sm:scale-[160%] xs:scale-[160%] overflow-clip xs:-mt-40 md:mt-44">
							<AnimatedNeonSvg/>
						</div>
					</motion.div>

					{/* Footer Animation */}
					<motion.div
						initial={{y: 100, opacity: 0}}
						animate={{y: 0, opacity: 1}}
						exit={{y: 100, opacity: 0}}
						transition={{duration: 0.8, delay: 1.5,ease: "easeIn"}}
						className="absolute bottom-0 w-full z-50"
					>
						<Footer isVisible={!isPopupVisible}/>
					</motion.div>

					{/* Info Container Animation (after Footer) */}
					{!isPopupVisible && (
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							transition={{duration: 0.5, delay: 1.5}}
							className="absolute w-screen top-0 right-0 z-10"
						>
							<InfoContainer/>
						</motion.div>
					)}
					
					{isPopupVisible && (
						<PopupDetails setPopupVisible={setPopupVisible}/>
					)}
					{/*{!isPopupVisible && (*/}
					{/*	<div className={"absolute w-screen top-0 right-0 z-0"}>*/}
					{/*		<InfoContainer/>*/}
					{/*	</div>*/}
					{/*)}*/}
					{/*<motion.div*/}
					{/*	initial={{y: 100}}*/}
					{/*	animate={{y: 0}}*/}
					{/*	exit={{y: 100}}*/}
					{/*	transition={{duration: 1, delay: 0.5}}*/}
					{/*	className="absolute bottom-0 w-full z-0"*/}
					{/*>*/}
					{/*	<Footer isVisible={!isPopupVisible}/>*/}
					{/*</motion.div>*/}
					
					{/* Black overlay for fade effect */}
					<div
						id="black-overlay"
						className="absolute z-50 inset-0 bg-black opacity-0 transition-opacity duration-1000"
						style={{pointerEvents: 'none'}}
					></div>
				</section>
			</motion.div>
		</div>
	);
};

export default HeroSection;
