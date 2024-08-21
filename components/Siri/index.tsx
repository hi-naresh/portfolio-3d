import { motion } from 'framer-motion';

interface GradientBlobProps {
    size: number;
}

const GradientBlob: React.FC<GradientBlobProps> = ({ size }) => {
    return (
        <>
            {/*<motion.div*/}
            {/*    className="absolute rounded-full p-10 overflow-clip"*/}
            {/*    style={{*/}
            {/*        width: `${size}px`,*/}
            {/*        height: `${size}px`,*/}
            {/*        border: '0.5px solid white',*/}
            {/*        boxShadow: 'inset 0 0 120px rgba(255, 255, 255, 1)',*/}
            {/*    }}*/}
            {/*    animate={{*/}
            {/*        scale: [1, 1.1, 1], // Slight pulsating effect*/}
            {/*        boxShadow: [*/}
            {/*            'inset 0 0 0 rgba(255, 255, 255, 1)',*/}
            {/*            'inset 0 0 360px rgba(255, 255, 255, 0)',*/}
            {/*        ],*/}
            {/*    }}*/}
            {/*    transition={{*/}
            {/*        duration: 5, // Slower animation*/}
            {/*        type: 'spring',*/}
            {/*        repeat: Infinity,*/}
            {/*        ease: 'easeInOut',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <motion.div*/}
            {/*        className="relative rounded-full bg-gradient-to-r from-transparent via-white to-transparent"*/}
            {/*        style={{*/}
            {/*            width: `${size * 1.33}px`, // Adjust based on the desired proportions*/}
            {/*            height: `${size * 1.33}px`,*/}
            {/*            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 70%), */}
            {/*        conic-gradient(*/}
            {/*        #FF005D, #4BECE9, #354AA4, #232262, #3D2E8B, #101243, #40236D, #3A558F, #9E66B3)`,*/}
            {/*            filter: 'blur(40px)',*/}
            {/*        }}*/}
            {/*        animate={{*/}
            {/*            rotate: [0, 20, -120, 30, -60, 0], // Randomized 3D-like rotation*/}
            {/*            scale: [1, 1.05, 1], // Scale up and down*/}
            {/*            backgroundPosition: ['0% 0%', '100% 100%', '50% 50%', '75% 25%', '25% 75%', '0% 100%'],*/}
            {/*            backgroundSize: ['100% 100%', '300% 300%', '50% 50%', '150% 150%', '25% 25%', '100% 100%'],*/}
            {/*        }}*/}
            {/*        transition={{*/}
            {/*            duration: 20, // Even slower animation for a soothing effect*/}
            {/*            repeat: Infinity,*/}
            {/*            ease: 'easeInOut',*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</motion.div>*/}
        </>
    );
};

export default GradientBlob;
