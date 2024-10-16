import { Html } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

// @ts-ignore
const ToolTip = ({ position, isVisible, children }) => {
    return (
        <Html distanceFactor={1} position={position} center>
            <>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            key="tooltip"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0,opacity: 0 }}
                            transition={{ duration: 0.2 , ease: "easeInOut"}}
                            className="relative z-20 pointer-events-none flex items-center justify-center w-[7rem] h-[7rem] rounded-full bg-white/10 p-4 glassmorphism text-center"
                        >
                            {children}
                            <div className="absolute z-20 inset-0 border-2 border-primary rounded-full animate-pulse-slow"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        </Html>
    );
};

export default ToolTip;
