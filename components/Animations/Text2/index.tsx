// import React, { useState } from 'react';
//
// const AnimatedTextWithHover = ({ text, imageUrls }) => {
//     const [hoveredIndex, setHoveredIndex] = useState(null);
//
//     return (
//         <div className="relative flex items-center justify-center h-full w-full">
//             <div className="relative z-10 flex ml-8 space-x-[-0.5rem]">
//                 {text.split('').map((char, index) => (
//                     <div
//                         key={index}
//                         className="relative inline-block"
//                         onMouseEnter={() => setHoveredIndex(index)}
//                         onMouseLeave={() => setHoveredIndex(null)}
//                     >
//                         {/* Text with combined animation and hover effect */}
//                         <svg
//                             viewBox="0 0 250 250"
//                             className="w-[9rem] -ml-8 h-[9rem]"
//                             style={{ display: 'inline-block' }}
//                         >
//                             {/* Two colored strokes (ants effect) */}
//                             {[...Array(2)].map((_, i) => (
//                                 <text
//                                     key={i}
//                                     x="50%"
//                                     y="75%"
//                                     textAnchor="middle"
//                                     className={`text-copy text-copy-${i + 1}`}
//                                     style={{
//                                         fontSize: '16rem',
//                                         visibility: hoveredIndex === index ? 'hidden' : 'visible',
//                                     }}
//                                 >
//                                     {char}
//                                 </text>
//                             ))}
//
//                             {/* Main text with hover effect */}
//                             <text
//                                 x="50%"
//                                 y="75%"
//                                 textAnchor="middle"
//                                 className={`font-bold ${
//                                     hoveredIndex === index ? 'glow text-white' : 'text-transparent'
//                                 }`}
//                                 style={{
//                                     fontSize: '16rem',
//                                     WebkitTextStroke: hoveredIndex === index ? '0' : '2px white',
//                                     fill: hoveredIndex === index ? '#FF005D' : 'none',
//                                     transition: 'all 0.3s ease-in-out',
//                                 }}
//                             >
//                                 {char}
//                             </text>
//                         </svg>
//
//                         {/* Image that shows on hover for each character */}
//                         {/*{hoveredIndex === index && imageUrls[index] && (*/}
//                         {/*    <img*/}
//                         {/*        src={imageUrls[index]}*/}
//                         {/*        alt={`Hovered Image ${index}`}*/}
//                         {/*        className="absolute inset-0 w-full h-full object-contain"*/}
//                         {/*        style={{ zIndex: 10 }} // Ensure the image is behind the character*/}
//                         {/*    />*/}
//                         {/*)}*/}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default AnimatedTextWithHover;
//
// import React from 'react';
//
// const AnimatedTextWithHover = ({ text }: { text: string }) => {
//     return (
//         <div className="flex items-center justify-center h-screen ">
//             <div className="flex space-x-4">
//                 {text.split('').map((char, index) => (
//                     <span
//                         key={index}
//                         className="
//                             text-transparent 
//                             font-bold 
//                             text-[8rem] 
//                             lg:text-[12rem] 
//                             transition-transform 
//                             duration-300 
//                             ease-in-out 
//                             transform 
//                             hover:scale-110 
//                             hover:text-white 
//                             hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]
//                             stroke-white"
//                         style={{
//                             WebkitTextStroke: '2px white',
//                         }}
//                     >
//                         {char}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default AnimatedTextWithHover;
//
// import React from 'react';
//
// const AnimatedTextWithHover = ({ text }: { text: string }) => {
//     return (
//         <div className="flex items-center justify-center ">
//             <span
//                 className="
//                     text-transparent 
//                     font-bold 
//                     text-[8rem] 
//                     lg:text-[12rem] 
//                     transition-transform 
//                     duration-300 
//                     ease-in-out 
//                     transform 
//                     hover:scale-110 
//                     hover:text-white 
//                     hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
//                     stroke-white"
//                 style={{
//                     WebkitTextStroke: '2px white',
//                     zIndex: 50,
//                 }}
//             >
//                 {text}
//             </span>
//         </div>
//     );
// };
//
// export default AnimatedTextWithHover;

// import React from 'react';
//
// const AnimatedTextWithHover = ({ text }: { text: string }) => {
//     return (
//         <div className="flex items-center justify-center ">
//             <div className="flex space-x-2">
//                 {text.split('').map((char, index) => (
//                     <span
//                         key={index}
//                         className="letter inline-block font-bold text-[8rem] lg:text-[8rem] 
//                         hover:scale-110 
//                         hover:text-white 
//                         hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
//                         stroke-white text-transparent"
//                         style={{
//                             WebkitTextStroke: '2px white',
//                             animationDelay: `${index * 0.1}s`,
//                         }}
//                     >
//                         {char}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default AnimatedTextWithHover;

import React from 'react';

const AnimatedTextWithHover = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center md:mb-12 sm:mb-24 xs:mb-24  justify-center ">
            <div className="flex space-x-2 xs:space-x-1"> 
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="letter inline-block font-bold text-[8rem] 
                        lg:text-[8rem] md:text-[6rem] sm:text-[4rem] xs:text-[4rem]
                        hover:scale-110 
                        hover:text-white 
                        hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
                        stroke-white text-transparent"
                        style={{
                            WebkitTextStroke: '2px white',
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AnimatedTextWithHover;
