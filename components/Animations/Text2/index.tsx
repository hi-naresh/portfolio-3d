import React from 'react';
import {useIsMobile} from "@libs/hooks/useIsMobile";

const AnimatedTextWithHover = ({ text }: { text: string }) => {
    const isMobile = useIsMobile();
    return (
        <div className="flex items-center  justify-center ">
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
                            WebkitTextStroke: isMobile?'1px white' : '2px white',
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
