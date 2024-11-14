import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Download } from 'lucide-react';

interface NavControlsProps {
    toggleDarkMode: () => void;
    downloadPDF: () => void;
    isDarkMode: boolean;
}

const NavControls: React.FC<NavControlsProps> = ({ toggleDarkMode, downloadPDF, isDarkMode }) => {
    return (
        <motion.div
            className="fixed md:top-0 xs:top-0 p-2 xs:-mt-6 md:mt-8 w-full flex justify-center"
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={{ scaleX: 1, scaleY: 1 }}
            exit={{ scaleX: 0, scaleY: 0}}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
        >
            <motion.div
                className="p-2 h-12 rounded-full flex justify-between items-center space-x-4 bg-black dark:bg-white/10 bg-opacity-10 backdrop-filter backdrop-blur-sm"
                initial={{ width: 0 }}
                animate={{ width: "fit-content"}}
                transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
            >
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full  hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                    onClick={downloadPDF}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
                    aria-label="Download PDF"
                >
                    <Download size={20} />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default NavControls;
