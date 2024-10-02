import Link from "next/link";
import React from "react";

interface CardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    link: string;
}

export const CardDetails = ({
                                project,
                                isDetail,
                            }: {
    project: CardProps;
    isDetail: boolean;
}) => {
    const width = isDetail ? "md:w-1/2 w-full" : "w-full";
    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            {/* Image Section */}
            <div className={`m-1.5 pl-1 ${width} h-[100%] rounded-2xl overflow-hidden`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-[1.6rem] border-[1px] border-white/50 h-full object-cover"
                />
            </div>

            {/* Details Section */}
            {isDetail && (
                <div className={` ${width} mt-4 md:mt-0 md:m-2 p-2 h-full flex flex-col justify-center space-y-4`}>
                    {/* Title */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <h2 className="text-white text-lg md:text-xl font-semibold">{project.title}</h2>
                    </div>

                    {/* Description */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <p className="text-white text-sm md:text-base">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                        <span className="text-white text-sm md:text-base">Tech Used: {project.tech}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 justify-center">
                        <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/share.svg" alt="Share" />
                        </button>
                        <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/like.svg" alt="Like" />
                        </button>
                        <Link
                            href={project.link}
                            className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
                        >
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Redirect" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardDetails;
