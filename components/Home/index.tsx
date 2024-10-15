import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedNeonSvg from "@components/Animations/Neon";
import AnimatedTextWithHover from "@components/Animations/Text2";
import ModelCode from "@components/Home/Model";
import { Footer } from "@components/Layout/Footer";
import PopupDetails from "@components/Home/PopDetails";
import InfoContainer from "@components/Home/InfoBox";

const HeroSection = () => {
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	return (
		<div className="w-screen fixed bg-black">
			{/* Main Content */}
			<motion.div
				className="relative"
				initial={{ opacity: 0 }}
				animate={{ opacity:  1 }}
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
						camera={{position: [0, 1.3, 3.2], fov: 35}}
						gl={{antialias: false}}
						style={{background: 'transparent'}}
						className="pt-[3rem]"
						onCreated={() => setIsLoaded(true)} // Mark as loaded when the canvas is created
					>
						{/*<ambientLight intensity={0.28} />*/}
						<pointLight intensity={1.5} color="#197CE2" distance={10} decay={3}
									position={[0.920, 0.16, 0.960]}/>
						<pointLight intensity={1.8} color="#fff" distance={30} decay={2}
									position={[-0.2, -0.16, 3.060]}/>
						<directionalLight intensity={0.9} color="#197CE2" 
									position={[-0.320, 1.16, 0.90]}/>
						<OrbitControls enableZoom={false} enableRotate={false}/>
						{/*<ModelCode/>*/}
						<ModelCode onPopupTrigger={() => setPopupVisible(true)} props={undefined} />
						{/*<EffectComposer>*/}
						{/*	<Noise opacity={0.01} />*/}
						{/*</EffectComposer>*/}
					</Canvas>
					{isPopupVisible && (
						<PopupDetails setPopupVisible={setPopupVisible}/>
					)}

					<div className={"absolute w-screen top-0 right-0 z-50"}>
						<InfoContainer />
					</div>
					
					{/* Footer */}
					<Footer/>

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
