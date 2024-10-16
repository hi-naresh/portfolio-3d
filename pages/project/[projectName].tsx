// import React from "react";
// import Gallery3D from "@components/Gallery";
// import PageWrapper from "@components/Utils/PageWrapper";
//
// const GalleryScreen: React.FC = () => {
//     return (
//         <div className="fixed w-screen h-screen">
//             <PageWrapper>
//                 <Gallery3D />
//             </PageWrapper>
//         </div>
//     );
// };
//
// export default GalleryScreen;

import React from "react";
import { GetServerSideProps } from "next";
import Gallery3D from "@components/Gallery";
import PageWrapper from "@components/Utils/PageWrapper";
import projectData from "../../data/projectData";  // Assuming you have a list of projectData

interface ProjectPageProps {
    projectIndex: number;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { projectName } = params as { projectName: string };

    // Find the project index based on the project name
    const projectIndex = projectData.findIndex(
        (project) => project.title.toLowerCase().replace(/\s+/g, '-') === projectName
    );

    if (projectIndex === -1) {
        // If project not found, return 404 page
        return {
            notFound: true,
        };
    }

    return {
        props: {
            projectIndex,  // Pass the project index to the component
        },
    };
};

const GalleryScreen: React.FC<ProjectPageProps> = ({ projectIndex }) => {
    return (
        <div className="fixed w-screen h-screen">
            <PageWrapper>
                <Gallery3D initialIndex={projectIndex} />  {/* Pass projectIndex to Gallery3D */}
            </PageWrapper>
        </div>
    );
};

export default GalleryScreen;
