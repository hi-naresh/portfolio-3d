import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Data array for cards
const cardData = [
    {
        title: "Naresh Jhawar",
        description: `Software Developer | IT graduate skilled in Agile Workflow, Data Structures, Operating Systems, 
        and DevOps. Specialized in FrontEnd development and currently seeking to master blockchain technology and prompt engineering.`
    },
    {
        title: "Volunteering",
        description: `1. National Service Scheme (President, Feb 2022 - Present)
        - Organised community service campaigns, clean-ups, and donation drives.
        \n2. AIESEC Global Organisation (Member, Feb 2022 - Jan 2023)
        - Engaged in global youth leadership and cultural exchange.`
    },
    {
        title: "Skills",
        description: `Programming Languages: Python, Java, GO
        Frontend Development: Flutter, React, JavaScript, Redux, Figma, Blender
        Backend Development: Node.js, Firebase, REST APIs, Flask, Django, Web3.js
        Other Tools: Jira, Jenkins, AWS, GitHub, Docker`
    },
    {
        title: "Interests",
        description: `Coffee Brewing • Volunteering • Fitness • Table Tennis • Personal Development`
    }
];


const PopupDetails = ({ setPopupVisible }: { setPopupVisible: (visible: boolean) => void }) => {
    // Animation variants for the cards
    const cardVariants = {
        hidden: { scale: 0, duration: 0.4 }, // Initial hidden state
        visible: (custom: number) => ({
            scale: 1,
            opacity: 1,
            rotateY: custom < 2 ? 30 : -30, // Left cards rotateY positive, Right cards rotateY negative
            x: custom < 2 ? -270 : 270, // Left or right side positioning
            y: custom % 2 === 0 ? -150 : 150, // Vertical positioning for top and bottom
            transition: { duration: 0.4, delay: custom * 0.2 }, // Staggered entry animation
        }),
        exit: (custom: number) => ({
            scale: 0,
            opacity: 0,
            rotateY: custom < 2 ? 30 : -30, // Rotate back to original state
            x: 0, // Return to center
            y: 0, // Return to center
            transition: { duration: 0.4, delay: custom * 0.2 }, // Staggered exit animation
        }),
    };

    return (
        <>
            {/* 3D Perspective Container */}
            <motion.div
                initial={{ perspective: 1000 }} // Perspective for 3D effect
                exit={{ scale: 0}} // Fade out the container on exit
                className="fixed inset-0 flex items-center justify-center z-50"
            >
                {/* Close Button */}
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-white text-4xl w-20 h-20 glassmorphism rounded-full z-50"
                    onClick={() => setPopupVisible(false)}
                >X
                </motion.button>

                <AnimatePresence>
                    {/* Four Cards with 3D Tilt */}
                    {cardData.map((card, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover={{ scale: 1.05,}}
                            className="absolute w-[22rem] h-[15rem] space-y-4 glassmorphism p-4 rounded-2xl flex flex-col items-center justify-center text-white"
                            style={{
                                transformStyle: "preserve-3d", // Preserves the 3D effect
                                backfaceVisibility: "hidden", // Ensures the back is not visible
                            }}
                        >
                            <h2 className="bg-black/20 p-2 border-[0.5px] border-white/40 rounded-xl text-xl font-semibold">{card.title}</h2>
                            <p className="bg-black/20 p-3 border-[0.5px] border-white/40  rounded-xl text-sm">{card.description}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default PopupDetails;
