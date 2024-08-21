// import React from "react";
//
// const BannerScene = () => {
//     const panels = Array.from({ length: 24 });
//
//     return (
//         <div className="relative" style={{transformStyle: "preserve-3d"}}>
//             <div
//                 className="flex"
//                 style={{
//                     transformStyle: "preserve-3d",
//                     animation: "rotate 24s infinite linear",
//                 }}
//             >
//                 {panels.map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute w-[50px] h-[20rem] overflow-hidden"
//                         style={{
//                             transform: `translate(-50%, -50%) rotateY(${
//                                 (360 / 24) * i
//                             }deg) translateZ(190px)`,
//                         }}
//                     >
//                         <div
//                             className="absolute text-[16rem]"
//                             style={{
//                                 left: `${-50 * i}px`,
//                                 color: `hsl(${(360 / 24) * i}, 75%, 75%)`,
//                             }}
//                         >
//                             Jhawar
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div
//                 className="absolute w-[400px] h-[400px]"
//                 style={{transform: "translate(-50%, -50%)"}}
//             ></div>
//         </div>
//     );
// };
//
// export default BannerScene;

import React, { useState } from 'react';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const GlowingTextWithIndividualImages = ({ text, imageUrls }) => {
    // Track hover state for each character
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="relative flex items-center justify-center space-x-2">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-expect-error*/}
            {text.split('').map((char, index) => (
                <div
                    key={index}
                    className="relative inline-block"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Individual character with stroke and no fill */}
                    <span
                        className={`text-[14rem] font-bold transition-all duration-300 ${
                            hoveredIndex === index ? 'text-white glow' : 'text-transparent'
                        }`}
                        style={{
                            WebkitTextStroke:  hoveredIndex === index ? '2px white' : '2px #ccc', // Stroke color
                            textShadow: hoveredIndex === index ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
                        }}
                    >
                        {char}
                    </span>

                    {/* Image that shows on hover for each character */}
                    {hoveredIndex === index && imageUrls[index] && (
                        <img
                            src={imageUrls[index]}
                            alt={`Hovered Image ${index}`}
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{ zIndex: -1 }} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default GlowingTextWithIndividualImages;