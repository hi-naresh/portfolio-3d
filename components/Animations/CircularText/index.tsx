import React from 'react';
import {motion} from "framer-motion";

const RotatingCircularText = ({ text }: { text: string }) => {
    const textRadius = 390; // Radius for text positioning along the circle
    const totalCharacters = text.length;
    const charSpacingFactor = 8; // Adjust to control character spacing

    // Angle step calculated based on circumference of the text circle
    const angleStep = 360 / (totalCharacters * charSpacingFactor);

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
                    const y = textRadius * Math.sin((angle * Math.PI) / 180) - 40; // Y-coordinate

                    return (
                        <span
                            key={index}
                            className="absolute text-6xl font-extrabold text-white"
                            style={{
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
