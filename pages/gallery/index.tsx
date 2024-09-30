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

import React, { useState, useEffect } from "react";
import Gallery3D from "@components/Gallery";
import LoadingAnimation from "../loading";

const GalleryScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Effect to handle the loading state and enforce the 2-second delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Minimum 2-second delay before showing the gallery

        return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }, []);

    return (
        <div className="fixed w-screen h-screen">
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                // Actual Gallery3D content after loading completes
                <Gallery3D />
            )}
        </div>
    );
};

export default GalleryScreen;
