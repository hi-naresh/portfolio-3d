// import Link from "next/link";
// import React from "react";
//
// interface CardProps {
//     id: number;
//     image: string;
//     title: string;
//     description: string;
//     tech: string;
//     link: string;
// }
//
// export const CardDetails = ({
//                                 project,
//                                 isDetail,
//                             }: {
//     project: CardProps;
//     isDetail: boolean;
// }) => {
//     const width = isDetail ? "md:w-1/2 w-full" : "w-full";
//     return (
//         <div className="flex flex-col md:flex-row h-full w-full">
//             {/* Image Section */}
//             <div className={`m-1.5 pl-1 ${width} h-[100%] rounded-2xl overflow-hidden`}>
//                 <img
//                     src={project.image}
//                     alt={project.title}
//                     className="rounded-[1.6rem] border-[1px] border-white/50 h-full object-cover"
//                 />
//             </div>
//
//             {/* Details Section */}
//             {isDetail && (
//                 <div className={` ${width} mt-4 md:mt-0 md:m-2 p-2 h-full flex flex-col justify-center space-y-4`}>
//                     {/* Title */}
//                     <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
//                         <h2 className="text-white text-lg md:text-xl font-semibold">{project.title}</h2>
//                     </div>
//
//                     {/* Description */}
//                     <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
//                         <p className="text-white text-sm md:text-base">{project.description}</p>
//                     </div>
//
//                     {/* Tech Stack */}
//                     <div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
//                         <span className="text-white text-sm md:text-base">Tech Used: {project.tech}</span>
//                     </div>
//
//                     {/* Buttons */}
//                     <div className="flex space-x-4 justify-center">
//                         <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
//                             <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/share.svg" alt="Share" />
//                         </button>
//                         <button className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
//                             <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/like.svg" alt="Like" />
//                         </button>
//                         <Link
//                             href={project.link}
//                             className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
//                         >
//                             <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Redirect" />
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default CardDetails;
import React, { useEffect, useState } from "react";
import { getProjectStats } from "../../data/repo";
import ReviewModal from "@components/Forms/ReviewForm";
import { Project } from "../../@types/project";
import {handleLikeClick, handleRedirectClick, handleShareClick} from "@libs/guestService";

export const CardDetails = ({
                                project,
                                isDetail,
                                currentIndex,
                            }: {
    project: Project;
    isDetail: boolean;
    currentIndex: number | undefined;
}) => {
    const [stats, setStats] = useState({ likes: 0, shares: 0, redirects: 0 });
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState({ like: false, share: false, redirect: false });

    // Fetch stats from the mock repo when the component mounts
    useEffect(() => {
        const projectStats = getProjectStats(project.id);
        setStats(projectStats);
    }, [project.id]);

    return (
        <div className="flex flex-col z-50 md:flex-row h-full w-full">
            {/* Image Section */}
            <div className={`mx-1.5 pl-1 ${isDetail ? "md:w-1/2 w-full" : "w-full"} h-[100%] rounded-2xl overflow-hidden`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-[1.6rem] border-[1px] border-white/50 h-full object-cover"
                />
            </div>

            {/* Details Section */}
            {isDetail && (
                <div className="md:w-1/2 mt-4 md:mt-0 md:m-2 p-2 h-full flex flex-col justify-center space-y-4">
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
                    <div className="flex space-x-8 justify-center relative">
                        {/* Like Button */}
                        <button
                            title={currentIndex === 0 ? "Like it!" : ""}
                            className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                            onClick={() => handleLikeClick(project, setStats, setIsReviewModalOpen)}
                            onMouseEnter={() => setShowTooltip({ ...showTooltip, like: true })}
                            onMouseLeave={() => setShowTooltip({ ...showTooltip, like: false })}
                        >
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/like.svg" alt="Like" />
                            {showTooltip.like && (
                                <span className="absolute w-[5rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                  Like it!
                                </span>
                            )}
                        </button>

                        {/* Share Button */}
                        <button
                            title="Share it!"
                            className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                            onClick={() => handleShareClick(project, setStats)}
                            onMouseEnter={() => setShowTooltip({ ...showTooltip, share: true })}
                            onMouseLeave={() => setShowTooltip({ ...showTooltip, share: false })}
                        >
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/share.svg" alt="Share" />
                            {showTooltip.share && (
                                <span className="absolute w-[5rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                  Share it!
                                </span>
                            )}
                        </button>

                        {/* Redirect Button */}
                        {project.link === "#" ? (
                            <div
                                title={project.available}
                                className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                                onMouseEnter={() => setShowTooltip({ ...showTooltip, redirect: true })}
                                onMouseLeave={() => setShowTooltip({ ...showTooltip, redirect: false })}
                            >
                                <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Coming Soon" />
                                {showTooltip.redirect && (
                                    <span className="absolute min-w-[6rem] max-w-[15rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-1 py-1 font-black text-center  text-sm rounded-xl">
                    {project.available}
                  </span>
                                )}
                            </div>
                        ) : (
                                <div
                                    title="Checkout project!"
                                    className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, redirect: true })}
                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, redirect: false })}
                                    onClick={() => handleRedirectClick(project, setStats)}
                                >
                                    <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Redirect" />
                                    {showTooltip.redirect && (
                                        <span className="absolute w-[6rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">Check live!
                    </span>
                                    )}
                                </div>
                        )}
                    </div>

                    {/* Display stats */}
                    <div className="flex justify-around mt-4">
                        <span className="text-white text-sm">Likes: {stats.likes}</span>
                        <span className="text-white text-sm">Shares: {stats.shares}</span>
                        <span className="text-white text-sm">Redirects: {stats.redirects}</span>
                    </div>

                    {/* Review Modal */}
                    {isReviewModalOpen && (
                        <ReviewModal
                            onSubmit={() => {
                                // @ts-ignore
                                if (!name) {
                                    alert("Name is required.");
                                    return;
                                }
                                alert(`Thank you for your review, ${name}!`);
                                setIsReviewModalOpen(false);
                            }}
                            onClose={() => setIsReviewModalOpen(false)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CardDetails;
