import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import React from "react";

// @ts-ignore
const ToolTip = ({ position, children }) => {
    return (
        <Html distanceFactor={1} position={position} center>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    pointerEvents: "none" // Ensure no interaction with the tooltip itself
                }}
                className="relative pointer-events-none flex items-center justify-center w-[7rem] h-[7rem] rounded-full bg-white/10 p-4 glassmorphism text-center"
            >
                {children}
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse-slow"></div>
            </motion.div>
        </Html>
    );
};

export default ToolTip;
