"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
                                    text,
                                    duration = 0.4, // Hover effect duration
                                }: {
    text: string;
    duration?: number;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 50, y: 50 }); // Initial cursor position in percentages
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            // Calculate the position of the cursor relative to the SVG container
            const cxPercentage = Math.min(
                100,
                Math.max(0, ((e.clientX - svgRect.left) / svgRect.width) * 100)
            );
            const cyPercentage = Math.min(
                100,
                Math.max(0, ((e.clientY - svgRect.top) / svgRect.height) * 100)
            );
            setCursor({ x: cxPercentage, y: cyPercentage });
        }
    };

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
            className="select-none xs:mt-[75vh] md:mt-[98vh]"
        >
            <defs>
                {/* Gradient with 3 colors: #47709c, #fff, #47709c */}
                <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#47709c" />
                    <stop offset="50%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#47709c" />
                </linearGradient>

                {/* Mask for hover effect */}
                <radialGradient
                    id="revealMask"
                    cx={`${cursor.x}%`} // Updated to handle edge positions better
                    cy={`${cursor.y}%`}
                    r="12%" // Larger radius to cover edge areas
                    fx={`${cursor.x}%`}
                    fy={`${cursor.y}%`}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>

                <mask id="textMask">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                </mask>
            </defs>

            {/* Text with the outline */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="#ffffff32" // White with 40% opacity
                strokeWidth="1"
                fill="transparent"
                className="font-[helvetica] font-bold text-6xl"
            >
                {text}
            </text>

            {/* Text with gradient fill, applied on hover */}
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)" // Gradient stroke
                strokeWidth="1"
                fill="transparent"
                className="font-[helvetica] font-bold text-6xl"
                mask="url(#textMask)" // Mask controlled by the cursor
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0.4 }} // Animate opacity on hover
                transition={{ duration }}
            >
                {text}
            </motion.text>
        </svg>
    );
};
