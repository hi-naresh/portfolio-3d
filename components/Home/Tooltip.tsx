import {Html} from "@react-three/drei";
import React from "react";

// @ts-ignore
const ToolTip = ({ position, children }) => {
    return (
        <Html distanceFactor={1} position={position} center>
            <div className="relative flex items-center justify-center w-[7rem] h-[7rem] rounded-full bg-white/10 p-4 glassmorphism text-center">
                {children}
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse-slow"></div>
            </div>
        </Html>
    );
};

export default ToolTip;