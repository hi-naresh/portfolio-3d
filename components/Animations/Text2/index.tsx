import React from 'react';
import {useIsMobile} from "@libs/hooks/useIsMobile";

const AnimatedTextWithHover = ({ text }: { text: string }) => {
    const isMobile = useIsMobile();
    return (
        <div className="flex items-center justify-center ">
            <div className="flex space-x-2 xs:space-x-1"> 
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="letter inline-block font-bold text-[8rem] 
                        lg:text-[8rem] md:text-[6rem] sm:text-[4rem] xs:text-[4rem]
                        hover:scale-110 
                        opacity-50 hover:opacity-100
                        hover:text-white 
                        hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
                        stroke-white 
                        text-transparent"
                        style={{
                            WebkitTextStroke: isMobile?'1px white' : '2px rgba(255,255,255,0.7)',
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


// const AnimatedTextWithHover = ({ text }: { text: string }) => {
//     const isMobile = useIsMobile();
//     const chars = text.split('');
//     const charCount = chars.length;
//     const angleIncrement = 360 / charCount;
//
//     return (
//         <div className="scene flex items-center justify-center h-192">
//             <div className="banner">
//                 {chars.map((char, index) => (
//                     <div
//                         key={index}
//                         className="panel"
//                         style={{
//                             transform: `rotateY(${angleIncrement * index}deg) translateZ(200px)`,
//                         }}
//                     >
//                         <span
//                             className="text-8xl font-bold text-transparent hover:scale-110 hover:opacity-100 opacity-50 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
//                             style={{
//                                 WebkitTextStroke: isMobile ? '1px white' : '2px rgba(255,255,255,0.7)',
//                             }}
//                         >
//                             {char}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default AnimatedTextWithHover;
