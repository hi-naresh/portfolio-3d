import React, {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useIsMobile} from "@libs/hooks/useIsMobile";

interface ToggleSwitchProps {
    toggleSwitch: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ toggleSwitch }) => {
    const [isOn, setIsOn] = useState(false);
    const isMobile = useIsMobile();
    
    // Handle toggle switch logic
    const handleToggle = () => {
        setIsOn(!isOn);
        toggleSwitch(); // Call the parent handler
    };
    
    //switch on after 4 seconds only for the first time 
    useEffect(() => {
            const timeOut = isMobile ? 6000 :3000;

            const timer = setTimeout(() => {
            setIsOn(true);
        }, timeOut);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
    , [isMobile, isOn]);

    return (
        <div className="inline-block w-[4rem] relative">
            {/* Switch Container with smooth color transition */}
            <motion.div
                title={isOn ? "Switch to Dark Mode" : "Switch to Light Mode"}
                className={`w-full h-[2.45rem] p-1 flex items-center cursor-pointer select-none glassmorphism
                rounded-full transition-colors duration-500`}
                onClick={handleToggle}
            >
                {/* Switch Handle */}
                <AnimatePresence>
                    <motion.div
                        className="w-8 h-8 bg-white/40 rounded-full flex justify-center items-center"
                        layout
                        initial={false}
                        animate={{x: isOn ? 24 : 0}} // Smooth translation with Framer Motion
                        transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 600,
                            damping: 30,
                        }}
                    >
                        {isOn ? (
                            <motion.img
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0}}
                                transition={{duration: 0.4}}
                                className="w-6 h-6 text-white invert"
                                src={"/assets/icons/light.svg"}/>

                        ) : (
                            <motion.img
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0}}
                                transition={{duration: 0.4}}
                                className="w-6 h-6 text-white invert"
                                src={"/assets/icons/dark.svg"}/>
                        )}
                        {/* Animate Icons */}
                        {/*<AnimatePresence mode="wait">*/}
                        {/*    */}
                        {/*</AnimatePresence>*/}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ToggleSwitch;
