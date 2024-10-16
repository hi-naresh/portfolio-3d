'use client';
import React, { useEffect, useState } from 'react';
import { useLoading } from "@libs/hooks/useLoading";
import LoadingAnimation from "../Layout/loading";
import {AnimatePresence, motion} from 'framer-motion'; // Import Framer Motion for animations

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const { loading } = useLoading(); // Assuming this is handling your actual loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setIsLoading(false); // Turn off loading animation after a short delay
            }, 2000); // Optional delay after loading completes

            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <AnimatePresence>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }} // Initial opacity for the fade-in effect
                    animate={{ opacity: 1 }}  // Animate to full opacity
                    transition={{ duration: 2.5 }} // Fade-in transition duration
                >
                    {children}
                </motion.div>
                )
            }
        </AnimatePresence>
    );
};

export default PageWrapper;
