import {Text} from "@react-three/drei";
import React, {useState, useEffect} from "react";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const TypewriterText = () => {
    const fullText = "CLICK HERE!"; // The text to be typed out
    const [displayedText, setDisplayedText] = useState(""); // To hold the progressively typed-out text
    const typingSpeed = 100; // Typing speed in milliseconds
    const delayBetweenLoops = 2000; // Delay between loops in milliseconds
    const isMobile = useIsMobile();
    
    useEffect(() => {
        let index = 0; // Tracks the current letter index
        let typingInterval: string | number | NodeJS.Timeout | undefined; // Stores the interval ID

        const typeNextLetter = () => {
            setDisplayedText(fullText.substring(0, index + 1)); // Set the current substring based on index
            index++;

            if (index === fullText.length) {
                clearInterval(typingInterval); // Stop the typing when all letters are displayed
                setTimeout(() => {
                    index = 0; // Reset the index for the next loop
                    setDisplayedText(""); // Clear the text after the delay
                    startTyping(); // Restart the typing effect
                }, delayBetweenLoops);
            }
        };

        const startTyping = () => {
            typingInterval = setInterval(typeNextLetter, typingSpeed); // Start typing
        };

        startTyping(); // Start the effect on mount

        // Cleanup: clear the interval on component unmount
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <Text
            fontSize={isMobile ? 0.04 : 0.14} // Adjust font size accordingly
            color= {isMobile ? "#fff" : "#000"}// Make the text fill color black (invisible)
            outlineWidth={0.004} // Set the outline width for hollow text
            outlineColor="#fff" // The color of the text outline
            anchorX="center" // Center align the text on the X-axis
            anchorY="middle" // Center align the text on the Y-axis
            position={isMobile ? [-0.35, 0.32, 0] : [-1.1, 0.32, 0]} // Position text at the center of the texture
            rotation={[0, -Math.PI, Math.PI]} // Flip the text along the Y-axis
        >
            {displayedText}
        </Text>
    );
};

export default TypewriterText;
