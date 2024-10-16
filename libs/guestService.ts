import {Project} from "../@types/project";
import {incrementProjectStat} from "../data/repo";

export const handleLikeClick = (
    project: Project,
    setStats: (stats: (prevStats: any) => any) => void,
    setIsReviewModalOpen: (open: boolean) => void
) => {
    incrementProjectStat(project.id, "likes");
    setStats((prevStats) => ({ ...prevStats, likes: prevStats.likes + 1 }));
    setIsReviewModalOpen(true); // Open the review modal
    alert("Thank you for liking the project!");
};

// Function to handle the Share button click
export const handleShareClick = (
    project: Project,
    setStats: (stats: (prevStats: any) => any) => void
) => {
    incrementProjectStat(project.id, "shares");
    setStats((prevStats) => ({ ...prevStats, shares: prevStats.shares + 1 }));
    const slug = project.title.toLowerCase().replace(/\s+/g, '-');
    const shareUrl = `${window.location.origin}/project/${slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Project link copied to clipboard!");
    });
};

// Function to handle the Redirect button click
export const handleRedirectClick = (
    project: Project,
    setStats: (stats: (prevStats: any) => any) => void
) => {
    incrementProjectStat(project.id, "redirects");
    setStats((prevStats) => ({ ...prevStats, redirects: prevStats.redirects + 1 }));
};
