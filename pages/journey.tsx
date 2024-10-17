import React, { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import ModelCode from "@components/Home/Model";
import { Footer } from "@components/Layout/Footer";
import LoadingAnimation from "@components/Layout/loading";
import { sidePose } from "@libs/interactions/posing";
import {headMouseInteraction, scrollInteraction} from "@libs/interactions/interactions";
import { Timeline } from "@components/ui/timeline";
import { timelineData } from "../data/timelineData";

const JourneySection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsLoaded(true);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <div className="h-full bg-black">
            {!isLoaded && <LoadingAnimation />}

            <div className="flex h-screen">
                {/* Left half with fixed Canvas */}
                <div className="w-[50%] h-full fixed left-0 top-0">
                    <motion.div
                        initial={{ opacity: 0, y: 500 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 500 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className="h-full"
                    >
                        <Canvas
                            camera={{ position: [0, 1.3, 3.2], fov: 35 }}
                            gl={{ antialias: false }}
                            className="h-full w-full"
                            onCreated={() => setIsLoaded(true)}
                        >
                            <pointLight intensity={1.5} color="#197CE2" distance={10} decay={3} position={[0.920, 0.16, 0.960]} />
                            <pointLight intensity={1.8} color="#fff" distance={30} decay={2} position={[-0.2, -0.16, 3.060]} />
                            <directionalLight intensity={0.9} color="#197CE2" position={[-0.320, 1.16, 0.90]} />
                            <OrbitControls enableZoom={false} enableRotate={false} />
                            <ModelCode
                                customPose={sidePose}
                                customInteraction={headMouseInteraction} props={undefined} onPopupTrigger={undefined}                            />
                        </Canvas>
                    </motion.div>
                </div>

                {/* Right half with scrollable content */}
                <div className="w-[50%] ml-[50%] h-full overflow-y-scroll">
                    <Timeline data={timelineData} />
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1.5, ease: "easeIn" }}
                    className="absolute bottom-0 w-full z-50"
                >
                    <Footer isVisible={false} />
                </motion.div>
            </div>
        </div>
    );
};

export default JourneySection;
