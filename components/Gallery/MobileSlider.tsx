// import React, { memo } from 'react';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-cards';
// import { EffectCards } from 'swiper/modules';
//
// import projects from "../../data/projects"; // Optional: for additional styling
//
// export default function MobileSlider() {
//     return (
//         <div className={
//             "fixed w-screen h-screen flex justify-center items-center"
//         }>
//             <Swiper
//                 effect={'cards'}
//                 grabCursor={true}
//                 modules={[EffectCards]}
//                 className="mySwiper"
//             >
//                 {projects.map((project) => (
//                     <SwiperSlide key={project.id}>
//                         <ProjectCardMobile project={project} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }
//
//
// interface ProjectCardMobileProps {
//     project: {
//         id: number;
//         image: string;
//         title: string;
//         description: string;
//         tech: string;
//         link: string;
//     };
// }
//
// // eslint-disable-next-line react/display-name
// const ProjectCardMobile: React.FC<ProjectCardMobileProps> = memo(({ project }) => {
//     return (
//         <motion.div
//             className="w-full h-[50vh] rounded-lg shadow-lg bg-white text-black overflow-hidden transition-all duration-300 ease-in-out"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: 'spring', stiffness: 180, damping: 24, duration: 0.6 }}
//         >
//             {/* Image */}
//             <div className="h-[40%] w-full bg-gray-300">
//                 <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover"
//                 />
//             </div>
//
//             {/* Content */}
//             <div className="p-4 h-[60%] flex flex-col justify-between">
//                 <div>
//                     <h2 className="text-xl font-semibold">{project.title}</h2>
//                     <p className="text-sm text-gray-600">{project.description}</p>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-500">
//                     <p>Technologies: {project.tech}</p>
//                     <a
//                         href={project.link}
//                         className="text-blue-600 hover:underline mt-2"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         View Project
//                     </a>
//                 </div>
//             </div>
//         </motion.div>
//     );
// });
//

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";

interface ProjectCardMobileProps {
    project: {
        id: number;
        image: string;
        title: string;
        description: string;
        tech: string;
        link: string;
    };
    isActive: boolean;
}

// eslint-disable-next-line react/display-name
const MobileProjectCardSlider: React.FC<ProjectCardMobileProps> = memo(({ project}) => {
    return (
        <div
            className={`relative w-full min-h-[60vh] p-2 h-full  rounded-4xl   `}
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
        >
            <CardDetails project={project} />
        </div>
    );
});


interface CardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    link: string;
}

const CardDetails = ({ project }: { project: CardProps }) => {
    //display description only when clicked on read description
    const [showDescription, setShowDescription] = React.useState(false);
    return (
        <div className="flex h-full w-full flex-col">
            <div className={`mb-2 w-full h-screen  rounded-2xl overflow-hidden`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-[1.6rem] w-full border-[1px] border-white/50  object-cover"
                />
            </div>
            <div className="p-2 h-full flex flex-col justify-between text-white space-y-2">
                {/* Title */}
                <div className="p-3 rounded-2xl bg-black bg-opacity-20 border-[0.5px] border-white/40">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                </div>
                <div
                    onClick={() => setShowDescription(!showDescription)}

                    className="p-3 rounded-2xl bg-black bg-opacity-20 border-[0.5px] border-white/40">
                    <button
                        className="text-sm font-semibold"
                    >
                        {showDescription ? 'Hide Description' : 'Read Description'}
                    </button>
                    {showDescription && <p className="text-sm">{project.description}</p>}
                </div>
                
                {/* Tech Stack */}
                <div className="p-3 rounded-2xl bg-black bg-opacity-20 border-[0.5px] border-white/40">
                    <span className="text-sm">Tech Used: {project.tech}</span>
                </div>
                {/* Buttons */}
                <div className="flex space-x-4 justify-center">
                    <button className="p-2 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <img className="w-6 h-6 filter invert" src="/assets/icons/share.svg"/>
                    </button>
                    <button className="p-2 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <img className="w-6 h-6 filter invert" src="/assets/icons/like.svg"/>
                    </button>
                    <Link href={project.link}
                          className="p-2 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <img className="w-6 h-6 filter invert" src="/assets/icons/redirect.svg"/>
                    </Link>
                </div>
            </div>

        </div>
    );
};


import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import {EffectCards} from 'swiper/modules';
import projects from "../../data/projects";


const MobileProjectSlider: React.FC = () => {
    return (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-full max-w-[90vw] h-full max-h-[65vh]"
        >
            {projects.map((project, index) => (
                <SwiperSlide
                    className={"rounded-4xl overflow-clip "}
                    key={project.id}>
                    <MobileProjectCardSlider project={project} isActive={index === 0}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MobileProjectSlider;
