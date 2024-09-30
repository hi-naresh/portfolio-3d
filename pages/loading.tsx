// import React from "react";
//
// const LoadingScreen = () => {
//     return (
//         <div className={"absolute flex justify-center items-center bg-black w-screen h-full"}>
//             <div 
//                 className={"titlef"}
//             >
//                 Naresh
//             </div>
//         </div>
//     );
// };
//
// export default LoadingScreen;

import React from "react";

const LoadingAnimation: React.FC = () => {
    const letters = [
        'H', 'S', 'E', 'R', 'A', 'N'
    ];

    return (
        <div className={"w-screen h-full flex justify-center items-center"}>
            <div className="absolute w-[600px] h-[36px] left-1/2 top-[40%] ml-[-300px] select-none cursor-default"
                 id="load">
                {letters.map((letter, index) => (
                    <div
                        key={index}
                        className={`absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move`}
                        style={{
                            animationDelay: `${index * 0.2}s`,
                            WebkitTextStroke: '1px white',
                            left: `${index * 40}px`,  // Positioning letters
                        }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default LoadingAnimation;
