// import { motion } from "framer-motion";
// import CircleButton from "@components/Layout/Buttons/CircleButton";
// import projectData from "../../data/projectData";
//
// const NavBar = ({
//                     selectedIndex,
//                     prev: prevBtnDisabled,
//                     next: nextBtnDisabled,
//                     onPrev: onPrevButtonClick,
//                     onNext: onNextButtonClick
//                 }: any) => (
//     <motion.div
//         className="mt-12 w-[100%] flex justify-center items-center"
//         initial={{ width: 0, opacity: 0 }}
//         animate={{ width: "100%", opacity: 1 }}
//         transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}  // Main container animation
//     >
//         <motion.div
//             className="glassmorphism p-1 rounded-full flex justify-between items-center"
//             initial={{ width: 0 }}
//             animate={{ width: "20rem" }}
//             transition={{ delay: 0.1, duration: 1.8, ease: "circOut" }}  // Inner bar animation
//         >
//             {/* Prev Button with pop effect */}
//             <motion.div
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
//             >
//                 <CircleButton
//                     onClick={onPrevButtonClick}
//                     disabled={prevBtnDisabled}
//                     icon="/icons/site/icon9.svg"
//                 />
//             </motion.div>
//
//             {/* Title Text */}
//             <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 2.5, duration: 1 }}
//                 className="text-white pt-2 h-10 flex-col justify-center items-center text-lg font-bold"
//             >
//                 {projectData[selectedIndex]?.title}
//             </motion.p>
//
//             {/* Next Button with pop effect */}
//             <motion.div
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
//                 className="transform rotate-180"
//             >
//                 <CircleButton
//                     onClick={onNextButtonClick}
//                     disabled={nextBtnDisabled}
//                     icon="/icons/site/icon9.svg"
//                 />
//             </motion.div>
//         </motion.div>
//     </motion.div>
// );
//
// export default NavBar;

import { motion } from "framer-motion";
import CircleButton from "@components/Layout/Buttons/CircleButton";
import projectData from "../../data/projectData";

const NavBar = ({
                    selectedIndex,
                    prev: prevBtnDisabled,
                    next: nextBtnDisabled,
                    onPrev: onPrevButtonClick,
                    onNext: onNextButtonClick
                }: any) => (
    <motion.div
        className="mt-12 w-[100%] flex justify-center items-center"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
    >
        <motion.div
            className="glassmorphism p-1 w-[80%] rounded-full flex justify-between items-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.1, duration: 1.8, ease: "circOut" }}
            style={{ transformOrigin: "center" }}
        >
            {/* Prev Button with pop effect */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
            >
                <CircleButton
                    onClick={onPrevButtonClick}
                    disabled={prevBtnDisabled}
                    icon="/icons/site/icon9.svg"
                />
            </motion.div>

            {/* Title Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="text-white pt-2 h-10 flex-col justify-center items-center text-lg font-bold"
            >
                {projectData[selectedIndex]?.title}
            </motion.p>

            {/* Next Button with pop effect */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1}}
                transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
            >
                <div className="transform rotate-180">
                    <CircleButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        icon="/icons/site/icon9.svg"
                    />
                </div>
            </motion.div>
        </motion.div>
    </motion.div>
);

export default NavBar;
