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
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProjectStats, incrementProjectStat } from "../../data/repo";
import ReviewModal from "@components/Forms/ReviewForm";

interface CardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    available: string;
    link: string;
}

const projectSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

export const CardDetails = ({
                                project,
                                isDetail,
                                currentIndex,
                            }: {
    project: CardProps;
    isDetail: boolean;
    currentIndex: number | undefined;
}) => {
    const [stats, setStats] = useState({ likes: 0, shares: 0, redirects: 0 });
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState({ like: false, share: false, redirect: false });
    const [name, setName] = useState("");
    const [review, setReview] = useState("");

    // Fetch stats from the mock repo when the component mounts
    useEffect(() => {
        const projectStats = getProjectStats(project.id);
        setStats(projectStats);
    }, [project.id]);

    // Handle the Like button click
    const handleLikeClick = () => {
        incrementProjectStat(project.id, "likes");
        setStats((prevStats) => ({ ...prevStats, likes: prevStats.likes + 1 }));
        setIsReviewModalOpen(true); // Open the review modal
    };

    const handleShareClick = () => {
        incrementProjectStat(project.id, "shares");
        setStats((prevStats) => ({ ...prevStats, shares: prevStats.shares + 1 }));
        const slug = projectSlug(project.title);
        const shareUrl = `${window.location.origin}/gallery/${slug}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Project link copied to clipboard!");
        });
    };

    // Handle the redirect button click
    const handleRedirectClick = () => {
        incrementProjectStat(project.id, "redirects");
        setStats((prevStats) => ({ ...prevStats, redirects: prevStats.redirects + 1 }));
    };

    // Handle the review modal submission
    const handleReviewSubmit = () => {
        if (!name) {
            alert("Name is required.");
            return;
        }
        alert(`Thank you for your review, ${name}!`);
        setIsReviewModalOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            {/* Image Section */}
            <div className={`m-1.5 pl-1 ${isDetail ? "md:w-1/2 w-full" : "w-full"} h-[100%] rounded-2xl overflow-hidden`}>
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
                    <div className="flex space-x-4 justify-center relative">
                        {/* Like Button */}
                        <button
                            className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                            onClick={handleLikeClick}
                            onMouseEnter={() => setShowTooltip({ ...showTooltip, like: true })}
                            onMouseLeave={() => setShowTooltip({ ...showTooltip, like: false })}
                        >
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/like.svg" alt="Like" />
                            {showTooltip.like && (
                                <span
                                    className="absolute w-[15rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                    Like this project
                                </span>
                            )}
                        </button>

                        {/* Share Button */}
                        <button
                            className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                            onClick={handleShareClick}
                            onMouseEnter={() => setShowTooltip({ ...showTooltip, share: true })}
                            onMouseLeave={() => setShowTooltip({ ...showTooltip, share: false })}
                        >
                            <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/share.svg" alt="Share" />
                            {showTooltip.share && (
                                <span
                                    className="absolute w-[15rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                    Share this project
                                </span>
                            )}
                        </button>

                        {/* Redirect Button */}
                        {project.link === "#" ? (
                            <div
                                className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                                onMouseEnter={() => setShowTooltip({ ...showTooltip, redirect: true })}
                                onMouseLeave={() => setShowTooltip({ ...showTooltip, redirect: false })}
                            >
                                <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Coming Soon" />
                                {showTooltip.redirect && (
                                    <span className="absolute w-[15rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                        {project.available}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <Link href={project.link} onClick={handleRedirectClick} target="__blank">
                                <div
                                    className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20 relative"
                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, redirect: true })}
                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, redirect: false })}
                                >
                                    <img className="w-5 h-5 md:w-6 md:h-6 filter invert" src="/assets/icons/redirect.svg" alt="Redirect" />
                                    {showTooltip.redirect && (
                                        <span
                                            className="absolute w-[10rem] bg-black/60 mt-1 ml-10 left-1/2  transform -translate-x-1/2 px-2 py-1 font-black text-center  text-sm rounded-xl">
                                            Go to Live Project
                                        </span>
                                    )}
                                </div>
                            </Link>
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
                            onSubmit={handleReviewSubmit}
                            onClose={() => setIsReviewModalOpen(false)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CardDetails;
