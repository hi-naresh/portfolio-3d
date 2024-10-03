// repo.js

const projectStats = {};

/**
 * Initialize the stats for a project if it doesn't exist
 */
const initializeProjectStats = (projectId) => {
    if (!projectStats[projectId]) {
        projectStats[projectId] = {
            likes: 0,
            shares: 0,
            redirects: 0
        };
    }
};

/**
 * Get the stats for a project
 */
export const getProjectStats = (projectId) => {
    initializeProjectStats(projectId);
    return projectStats[projectId];
};

/**
 * Increment likes, shares, or redirects
 */
export const incrementProjectStat = (projectId, stat) => {
    initializeProjectStats(projectId);
    if (projectStats[projectId][stat] !== undefined) {
        projectStats[projectId][stat]++;
    }
};
