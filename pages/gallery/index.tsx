// import React from "react";
// import Gallery3D from "@components/Gallery";
// const GalleryScreen = () => {
// 	return (
// 		<div className={"fixed w-screen h-screen"}>
// 			<Gallery3D />
// 		</div>
// 	);
// };
//
// export default GalleryScreen;

import React from "react";
import Gallery3D from "@components/Gallery";
import PageWrapper from "@components/Utils/PageWrapper";

const GalleryScreen: React.FC = () => {
    
    return (
        <div className="fixed w-screen h-screen">
            <PageWrapper>
                <Gallery3D />
            </PageWrapper>
        </div>
    );
};

export default GalleryScreen;
