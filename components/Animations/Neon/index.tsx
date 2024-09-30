import { motion } from 'framer-motion';
import React from "react";
import RotatingCircularText from "@components/Animations/CircularText";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const AnimatedNeonSvg = () => {
    const isMobile = useIsMobile();
    return (
        <div className="relative flex items-center justify-center">
            {/*<img src={"/images/neon.svg"} />*/}
            {isMobile ? <img src={"/images/neon.svg"}/> : <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initial={{opacity: 0.4}}
                animate={{opacity: [0.7, 2, 0.7]}}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <defs>
                    <motion.linearGradient
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        id="nnneon-grad"
                        animate={{
                            x1: ['50%', '0%', '50%', '100%', '50%'],
                            y1: ['0%', '50%', '100%', '50%', '0%'],
                            x2: ['50%', '100%', '50%', '0%', '50%'],
                            y2: ['100%', '50%', '0%', '50%', '100%'],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <stop
                            stopColor="hsl(338, 100%, 50%)"
                            stopOpacity="1"
                            offset="0%"
                        ></stop>
                        <stop
                            stopColor="hsl(179, 87%, 61%)"
                            stopOpacity="1"
                            offset="100%"
                        ></stop>
                    </motion.linearGradient>

                    <filter
                        id="nnneon-filter"
                        x="-100%"
                        y="-100%"
                        width="400%"
                        height="400%"
                        filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur
                            stdDeviation="37 8"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            in="SourceGraphic"
                            edgeMode="none"
                            result="blur"
                        ></feGaussianBlur>
                    </filter>
                    <filter
                        id="nnneon-filter2"
                        x="-100%"
                        y="-100%"
                        width="400%"
                        height="400%"
                        filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur
                            stdDeviation="8 41"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            in="SourceGraphic"
                            edgeMode="none"
                            result="blur"
                        ></feGaussianBlur>
                    </filter>
                </defs>
                <g strokeWidth="64" stroke="url(#nnneon-grad)" fill="none">
                    {/* Main Neon Circle */}
                    <motion.circle
                        r="209.5" // Radius
                        cx="400"
                        cy="400"
                        filter="url(#nnneon-filter)"
                        animate={{
                            scale: [1, 1.05, 1], // Pulsate effect
                            opacity: [0.8, 1, 0.8], // Glowing opacity effect
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    {/* Second Rotating Circle */}
                    <motion.circle
                        r="209.5"
                        cx="568"
                        cy="400"
                        filter="url(#nnneon-filter2)"
                        opacity="0.25"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 360], // Slow rotation
                            opacity: [0.25, 0.5, 0.25], // Fading effect
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    {/* Third Rotating Circle (Reverse Rotation) */}
                    <motion.circle
                        r="209.5"
                        cx="232"
                        cy="400"
                        filter="url(#nnneon-filter2)"
                        opacity="0.25"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, -360], // Slow rotation in the opposite direction
                            opacity: [0.25, 0.5, 0.25],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    {/* Final Static Circle */}
                    <motion.circle
                        r="209.5"
                        cx="400"
                        cy="400"
                        animate={{
                            scale: [1, 1.05, 1], // Subtle pulsate effect
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </g>
            </motion.svg>}
            {/* Rotating Text Around the Ring */}
            <RotatingCircularText text={"NARESH"}/>
        </div>
    );
};

export default AnimatedNeonSvg;


