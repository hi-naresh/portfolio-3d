// import React, { useEffect, useRef } from 'react';
//
// const ThreeDText = () => {
//     const containerRef = useRef(null);
//
//     useEffect(() => {
//         const container = containerRef.current;
//         let timeout: string | number | NodeJS.Timeout | undefined;
//
//         const onAnimationIteration = () => {
//             // Pause the rotation
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-expect-error
//             container.style.animationPlayState = 'paused';
//
//             // Create and add the glow frame with a light stroke color
//             const glowFrame = document.createElement('span');
//             glowFrame.className = 'absolute inset-0 transform glow-frame';
//             glowFrame.style.transform = `rotateX(0deg)`;
//             glowFrame.style.opacity = '0'; // Start with opacity 0
//             glowFrame.innerHTML = `
//         <span class="block text-[12rem] text-secondary/20 uppercase font-extrabold text-center leading-none tracking-wide light-stroke-text shadow-text">
//           Naresh
//         </span>
//       `;
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-expect-error
//             container.appendChild(glowFrame);
//
//             // Trigger a reflow and apply the fade-in effect with a delay
//             setTimeout(() => {
//                 glowFrame.style.opacity = '1'; // Fade in to full opacity
//             }, 50); // Slight delay to ensure smooth fade-in
//
//             timeout = setTimeout(() => {
//                 // Fade out the glow frame before removing it
//                 glowFrame.style.opacity = '0';
//
//                 setTimeout(() => {
//                     glowFrame.remove(); // Remove after fade-out is complete
//                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                     // @ts-expect-error
//                     container.style.animationPlayState = 'running';
//                 }, 1000); // Time for fade-out to complete
//             }, 2000); // Show the glow frame for 2 seconds before fading out
//         };
//
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-expect-error
//         container.addEventListener('animationiteration', onAnimationIteration);
//
//         return () => {
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-expect-error
//             container.removeEventListener('animationiteration', onAnimationIteration);
//             clearTimeout(timeout);
//         };
//     }, []);
//
//     return (
//         <div className="absolute w-full h-screen flex justify-center items-center ">
//             <div className="relative w-full h-[350px] perspective">
//                 <div ref={containerRef} className="absolute w-full h-full transform-style animate-inertia">
//                     {[...Array(96)].map((_, i) => {
//                         const opacity = 1 - i / 48; // Gradually decrease opacity from first to last
//                         return (
//                             <span
//                                 key={i}
//                                 className="absolute inset-0 transform"
//                                 style={{
//                                     transform: `rotateX(${i * 5}deg)`,
//                                     opacity: opacity,
//                                 }}
//                             >
//                 <span className="block text-[12rem] text-secondary/20 uppercase font-extrabold text-center leading-none tracking-wide stroke-text shadow-text">
//                   Naresh
//                 </span>
//               </span>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ThreeDText;

import React from 'react';

const TextWithGlow = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex space-x-2">
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="letter inline-block font-bold text-[8rem] lg:text-[10rem] 
                        text-white tracking-wide 
                        animate-glow"
                        style={{
                            WebkitTextStroke: '1px white',
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

export default TextWithGlow;
