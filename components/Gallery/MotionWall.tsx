import React, { useState } from 'react';
import { useDeviceOrientation } from "@libs/hooks/useDeviceOrientation";
import {Alert} from "@components/Utils/Alert";

type ParallaxWrapperProps = {
    backgroundImage: string;
    children: React.ReactNode;
    backgroundSize?: string;  // Optional: Allow customization of the background size
    smooth?: boolean;  // Optional: Whether to apply smooth transitions
};

const ParallaxMotionWrapper: React.FC<ParallaxWrapperProps> = ({
                                                             backgroundImage,
                                                             children,
                                                             backgroundSize = "300%",  // Default background size to avoid gaps
                                                             smooth = true,  // Enable smooth transition by default
                                                         }) => {
    // @ts-ignore
    const { orientation, requestAccess, error, permissionDenied } = useDeviceOrientation();
    const [accessGranted, setAccessGranted] = useState(false);

    const handleRequestAccess = async () => {
        const granted = await requestAccess();
        setAccessGranted(granted);
    };

    // Apply parallax styles
    const parallaxStyles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: orientation
            ? `${50 + (orientation.gamma ?? 0) * 3}% ${50 + (orientation.beta ?? 0) * 2}%`
            : '50% 50%',  // Fallback for default positioning
        backgroundSize: backgroundSize,  // Customizable background size
        backgroundRepeat: "no-repeat",
        transition: smooth ? 'background-position 0.5s ease-out' : undefined,  // Optional smooth transition
    };

    // Handle errors and permission denied cases
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (permissionDenied) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-500">
                    You have denied motion permissions. Please go to your browser settings and allow motion & orientation access to enable this feature.
                </p>
            </div>
        );
    }

    if (!accessGranted) {
        return (
            //popup to request access
            <div className={"flex p-4 h-screen  items-center bg-transparent"}>
                <Alert  type={
                    "info"
                } title={
                    "This page uses motion & orientation sensors to feel more immersive."
                }  >
                    <div className={"flex justify-center items-center"}>
                        <button
                            className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-blue-600"
                            onClick={handleRequestAccess}
                        >Enable Motion
                        </button>
                    </div>
                </Alert>
            </div>

        );
    }

    return (
        <div
            className="w-screen h-screen"
            style={parallaxStyles}  // Apply parallax effect to background
        >
            <div className="parallax-element h-full w-full">
                {children}  {/* Render the children passed to the wrapper */}
            </div>
        </div>
    );
};

export default ParallaxMotionWrapper;
