// import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
//
// export const ModelHeadInteraction = (headRef: { current: { rotation: { x: number; y: number; }; }; }, isMobile: any, orientation: { beta: any; gamma: any; }) => {
//     useFrame((state) => {
//         const { mouse } = state;
//
//         if (headRef.current) {
//             if (isMobile) {
//                 const targetRotationX = THREE.MathUtils.degToRad(orientation.beta ?? 0); // Up/Down tilt
//                 const targetRotationY = THREE.MathUtils.degToRad(orientation.gamma ?? 0); // Left/Right tilt
//
//                 // Sensitivity adjustments for device orientation
//                 const ySensitivity = -1.5; // Increase Y-axis sensitivity (vertical rotation)
//                 const xSensitivity = 1.5;  // Increase X-axis sensitivity (horizontal rotation)
//
//                 // Apply the rotation smoothly using `lerp`
//                 headRef.current.rotation.x = THREE.MathUtils.lerp(
//                     headRef.current.rotation.x,
//                     targetRotationX * xSensitivity * -0.5, // Adjust scale for smooth movement
//                     0.1
//                 );
//                 headRef.current.rotation.y = THREE.MathUtils.lerp(
//                     headRef.current.rotation.y,
//                     targetRotationY * ySensitivity * 0.8,  // Adjust scale for smooth movement
//                     0.1
//                 );
//             } else {
//                 const targetRotationX = -mouse.y * Math.PI / 3;
//                 const targetRotationY = mouse.x * Math.PI / 4;
//
//                 // Clamp and smooth the mouse interaction for the head
//                 const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI, Math.PI / 60);
//                 headRef.current.rotation.x = THREE.MathUtils.lerp(
//                     headRef.current.rotation.x,
//                     clampedRotationX,
//                     0.1
//                 );
//                 headRef.current.rotation.y = THREE.MathUtils.lerp(
//                     headRef.current.rotation.y,
//                     targetRotationY,
//                     0.1
//                 );
//             }
//         }
//     });
// };

// @ts-ignore
export const headMouseInteraction = (state, { headRef }) => {
    const { mouse } = state;
    if (headRef.current) {
        const targetRotationX = -mouse.y * Math.PI / 3;
        const targetRotationY = mouse.x * Math.PI / 4;
        const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI, Math.PI / 60);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedRotationX, 0.1);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
    }
};


// @ts-ignore
export const scrollInteraction = (state, { headRef }) => {
    // if (!headRef.current) return;

    // Get scroll progress and calculate normalized scroll
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1); // Ensure scrollProgress is between 0 and 1

    // Limit the head rotation (set bounds so it doesn't rotate out of bounds)
    // const rotationX = THREE.MathUtils.lerp(-Math.PI / 16, Math.PI / 16, scrollProgress); // Up/Down tilt (optional)
    const rotationY = THREE.MathUtils.lerp(-Math.PI / 6, Math.PI / 6, scrollProgress);  // Left/Right rotation

    
    headRef.current.rotation.y = rotationY;
};


