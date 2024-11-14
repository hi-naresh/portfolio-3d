import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import ModelCode from "@components/Home/Model";
import { Timeline } from "@components/ui/timeline";
import { timelineData } from "../data/timelineData";
import { sideRightPose} from "@libs/interactions/posing";
import { scrollInteraction} from "@libs/interactions/interactions";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const JourneySection = () => {
    const isMobile = useIsMobile(); // Detect if the device is mobile

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <div className="journey-container bg-black" id="scroll-section">
            <div
                className="canvas-container bg-white/[3%]"
                style={{
                    position: "fixed",
                    width: isMobile ? "100%" : "50%", // Full width for mobile, split width for desktop
                    height: "100%",
                }}
            >
                <Canvas
                    camera={{position: [0, 1.3, 3.2], fov: 35}}
                    gl={{antialias: false}}
                    style={{background: "transparent"}}
                    className="z-0 pt-[3rem]"
                    onCreated={() => setIsLoaded(true)} // Mark as loaded when the canvas is created
                >
                    <pointLight
                        intensity={1.5}
                        color="#197CE2"
                        distance={10}
                        decay={3}
                        position={[0.92, 0.16, 0.96]}
                    />
                    <pointLight
                        intensity={1.8}
                        color="#fff"
                        distance={30}
                        decay={2}
                        position={[-0.2, -0.16, 3.06]}
                    />
                    <directionalLight
                        intensity={0.9}
                        color="#197CE2"
                        position={[-0.32, 1.16, 0.9]}
                    />
                    <OrbitControls enableZoom={false} enableRotate={false}/>
                    <ModelCode
                        position={[0,0,0]}
                        onToolTip={false}
                        play={false}
                        customAnimation={scrollInteraction}
                        props={undefined}
                        onPopupTrigger={undefined}
                        customPose={sideRightPose}
                        onGlassClick={undefined}
                        customInteraction={undefined}
                    />
                </Canvas>
            </div>
            {isMobile? (
                <div
                    className="content-container"
                    style={{width: "100%", marginLeft: "0%", height: "300vh"}}
                >
                    <Timeline data={timelineData}/>
                </div>
                ):(
                <motion.div
                    className="content-container bg-white/[6%]"
                    style={{
                        width: "50%",
                        marginLeft: "50%", height: "300vh"}}
                >
                    <Timeline data={timelineData}/>
                </motion.div>
            )
            }
        </div>
    );
};


export default JourneySection;
