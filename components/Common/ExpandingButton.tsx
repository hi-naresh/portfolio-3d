import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoMenuOutline } from 'react-icons/io5';

const ExpandMenuButton = (
    {onClick, isMenu, isVisible}: {onClick: () => void,isMenu:boolean, isVisible: boolean}
) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Automatically trigger the expansion every 4 seconds
    useEffect(() => {
        const expandTimeout = setTimeout(() => {
            setIsExpanded(true);  // Expand after 5 seconds
        }, 5000);

        const closeTimeout = setTimeout(() => {
            setIsExpanded(false);  // Close after 2 seconds of being expanded
        }, 3000);

        return () => {
            clearTimeout(expandTimeout);
            clearTimeout(closeTimeout);
        };
    }, [isExpanded]);

    // Animation variants for the button
    const buttonVariants = {
        initial: { width: 40, height: 40 },
        expanded: { width: 120, height: 40, transition: { duration: 0.6 } },
        collapsed: { width: 40, height: 40, transition: { duration: 0.6 } }
    };

    // Animation variants for the icon/text inside the button
    const iconVariants = {
        visible: { opacity: 1, transition: { delay: 0.2 } },
        hidden: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed z-50 left-0 m-6">
                    <motion.button
                        title={isMenu ? "Close" : "Menu"}
                        onClick={onClick}
                        initial="initial"
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={buttonVariants}
                        className="flex items-center justify-center bg-blue-600 rounded-full text-white glassBg overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {isMenu ? (
                                <motion.div
                                    key="close"
                                    variants={iconVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    <IoClose className="p-1.5" size={32} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    variants={iconVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    <IoMenuOutline className="p-1.5" size={32} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Text appears when expanded */}
                        {isExpanded && (
                            <motion.span
                                key="menuText"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.6 } }}
                                exit={{ opacity: 0 }}
                                className="ml-2 text-lg font-bold"
                            >
                                {isMenu ? "Close" : "Menu"}
                            </motion.span>
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExpandMenuButton;
