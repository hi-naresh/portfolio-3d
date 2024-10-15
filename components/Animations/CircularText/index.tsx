import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useIsMobile } from "@libs/hooks/useIsMobile";

const RotatingCircularText = ({ text }: { text: string }) => {
    const isMobile = useIsMobile();
    const textRadius = isMobile ? 90 : 390;
    const totalCharacters = text.length;
    const charSpacingFactor = 5;

    // Angle step calculated based on circumference of the text circle
    const angleStep = 360 / (totalCharacters * charSpacingFactor);
    const tilt = isMobile ? 15 : 40; // Adjust tilt as needed

    // State to store the hover effect (triggered by mouse movement)
    const [hoverRotation, setHoverRotation] = useState(0);
    const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise


    // Mouse move event listener to track mouse position
    useEffect(() => {

        if (isMobile) {
            // If it's a mobile device, rotate automatically within 0 to 180 degrees
            const rotateInterval = setInterval(() => {
                setHoverRotation((prevRotation) => {
                    let newRotation = prevRotation + rotationDirection * 0.6;

                    // Bounce between 0 and -180 degrees
                    if (newRotation <= -90 || newRotation >= 100) {
                        setRotationDirection(rotationDirection * -1); // Reverse the direction
                        newRotation = Math.max(-90, Math.min(100, newRotation)); // Clamp between 0 and -180
                    }

                    return newRotation;
                });
            }, 12); // Roughly 60fps

            return () => clearInterval(rotateInterval); // Cleanup interval
        }else{
            const handleMouseMove = (e: MouseEvent) => {
                // Get the position of the mouse relative to the center of the screen
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const deltaX = (e.clientX - centerX) / window.innerWidth; // Normalize X position
                const deltaY = (e.clientY - centerY) / window.innerHeight; // Normalize Y position

                // Calculate a new rotation angle based on the mouse position
                // Limit rotation to a range of -60 to +60 degrees
                const newRotation = Math.max(-80, Math.min(80, deltaX * 120));

                setHoverRotation(newRotation);
            };

            window.addEventListener("mousemove", handleMouseMove);

            // Cleanup the event listener on unmount
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [
        isMobile,
        rotationDirection
    ]);

    return (
        <motion.div
            className="absolute w-full h-full flex items-center justify-center"
            // Apply a limited rotation based on mouse hover movement
            style={{
                transform: `rotate(${hoverRotation - 120}deg)`, // Shift by -45 degrees for top-left positioning
                transformOrigin: 'center', // Rotate around the center of the text circle
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
                            outline-white
                            text-transparent
                            drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
                            stroke-white "
                            style={{
                                WebkitTextStroke: isMobile ? '0.5px white' : '2px white',
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
// import React, { useState, useEffect } from 'react';
// import { motion } from "framer-motion";
// import { useIsMobile } from "@libs/hooks/useIsMobile";
//
// const RotatingCircularText = ({ text }: { text: string }) => {
//     const isMobile = useIsMobile();
//     const textRadius = isMobile ? 90 : 390;
//     const totalCharacters = text.length;
//     const charSpacingFactor = 5;
//     const angleStep = 360 / (totalCharacters * charSpacingFactor); // Angle step for spacing
//     const tilt = isMobile ? 15 : 40; // Adjust tilt based on device
//
//     // State to store the hover effect or automatic rotation
//     const [hoverRotation, setHoverRotation] = useState(0);
//     const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise
//
//     useEffect(() => {
//         if (isMobile) {
//             // If it's a mobile device, rotate automatically within 0 to 180 degrees
//             const rotateInterval = setInterval(() => {
//                 setHoverRotation((prevRotation) => {
//                     let newRotation = prevRotation + rotationDirection * 0.5;
//
//                     // Bounce between 0 and -180 degrees
//                     if (newRotation <= -180 || newRotation >= -30) {
//                         setRotationDirection(rotationDirection * -1); // Reverse the direction
//                         newRotation = Math.max(-180, Math.min(-30, newRotation)); // Clamp between 0 and -180
//                     }
//
//                     return newRotation;
//                 });
//             }, 16); // Roughly 60fps
//
//             return () => clearInterval(rotateInterval); // Cleanup interval
//         } else {
//             // If it's not a mobile device, rotate based on mouse movement
//             const handleMouseMove = (e: MouseEvent) => {
//                 const centerX = window.innerWidth / 2;
//                 const centerY = window.innerHeight / 2;
//                 const deltaX = (e.clientX - centerX) / window.innerWidth; // Normalize X position
//                 const deltaY = (e.clientY - centerY) / window.innerHeight; // Normalize Y position
//
//                 // Calculate new rotation based on mouse position
//                 const newRotation = Math.max(-80, Math.min(80, deltaX * 120));
//                 setHoverRotation(newRotation);
//             };
//
//             window.addEventListener("mousemove", handleMouseMove);
//             return () => window.removeEventListener("mousemove", handleMouseMove);
//         }
//     }, [isMobile, rotationDirection]);
//
//     return (
//         <motion.div
//             className="absolute w-full h-full flex items-center justify-center"
//             style={{
//                 transform: `rotate(${hoverRotation}deg)`, // Apply rotation to the entire text
//                 transformOrigin: 'center',
//             }}
//         >
//             <div className="relative">
//                 {text.split('').map((char, index) => {
//                     const angle = index * angleStep - (totalCharacters / 8) * angleStep;
//                     const x = textRadius * Math.cos((angle * Math.PI) / 180); // X-coordinate
//                     const y = textRadius * Math.sin((angle * Math.PI) / 180) - tilt; // Y-coordinate
//
//                     return (
//                         <span
//                             key={index}
//                             className="absolute letter inline-block font-bold text-[6rem] 
//                             lg:text-[4rem] md:text-[2rem] sm:text-[1.5rem] xs:text-[1.5rem]                        
//                             scale-110 
//                             outline-white
//                             text-transparent
//                             drop-shadow-[0_0_10px_rgba(255,255,255,1)] 
//                             stroke-white "
//                             style={{
//                                 WebkitTextStroke: isMobile ? '0.5px white' : '2px white',
//                                 animationDelay: `${index * 0.1}s`,
//                                 transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
//                                 transformOrigin: 'center',
//                             }}
//                         >
//                             {char}
//                         </span>
//                     );
//                 })}
//             </div>
//         </motion.div>
//     );
// };
//
// export default RotatingCircularText;
