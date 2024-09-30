import React from 'react';
import {motion} from "framer-motion";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const RotatingCircularText = ({ text }: { text: string }) => {
    const isMobile = useIsMobile();
    const textRadius = isMobile ? 100 : 390;
    const totalCharacters = text.length;
    const charSpacingFactor = 5;

    // Angle step calculated based on circumference of the text circle
    const angleStep = 360 / (totalCharacters * charSpacingFactor);
    const tilt = isMobile ? 15:40; // Adjust tilt as needed

    return (
        <motion.div
            className="absolute w-full h-full flex items-center justify-center"
            animate={{rotate: 360}} // Text rotating
            transition={{
                repeat: Infinity,
                duration: 8, // Adjust speed as needed
                ease: 'linear',
            }}
        >
            <div className="relative">
                {text.split('').map((char, index) => {
                    // Calculate angle to space characters evenly along the circle
                    const angle = index * angleStep - (totalCharacters / 8) * angleStep;
                    const x = textRadius * Math.cos((angle * Math.PI) / 180); // X-coordinate
                    const y = textRadius * Math.sin((angle * Math.PI) / 180) - tilt; // Y-coordinate
                    
                    return (
                        <span
                            key={index}
                            className="absolute letter inline-block font-bold text-[6rem] 
                            lg:text-[4rem] md:text-[2rem] sm:text-[1.5rem] xs:text-[1.5rem]                        
                            scale-110 
                            text-white 
                            drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
                            stroke-white text-transparent"
                            style={{
                                WebkitTextStroke: '2px white',
                                animationDelay: `${index * 0.1}s`,
                                transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`, // Align characters along the circle
                                transformOrigin: 'center',
                            }}
                        >
                                {char}
                            </span>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default RotatingCircularText;
