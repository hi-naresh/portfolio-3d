import { motion, AnimatePresence } from "framer-motion";
import React, {useState} from "react";

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
    const [isExiting, setIsExiting] = useState(false);

    // Animation variants for the cards
    const cardVariants = {
        hidden: (custom: number) => ({
            rotateY: custom < 2 ? 90 : -90, // Left cards rotateY from 90, Right cards from -90
            x: custom < 2 ? "-50vw" : "50vw", // Left from the left, Right from the right
            y: custom % 2 === 0 ? "-150px" : "150px", // Top or bottom positioning
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.6 }
        }),
        visible: (custom: number) => ({
            rotateY: custom < 2 ? 30 : -30, // Left cards rotateY to 30, Right cards rotateY to -30
            x: custom < 2 ? "-370px" : "370px", // Position the cards closer to the center
            y: custom % 2 === 0 ? "-150px" : "150px", // Top or bottom positioning
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 12, duration: 0.8 }
        }),
        exit: (custom: number) => ({
            rotateY: custom < 2 ? 60 : -60, // Exit with the same 90-degree rotation
            x: custom < 2 ? "-50vw" : "50vw", // Exit left or right
            y: custom % 2 === 0 ? "-150px" : "150px", // Top or bottom positioning
            opacity: 0,
            transition: { duration: 1.6 }
        }),
    };

    const handleExit = () => {
        setIsExiting(true);
        setTimeout(() => {
            setPopupVisible(false); // This will unmount the component after the animation
        }, 700); // Adjust to match the exit animation duration
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ perspective: 1000 }} // Perspective for stronger 3D effect
                    exit={{ opacity: 0}} // Fade out the container on exit
                    transition={ { duration: 0.8 } }
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    {/* Close Button */}
                    <motion.button
                        title={"Close"}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.5}}
                        className="absolute text-white flex items-center justify-center text-4xl w-20 h-20 glassmorphism rounded-full z-50"
                        onClick={handleExit}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        {/*<Image*/}
                        {/*    width={44}*/}
                        {/*    height={44}*/}
                        {/*    className={"invert"}*/}
                        {/*    src={"/assets/icons/close.svg"}*/}
                        {/*    alt={"close"}*/}
                        {/*/>*/}
                    </motion.button>

                    {/* Four Cards with 3D Tilt */}
                    {cardData.map((card, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute w-[24rem] h-[17.5rem] space-y-4 glassmorphism p-4 rounded-2xl flex flex-col items-center justify-center text-white"
                            style={{
                                transformStyle: "preserve-3d", // Preserves the 3D effect
                                backfaceVisibility: "hidden", // Ensures the back is not visible
                            }}
                        >
                            <h2 className="bg-black/20 p-2 border-[0.5px] border-white/40 rounded-xl text-xl font-semibold">{card.title}</h2>
                            <p className="bg-black/20 p-3 border-[0.5px] border-white/40 rounded-xl text-sm">{card.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PopupDetails;
