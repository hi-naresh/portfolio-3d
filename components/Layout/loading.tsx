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
                            // animationDuration: '3s',
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

// const LoadingAnimation: React.FC = () => {
//     return(
//         <div className="w-screen h-full flex justify-center items-center">
//             <div className="absolute w-[600px] h-[36px] left-1/2 top-[40%] ml-[-300px] select-none cursor-default" id="load">
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '0s', WebkitTextStroke: '1px white', left: '0px'}}>H</div>
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '0.2s', WebkitTextStroke: '1px white', left: '40px'}}>S</div>
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '0.4s', WebkitTextStroke: '1px white', left: '80px'}}>E</div>
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '0.6s', WebkitTextStroke: '1px white', left: '120px'}}>R</div>
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '0.8s', WebkitTextStroke: '1px white', left: '160px'}}>A</div>
//                 <div className="absolute w-[20px] text-[2rem] space-x-16 h-[36px] stroke-white text-transparent font-sans opacity-0 animate-move" style={{animationDelay: '1s', WebkitTextStroke: '1px white', left: '200px'}}>N</div>
//             </div>
//         </div>
//     );
// }