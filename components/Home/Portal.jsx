import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { menuData } from '../../data/menuData';
import { CardContainer } from "@components/ui/3d-card";

const cardVariants = {
    center: {
        hidden: {
            opacity: 0,
            scale: 0,
            y: 200 // Scale up from the bottom
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,  // Move to original position
            rotateX: -15,
            transition: {
                // delay:1,
                type: 'spring', // Spring effect for smooth scaling
                stiffness: 100, // Spring tension
                damping: 10,    // Reduce bouncing
                // duration: 4,
            },
        },
        whileHover: {
            scale: 1.05,
            rotateX: 0,
            transition: {
                duration: 0.5
            },
        },
    },
    left: {
        hidden: {
            opacity: 0,
            x: 0,            // Initially hidden at the center (x = 0)
            rotateY: 0,
            translateZ: -50,
        },
        visible: {
            opacity: 1,
            x: -100,          // Slide to the left
            rotateY: 30,      // Apply tilt effect
            rotateX: -15,

            translateZ: -250,
            transition: {
                type: 'spring', // Spring effect for sliding
                stiffness: 80,  // Adjust for smooth spring animation
                damping: 12,
                // delay: 2,     // Start after the center card scales up
            },
        },
        whileHover: {
            scale: 1.05,
            rotateX: 0,
            transition: {
                duration: 0.5
            },
        },
    },
    right: {
        hidden: {
            opacity: 0,
            x: 0,            // Initially hidden at the center (x = 0)
            rotateY: 0,
            translateZ: -50,
        },
        visible: {
            opacity: 1,
            x: 100,           // Slide to the right
            rotateY: -30,     // Apply tilt effect
            rotateX: -15,
            translateZ: -250,
            transition: {
                type: 'spring', // Spring effect for sliding
                stiffness: 80,  // Adjust for smooth spring animation
                damping: 12,
                // delay: 2,     // Start after the center card scales up
            },
        },
        whileHover: {
            scale: 1.05,
            rotateX: 0,
            transition: {
                duration: 0.5
            },
        },
    },
};


const MenuPortal = () => {
    const [hoverRotation, setHoverRotation] = useState(0);
    const [tiltRotation, setTiltRotation] = useState({ x: 0, y: 0 });

    // Mouse move event listener to track mouse position and calculate card rotation
    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Get the mouse's X and Y positions relative to the center of the screen
            const deltaX = (e.clientX - centerX) / window.innerWidth;
            const deltaY = (e.clientY - centerY) / window.innerHeight;

            // Set rotations for the card based on the mouse position (slightly rotate the cards)
            setHoverRotation(deltaX * 30); // Rotate between -30 and +30 degrees on X-axis
            setTiltRotation({ x: deltaY * 10, y: deltaX * 10 }); // Slight tilt effect
        };

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup the event listener on unmount
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div 
            className="w-screen h-screen absolute bg-transparent flex items-center justify-center"
        >
            <motion.div
                className="perspective-container relative flex space-x-8"
                style={{
                    perspective: '1000px',
                }}
                initial={{ scale: 0,y: -150}}
                animate={{ scale: 1,y: -320}}
                exit={{ scale: 0,y: -150}}
                transition={{delay:1,duration: 1}}
            >
                {menuData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        onClick={() => window.open(item.link, '_self')}
                        className={`w-72 h-[320px] ${item.bgColor} glassmorphism p-6 rounded-[40px] shadow-lg cursor-pointer relative`}
                        // Use different variants based on index
                        variants={
                            index === 1
                                ? cardVariants.center // Center card scaling
                                : index === 0
                                    ? cardVariants.left // Left card tilting
                                    : cardVariants.right // Right card tilting
                        }
                        initial="hidden" // Start in the hidden state
                        animate="visible" // Animate to visible state
                        exit="hidden" // Handle exit animation
                        //hover for each card 
                        whileHover="whileHover"

                        style={{
                            transformStyle: 'preserve-3d',
                            pointerEvents: 'auto',
                            // transform: `rotateY(${index === 0 ? hoverRotation + 30 : index === 2 ? hoverRotation - 30 : hoverRotation}deg) rotateX(${tiltRotation.x}deg)`,
                        }}
                    >
                        {/* Image */}
                        <div
                            // sensibility={5}
                            className={"flex-col "}
                        >
                            <div className="relative w-full h-[150px] rounded-lg overflow-hidden mb-1">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="object-cover filter w-full h-full"
                                />
                            </div>
                            {/* Title */}
                            <h2 className="text-4xl font-bold text-center  text-white capitalize mb-2">
                                {item.title}
                            </h2>
                            {/* Description and ID */}
                            <h3 className=" justify-between text-center items-center text-white">
                                {item.desc}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MenuPortal;
