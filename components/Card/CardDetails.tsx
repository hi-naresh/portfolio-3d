import Link from "next/link";
import React from "react";

interface CardProps{
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    link: string;
}
export const CardDetails = ({ project, isDetail } : {project: CardProps, isDetail :boolean}) => {
    const width = isDetail ? "w-1/2" : "w-full";
    return(
        <>
            <div className={`m-1.5 pl-1 ${width} h-[100%] rounded-2xl overflow-hidden`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-[1.6rem] border-[1px] border-white/50 h-full object-cover"
                />
            </div>
            {isDetail && (
                <div className={` ${width} m-2 p-2 h-full flex flex-col justify-center space-y-4 `}>
                    {/* Title */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <h2 className="text-white text-xl font-semibold">{project.title}</h2>
                    </div>
                    {/* Description */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <p className="text-white text-sm">{project.description}</p>
                    </div>
                    {/* Tech Stack */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <span className="text-white text-sm">Tech Used: {project.tech}</span>
                    </div>
                    {/* Buttons */}
                    <div className="flex space-x-4 justify-center">
                        <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                            <img className="w-6 h-6 filter invert" src="/icons/site/icon8.svg"/>
                        </button>
                        <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                            <img className="w-6 h-6 filter invert" src="/icons/site/icon7.svg"/>
                        </button>
                        <Link href={project.link}
                              className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                            <img className="w-6 h-6 filter text-white" src="/icons/site/icon6.svg"/>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardDetails;