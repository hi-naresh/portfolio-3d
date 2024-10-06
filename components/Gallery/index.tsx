// "use client";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import useParallaxEffect from "@libs/hooks/useParallaxEffect";
// import projectData from "../../data/projectData";
// import ProjectCard from "@components/Card";
// import Header from "@components/Layout/Header";
// import NavControls from "@components/Gallery/NavControls";
// import MobileProjectSlider from "@components/Gallery/MobileSlider";
// import {useIsMobile} from "@libs/hooks/useIsMobile";
// import {EmblaOptionsType} from "embla-carousel";
//
// interface Gallery3DProps {
// 	initialIndex?: number;
// }
//
// const Gallery3D: React.FC<Gallery3DProps> = ({ initialIndex = 0 }) => {
// 	const [currentIndex, setCurrentIndex] = useState(initialIndex); 
// 	const [initialLoad, setInitialLoad] = useState(true);
// 	const handleMouseMove = useParallaxEffect();  // Mouse movement for parallax
// 	const isMobile = useIsMobile();
// 	const OPTIONS: EmblaOptionsType = { loop: true };
//
// 	const nextSlide = useCallback(() => {
// 		setCurrentIndex((prevIndex) => (prevIndex + 1) % projectData.length);
// 	}, []);
//
// 	const prevSlide = useCallback(() => {
// 		setCurrentIndex((prevIndex) => (prevIndex - 1 + projectData.length) % projectData.length);
// 	}, []);
//
// 	const getPosition = useMemo(() => {
// 		return (index: number) => {
// 			const offset = index - currentIndex;
// 			if (offset === 0) {
// 				// Active card
// 				return { translateX: 0, scale: isMobile ? 0.9 : 1, zIndex: 10, opacity: 1, rotateY: 0, translateZ: 0 };
// 			}
// 			if (offset === -1 || (offset === projectData.length - 1 && currentIndex === 0)) {
// 				// Left card
// 				return { translateX: isMobile ? -200 : -600, scale: isMobile ? 0.5 : 0.8, zIndex: 5, opacity: 0.9, rotateY: 60, translateZ: -380 };
// 			}
// 			if (offset === 1 || (offset === -(projectData.length - 1) && currentIndex === projectData.length - 1)) {
// 				// Right card
// 				return { translateX: isMobile ? 200 : 600, scale: isMobile ? 0.5 : 0.8, zIndex: 5, opacity: 0.9, rotateY: -60, translateZ: -380 };
// 			}
// 			// Hidden cards
// 			return { translateX: 0, scale: 0, zIndex: 1, opacity: 0, rotateY: 0, translateZ: 0 };
// 		};
// 	}, [
// 		currentIndex,
// 		isMobile,
// 	]);
//
// 	useEffect(() => setInitialLoad(false), []);
//
// 	return (
// 		<motion.div
// 			onMouseMove={handleMouseMove}
// 			initial="hidden"
// 			animate="visible"
// 			variants={{
// 				hidden: { opacity: 0 },
// 				visible: { opacity: 1 },
// 			}}
// 			transition={{ duration: 1, ease: "easeOut" }}
// 			className="relative w-full h-screen flex items-center justify-center bg-black bg-cover bg-center overflow-hidden"
// 		>
// 			{/* Background Image */}
// 			<motion.div
// 				initial={{ opacity: 0.05 }}
// 				animate={{ opacity: 1 }}
// 				transition={{ duration: 4, ease: "easeInOut" }}
// 				className="absolute inset-0 z-0"
// 				style={{
// 					backgroundImage: "url('/images/wall5.webp')",
// 					background: "url('/images/wall5.webp') center/cover",
// 					backgroundPosition: `var(--parallaxBgX) var(--parallaxBgY)`,
// 					backgroundSize: isMobile ? "300%" : "115%",
// 					backgroundRepeat: "no-repeat",
// 				}}
// 			/>
// 			<Header 
//
// 			 handleContactClick={
// 				() => {
// 					window.open("/contact", "_self");
// 				}
// 			 }
// 			/>
//
// 			{isMobile ? (
// 				<MobileProjectSlider slides={projectData} options={OPTIONS} isMobile />
// 			) : (
// 				<motion.div
// 					className="relative w-full max-w-[100%] h-[600px] flex items-center justify-center overflow-hidden z-10"
// 					style={{ perspective: "900px", transformStyle: "preserve-3d" }}
// 				>
// 					{/* Cards Slider */}
// 					{projectData.map((project, index) => (
// 						<ProjectCard
// 							key={project.id}
// 							currentIndex={currentIndex}
// 							project={project}
// 							isPrev={index === (currentIndex - 1 + projectData.length) % projectData.length}
// 							nextSlide={nextSlide}
// 							prevSlide={prevSlide}
// 							position={getPosition(index)}
// 							isActive={index === currentIndex} // Check if card is active
// 							initialLoad={initialLoad}
// 						/>
// 					))}
// 				</motion.div>
// 			)}
//
// 			{!isMobile && <NavControls nextSlide={nextSlide} prevSlide={prevSlide} currentIndex={currentIndex} />}
// 		</motion.div>
// 	);
// };
//
// export default Gallery3D;

