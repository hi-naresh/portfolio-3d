import React, {memo} from "react";
import {motion} from "framer-motion";
import {CardContainer} from "@components/ui/3d-card";
import CardDetails from "@components/Card/CardDetails";
import {ProjectCardProps} from "../../@types/project";

// eslint-disable-next-line react/display-name
const ProjectCardSlider: React.FC<ProjectCardProps> = memo(
    ({project, position, isActive, initialLoad, nextSlide, prevSlide, isPrev, currentIndex}) => (
        <motion.div
            className={`absolute glassmorphism ${
                position.zIndex === 10 ? "opacity-100" : "opacity-0"
            } rounded-4xl bg-white bg-opacity-5 project-card`}
            initial={{
                opacity: initialLoad ? 0 : 1,
                scale: initialLoad ? 0 : position.scale,
                x: 0,
                rotateY: 0,
                zIndex: 1,
            }}
            animate={{
                x: position.translateX,
                scale: position.scale,
                opacity: position.opacity,
                rotateY: position.rotateY,
                z: position.translateZ,
                zIndex: position.zIndex,
            }}
            exit={{opacity: 0, scale: 0.9}}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 24,
                mass: 0.6,
                duration: 0.6,
                delay: initialLoad ? position.zIndex * 0.08 : 0,
            }}
            style={{
                width: isActive
                    ? "620px"
                    : "420px", // Desktop width
                height: isActive
                    ? "90%"
                    : "100%", // Desktop height
                zIndex: position.zIndex,
                display: "flex",
            }}
        >
            {isActive ? (
                <CardContainer className="w-full h-[60vh] md:h-[50vh] lg:h-[60vh]">
                    <CardDetails currentIndex={currentIndex}
                                 isDetail={true}
                                 project={project}/>
                </CardContainer>
            ) : (
                <div
                    onClick={isPrev ? prevSlide : nextSlide}
                    className="flex w-full h-[97%] hover:scale-105 hover:border-2 hover:border-white/60 hover:rounded-4xl opacity-70 hover:opacity-100 transition-transform">
                    <CardDetails currentIndex={currentIndex} isDetail={false} project={project}/>
                </div>
            )}
        </motion.div>
    )
);

export default ProjectCardSlider;
