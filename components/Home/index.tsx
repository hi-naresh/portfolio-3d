import React, {useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import {Html, OrbitControls} from '@react-three/drei';
import {AnimatePresence, motion} from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import ModelCode from "@components/Home/Model";
import { Footer } from "@components/Layout/Footer";
import PopupDetails from "@components/Home/PopDetails";
import InfoContainer from "@components/Home/InfoBox";
import LoadingAnimation from "@components/Layout/loading";
import { frontPose} from "@libs/interactions/posing";
import {
	headMouseInteraction,
	headMouseInteractionHorizontal,
} from "@libs/interactions/interactions";
import MenuPortal from "@components/Home/Portal";
import PointerHandler from "@libs/hooks/PointerHandler";
import CameraAnimation from "@libs/hooks/CameraAnimation";
import useManualPerformanceMonitor from "@libs/hooks/usePerformanceMonitor";
import ExpandingButton from "@components/Common/ExpandingButton";

const HomeSection = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isMenuHovered, setIsMenuHovered] = useState(false);
	const [isMenuVisible, setMenuVisible] = useState(false);
	const [isPopupVisible, setPopupVisible] = useState(false);

	const { lowPerformance, message } = useManualPerformanceMonitor(30);

	useEffect(() => {
		const handleLoad = () => setIsLoaded(true);
		window.addEventListener('load', handleLoad);
		return () => window.removeEventListener('load', handleLoad);
	}, []);
	
	// Disable model interaction when hovering over the HTML menu
	const disableModelInteraction = () => {
		setIsMenuHovered(true); // Disable 3D interaction when menu is hovered
	};

	const enableModelInteraction = () => {
		setIsMenuHovered(false); // Re-enable 3D interaction
	};

	const onClick = () => {
		const blackOverlay = document.getElementById("black-overlay");
		if (blackOverlay) {
			blackOverlay.style.opacity = "1";
		}
		window.location.href = "/project/prodo";
	}
	
	return (
		<div className={`w-screen fixed ${isMenuVisible || isPopupVisible ? 'blue-vignette ' : 'vignette'} ease-in duration-700 `}>
			{!isLoaded && <LoadingAnimation/>}
			{/* Warning popup for low performance */}
			{lowPerformance && (
				<motion.div 
					initial={{scale: 0}}
					animate={{scale: 1}}
					exit={{scale: 0}}
					transition={{duration: 0.5}}
					className="fixed inset-0 z-50 md:mx-40 xs:mx-10 flex items-center justify-center bg-transparent ">
					<div className="glassmorphism text-center p-8 rounded-3xl shadow-lg">
						<h3 className="text-red-600 font-bold">Warning</h3>
						<p className={" md:line-clamp-3"}>{message}</p>
						<button
							className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
							onClick={() => window.alert("Sorry for the interruption, please consider switching to a higher-performance mode or view the site on High performance System for better experience.")}
						>
							Acknowledge
						</button>
					</div>
				</motion.div>
			)}
			<ExpandingButton isVisible={!isPopupVisible} isMenu={isMenuVisible} onClick={() => setMenuVisible(!isMenuVisible)} />

			<AnimatePresence>
			<motion.div
				className="relative h-screen w-full overflow-hidden"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: 1}}
			>
				<motion.div
					initial={{opacity: 0, y: 500}}
					animate={{opacity: 1, y: 0}}
					exit={{opacity: 0, y: 500}}
					transition={{duration: 1, ease: 'easeIn'}}
					className={`absolute inset-0 z-20`}
				>
					<Canvas
						camera={{fov: 35}}
						gl={{antialias: false}}
						style={{background: 'transparent'}}
						className="z-20"
						onCreated={() => setIsLoaded(true)}
					>
						{/*<Perf position="top-left" />*/}

						{/* 3D scene lighting */}
						{
							!isMenuVisible ? (
								<>
									<pointLight intensity={1.5} color="#197CE2" distance={10} decay={3}
												position={[0.920, 0.16, 0.960]}/>
									<pointLight intensity={1.8} color="#fff" distance={30} decay={2}
												position={[-0.2, -0.16, 3.060]}/>
									<directionalLight intensity={0.9} color="#197CE2"
													  position={[-0.320, 1.16, 0.90]}/>
								</>
							) : (
								<>
									<pointLight
										intensity={2}
										color="#fff"
										distance={30}
										decay={3}
										position={[-1.92, 0.16, 0]}
									/>
									<pointLight
										intensity={1.5}
										color="#197CE2"
										distance={20}
										decay={3}
										position={[0.92, 0.16, 0.96]}
									/>
									<directionalLight
										intensity={0.9}
										color="#197CE2"
										position={[0.32, 0, -1]}
									/>
								</>
							)
						}

						{
							isPopupVisible && (
								<>
									<pointLight intensity={10} color="#197CE2" distance={10} decay={3}
												position={[0.920, 0.16, 0.960]}/>
									<pointLight intensity={1.8} color="#fff" distance={30} decay={2}
												position={[-0.2, -0.16, 3.060]}/>
									<directionalLight intensity={0.9} color="#197CE2"
													  position={[-0.320, 1.16, 0.90]}/>
								</>
							)
						}


						{/* Custom pointer handler to handle mouse movements */}
						{
							isMenuVisible && (
								<>
									<PointerHandler isMenuHovered={isMenuHovered}/>
									<Html
										occlude
										style={{
											width: '100%',
											height: '100%',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										pointerEvents="auto"
										onPointerOver={disableModelInteraction}
										onPointerOut={enableModelInteraction}
									>
										{/* MenuPortal positioned in the center */}
										<div className="flex items-center justify-center w-full h-full">
											<MenuPortal/>
										</div>
									</Html>
								</>
							)
						}

						{/*<CameraAnimation menuVisible={!isMenuVisible}/>*/}
						<CameraAnimation menuVisible={!isMenuVisible} popupVisible={isPopupVisible} />

						{/* Orbit controls */}
						<OrbitControls enablePan={false} enableZoom={false} enableRotate={false}/>

						{/* 3D Model */}
						<ModelCode
							visibleRing={isPopupVisible}
							position={[0, 0, 0]}
							onToolTip={!isMenuVisible}
							play={true}
							onGlassClick={isMenuVisible ? undefined : onClick}
							customPose={frontPose}
							customInteraction={
								isMenuVisible ? headMouseInteractionHorizontal : headMouseInteraction
							}
							props={undefined}
							onPopupTrigger={
								isMenuVisible ? () => {
									} :
									() => setPopupVisible(true)
							}
							customAnimation={undefined}/>
					</Canvas>
				</motion.div>
				{!isMenuVisible && !isPopupVisible && (
					<HeroBG/>
				)}
				{/* Footer Animation */}
				{
					!isMenuVisible && isPopupVisible && (
						<PopupDetails setPopupVisible={setPopupVisible}/>
					)
				}

				{!isMenuVisible && !isPopupVisible && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5, delay: 1.5}}
						className="absolute w-screen top-0 right-0 z-20"
					>
						<InfoContainer/>
					</motion.div>
				)}

				{
					!isMenuVisible && (
						<motion.div
							initial={{y: 100, opacity: 0}}
							animate={{y: 0, opacity: 1}}
							exit={{y: 100, opacity: 0}}
							transition={{duration: 0.8, delay: 1.5, ease: "easeIn"}}
							className="absolute bottom-0 w-full z-50"
						>
							<Footer isFade={!isPopupVisible} isVisible={!isMenuVisible && !isPopupVisible}/>
						</motion.div>
					)
				}

			</motion.div>
			</AnimatePresence>

			<div
				id="black-overlay"
				className="absolute z-50 inset-0 bg-black opacity-0 transition-opacity duration-1000"
				style={{pointerEvents: 'none'}}
			></div>

		</div>
	);
};

const HeroBG = () => {
	return (
		<motion.div
			className="absolute inset-0 z-0"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration: 1}}
		>
			<div className="relative h-screen w-full overflow-hidden">
				<motion.div
					initial={{opacity: 0, scale: 0.15, y: 1000}}
					animate={{opacity: 1, scale: 1, y: 0}}
					exit={{opacity: 0, scale: 0.15, y: 1000}}
					transition={{duration: 0.6, ease: "easeOut", delay: 0.5}} // Delay for Neon
					className="absolute inset-0 flex justify-center items-center transition duration-500 ease-in-out"
				>
					<div
						className="lg:w-[100%] xl:w-[100%] xl:scale-100 lg:scale-[140%] md:w-[200%] md:scale-[460%] sm:w-[100%] xs:w-[100%] sm:scale-[160%] xs:scale-[160%] overflow-clip xs:-mt-40 md:mt-44">
						<AnimatedNeonSvg/>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default HomeSection;