"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useParallaxEffect from "@libs/hooks/useParallaxEffect";
import projectData from "../../data/projectData";
import ProjectCard from "@components/Card";
import Header from "@components/Layout/Header";
import NavControls from "@components/Gallery/NavControls";
import MobileProjectSlider from "@components/Gallery/MobileSlider";
import { useIsMobile } from "@libs/hooks/useIsMobile";
import { EmblaOptionsType } from "embla-carousel";
import ContactForm from "@components/Contact/ContactForm";
import ThreeSixtyBackground from "@components/Gallery/MotionBg";

interface Gallery3DProps {
    initialIndex?: number;
}

const Gallery3D: React.FC<Gallery3DProps> = ({ initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [showContact, setShowContact] = useState(false); // To toggle between gallery and contact form
    const [isDisappeared, setIsDisappeared] = useState(false); // Control slider/nav disappearance
    const [initialLoad, setInitialLoad] = useState(true);

    const handleMouseMove = useParallaxEffect(); // Mouse movement for parallax
    const isMobile = useIsMobile();
    const OPTIONS: EmblaOptionsType = { loop: true };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectData.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projectData.length) % projectData.length);
    }, []);

    const getPosition = useMemo(() => {
        return (index: number) => {
            const offset = index - currentIndex;
            if (offset === 0) {
                // Active card
                return {
                    translateX: 0,
                    scale: isMobile ? 0.9 : 1,
                    zIndex: 10,
                    opacity: 1,
                    rotateY: 0,
                    translateZ: 0,
                };
            }
            if (offset === -1 || (offset === projectData.length - 1 && currentIndex === 0)) {
                // Left card
                return {
                    translateX: isMobile ? -200 : -600,
                    scale: isMobile ? 0.5 : 0.8,
                    zIndex: 5,
                    opacity: 0.9,
                    rotateY: 60,
                    translateZ: -380,
                };
            }
            if (offset === 1 || (offset === -(projectData.length - 1) && currentIndex === projectData.length - 1)) {
                // Right card
                return {
                    translateX: isMobile ? 200 : 600,
                    scale: isMobile ? 0.5 : 0.8,
                    zIndex: 5,
                    opacity: 0.9,
                    rotateY: -60,
                    translateZ: -380,
                };
            }
            // Hidden cards
            return { translateX: 0, scale: 0, zIndex: 1, opacity: 0, rotateY: 0, translateZ: 0 };
        };
    }, [currentIndex, isMobile]);

    // Toggle between contact form and gallery
    const handleContactClick = () => {
        setIsDisappeared(true); // Make slider disappear first
        setTimeout(() => {
            setShowContact(true); // Show contact form after slider disappears
        }, 800); // Delay to sync with slider exit animation
    };
    
    const goBack = () => {
        setIsDisappeared(true);
        //make everything disappear with black bg
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    }
    

    const handleCloseContact = () => {
        setShowContact(false); // Hide contact form first
        setTimeout(() => {
            setIsDisappeared(false); // Show slider and navbar after contact form disappears
        }, 600); // Delay re-showing the gallery
    };

    useEffect(() => setInitialLoad(false), []);


    return (
        <ThreeSixtyBackground>
            <motion.div
                onMouseMove={handleMouseMove}
                initial="hidden"
                animate="visible"
                // variants={{
                //     hidden: {opacity: 0},
                //     visible: {opacity: 1},
                // }}
                transition={{duration: 1, ease: "easeOut"}}
                className="relative vignette w-full h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background Image */}

                <motion.div
                    initial={{opacity: 0.05, scale: 1}}
                    animate={{opacity: 1, scale: showContact ? 1.2 : 1}}
                    transition={{duration: showContact ? 0.8 : 4, ease: showContact ? "easeInOut" : "easeInOut"}}
                    className="absolute inset-0 z-10"
                    // style={{
                    //     backgroundImage: "url('/images/wall5.webp')",
                    //     background: "url('/images/wall5.webp') center/cover",
                    //     backgroundPosition: `var(--parallaxBgX) var(--parallaxBgY)`,
                    //     backgroundSize: isMobile ? "300%" : "115%",
                    //     backgroundRepeat: "no-repeat",
                    // }}
                />


                {/* Header */}
                <Header handleContactClick={handleContactClick} goBack={goBack}/>

                {/* AnimatePresence to handle transitions */}
                <AnimatePresence>

                    {!showContact && !isDisappeared && (
                        <>
                            {isMobile ? (
                                <MobileProjectSlider slides={projectData} options={OPTIONS} isMobile/>
                            ) : (
                                <motion.div
                                    className="relative w-full max-w-[100%] h-[600px] flex items-center justify-center overflow-hidden z-10"
                                    style={{perspective: "900px", transformStyle: "preserve-3d"}}
                                    initial={{scale: 0.7}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0.2 }}
                                    transition={{ duration: 0.6}}
                                >
                                    {/* Cards Slider */}
                                    {projectData.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            currentIndex={currentIndex}
                                            project={project}
                                            isPrev={index === (currentIndex - 1 + projectData.length) % projectData.length}
                                            nextSlide={nextSlide}
                                            prevSlide={prevSlide}
                                            position={getPosition(index)}
                                            isActive={index === currentIndex} // Check if card is active
                                            initialLoad={initialLoad}
                                        />
                                    ))}
                                </motion.div>
                            )}

                            {/* Nav Controls */}
                            {!isMobile &&
                                <NavControls nextSlide={nextSlide} prevSlide={prevSlide} currentIndex={currentIndex}/>}
                        </>
                    )}

                    {/* Contact Form */}
                    {showContact && (
                        <motion.div
                            key="contact-form"
                            className="absolute z-20 flex items-center justify-center w-full h-full "
                            initial={{scale: 0.6}}
                            animate={{scale: 1}}
                            exit={{scale: 0}}
                            transition={{duration: 0.6}}
                        >
                            <ContactForm onClose={handleCloseContact}/>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </ThreeSixtyBackground>


    );
};

export default Gallery3D;


{/* Lights On/Off Button */
}
{/*<button*/
}
{/*	onClick={toggleLights}*/
}
{/*	className="absolute bottom-10 right-10 bg-white text-black px-4 py-2 rounded-lg z-20"*/
}
{/*>*/
}
{/*	{lightsOn ? "Turn Lights Off" : "Turn Lights On"}*/
}
{/*</button>*/
}
