import {motion} from "framer-motion";
import CircleButton from "@components/Layout/Buttons/CircleButton";
import projectData from "../../data/projectData";
import React from "react";

const NavControls = (
    { nextSlide, prevSlide , currentIndex }: { nextSlide: () => void; prevSlide: () => void; currentIndex: number }
) => {
    return (
        <motion.div
            className="absolute z-50 bottom-0 p-1 mb-12 w-full flex justify-center"
            initial={{ scaleX: 0,scaleY: 0}}
            animate={{ scaleX: 1,scaleY: 1 }}
            exit={{ scaleX: 0, scaleY:0,opacity: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
        >
            <motion.div
                className="glassmorphism w-[30rem] p-1 rounded-full flex justify-between items-center space-x-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
                initial={{width: 0}}
                animate={{width: '30rem'}}
                transition={{delay: 0.1, duration: 2, ease: "easeOut"}}
            >
                <motion.button
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 2.2, duration: 0.5, ease: "easeOut"}}
                >
                    <CircleButton onClick={prevSlide} icon="/icons/site/icon9.svg"/>
                </motion.button>
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2, duration: 2}}
                    className="text-white pt-2 h-10 flex-col justify-center items-center text-md"
                >
                    {projectData[currentIndex].title}
                </motion.p>
                <motion.button
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 2.2, duration: 0.5, ease: "easeOut"}}
                >
                    <div className="transform rotate-180">
                        <CircleButton onClick={nextSlide} icon="/icons/site/icon9.svg"/>
                    </div>
                </motion.button>
            </motion.div>
        </motion.div>
);
}

export default NavControls;