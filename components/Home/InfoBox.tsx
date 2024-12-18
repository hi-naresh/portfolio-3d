import React, { useState, useEffect } from "react";
import {AnimatePresence, motion} from "framer-motion";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";

const InfoContainer = () => {
    const [isExpanded, setIsExpanded] = useState(false); // State to track if the container is expanded

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the expanded state
    };

    // Automatically collapse the container after 3 seconds when expanded
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (isExpanded) {
            timer = setTimeout(() => {
                setIsExpanded(false); // Auto-collapse after 3 seconds
            }, 4000);
        }else {
            timer = setTimeout(
                () => {
                    setIsExpanded(true); // Auto-expand after 3 seconds
                },6000
            )
        }

        // Clear the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [isExpanded]);

    return (
        <AnimatePresence>
            <motion.div className="fixed m-6 right-0 z-50">
                <motion.button
                    title={"Info"}
                    onClick={toggleExpand}
                    initial={{scale: 1}}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                    className={`fixed right-0 m-6 mt-0 flex items-center justify-center rounded-full text-white glassBg`}
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key={"close"}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <IoClose className={"p-1"} size={36} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={"info"}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2, delay: 0.2 }} // Delay the entrance of this icon
                            >
                                <IoInformationCircleOutline className={"p-0.5"} size={36} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Expandable Info Container */}
                <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.7}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        transition={{ duration: 0.4, ease: "easeInOut"}}
                        className="bg-white/10 mt-12 xs:mr-24 md:mr-0 glassmorphism rounded-2xl p-2 w-full max-w-[460px] text-center text-white "
                    >
                        <p className="glassBg rounded-2xl mt-0 p-1 text-xs">
                            <strong>Click on the headset</strong> to view projects.
                        </p>
                        <p className="glassBg rounded-2xl mt-2 p-1 text-xs">
                            <strong>Click on the model</strong> to view developer info.
                        </p>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>

        </AnimatePresence>
    );
};

export default InfoContainer;
