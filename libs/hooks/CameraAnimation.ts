// import {useFrame, useThree} from "@react-three/fiber";
// import {useRef} from "react";
// import * as THREE from "three";
//
// const CameraAnimation = ({ 
//     menuVisible
//                          } : {menuVisible:boolean}) => {
//     const { camera } = useThree(); // Access the camera
//     const angleRef = useRef(0); // Track the angle for the circular path
//     const radiusRef = useRef(3.2); // Track the distance (radius)
//     const heightRef = useRef(1.4); // Track the height of the camera
//     const lookAtHeightRef = useRef(0); // Track the height of the 'lookAt' target for smooth transition
//
//     // Key camera positions for front and back
//     const frontPosition = { radius: 3.2, height: 1.4, angle: 0, zoom: 3.2 }; // Front is zoomed-in
//     const backPosition = { radius: 6.5, height: 3.4, angle: Math.PI, zoom: 5.6 }; // Back is zoomed-out
//
//     useFrame(() => {
//         // Interpolate between front and back position
//         const targetPosition = menuVisible ? frontPosition : backPosition;
//
//         // Smoothly interpolate the camera's angle, radius, and height for the arc
//         angleRef.current = THREE.MathUtils.lerp(angleRef.current, targetPosition.angle, 0.02); // Angle interpolation
//         radiusRef.current = THREE.MathUtils.lerp(radiusRef.current, targetPosition.zoom, 0.02); // Radius interpolation (zoom)
//         heightRef.current = THREE.MathUtils.lerp(heightRef.current, targetPosition.height, 0.02); // Height interpolation
//         lookAtHeightRef.current = THREE.MathUtils.lerp(lookAtHeightRef.current, menuVisible ? 0 : 1.6, 0.02); // Smooth 'lookAt' transition
//
//         const angle = angleRef.current;
//
//         // Calculate the new camera position along the arc
//         const targetX = radiusRef.current * Math.sin(angle); // X position
//         const targetZ = radiusRef.current * Math.cos(angle); // Z position
//
//         // Set the camera's position and ensure smooth look-at behavior
//         camera.position.set(targetX, heightRef.current, targetZ);
//
//         // Ensure the camera always smoothly looks at the model
//         camera.lookAt(0, lookAtHeightRef.current, 0);
//
//         // Update the camera's projection matrix
//         camera.updateProjectionMatrix();
//     });
//
//     return null; // No JSX needed
// };
//
// export default CameraAnimation;

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// @ts-ignore
const CameraAnimation = ({ menuVisible, popupVisible }) => {
    const { camera } = useThree();
    const angleRef = useRef(0);
    const radiusRef = useRef(3.2);
    const heightRef = useRef(1.4);
    const lookAtHeightRef = useRef(0);

    // Define three camera positions
    const frontPosition = useMemo(() => ({ radius: 3.2, height: 0.3, angle: 0, zoom: 3.6 }), []);
    const backPosition = useMemo(() => ({ radius: 6.5, height: 1.6, angle: Math.PI, zoom: 9.6 }), []);
    const popupPosition = useMemo(() => ({ radius: 6.0, height: -4.1, angle: 0, zoom: 14.0 }), []);

    // Easing factors for smoothness
    const defaultLerpFactor = 0.02;       // For front to back
    const popupLerpFactor = 0.01;         // For popup transitions

    useFrame(() => {
        // Determine target position based on visibility states
        const targetPosition = popupVisible
            ? popupPosition
            : (menuVisible ? frontPosition : backPosition);

        // Choose interpolation factor based on target
        const lerpFactor = popupVisible ? popupLerpFactor : defaultLerpFactor;

        // Smoothly interpolate camera parameters
        angleRef.current = THREE.MathUtils.lerp(angleRef.current, targetPosition.angle, lerpFactor);
        radiusRef.current = THREE.MathUtils.lerp(radiusRef.current, targetPosition.zoom, lerpFactor);
        heightRef.current = THREE.MathUtils.lerp(heightRef.current, targetPosition.height, lerpFactor);
        lookAtHeightRef.current = THREE.MathUtils.lerp(lookAtHeightRef.current, targetPosition.height, lerpFactor);

        const angle = angleRef.current;

        // Calculate the camera's position based on the interpolated values
        const targetX = radiusRef.current * Math.sin(angle);
        const targetZ = radiusRef.current * Math.cos(angle);

        // Set camera position and look-at for smooth animation
        camera.position.set(targetX, heightRef.current, targetZ);
        camera.lookAt(0, lookAtHeightRef.current, 0);
        camera.updateProjectionMatrix();
    });

    return null;
};

export default CameraAnimation;
