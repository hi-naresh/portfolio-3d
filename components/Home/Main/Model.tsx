// // import {useGLTF} from "@react-three/drei";
// // import React, {useEffect, useRef, useState} from "react";
// // import * as THREE from "three";
// // import {useFrame} from "@react-three/fiber";
// //
// // function Model({ url }: { url: string }) {
// //     const { scene } = useGLTF(url);
// //     const headRef = useRef<THREE.Object3D>();
// //     const glassesRef = useRef<THREE.Object3D>();
// //     const glassesRef1 = useRef<THREE.Object3D>();
// //     const [transition, setTransition] = useState(false);
// //
// //     // make scene in highest quality
// //     // scene.attach(
// //     //     new THREE.AmbientLight(0xffffff, -0.5)
// //     // )
// //    
// //     // scene.traverse((child) => {
// //     //         if (child instanceof THREE.Mesh) {
// //     //             child.material = new THREE.MeshStandardMaterial({
// //     //                 color: child.material.color,
// //     //                 map: child.material.map,
// //     //                 roughness: 0.7,
// //     //                 metalness: 0.3,
// //     //             });
// //     //         }
// //     //     }
// //     // );
// //
// //     useEffect(() => {
// //         // Find and reference the head
// //         headRef.current = scene.getObjectByName('Head');
// //         glassesRef.current = scene.getObjectByName('avaturn_glasses_0'); // Replace with the actual name of the glasses object
// //         glassesRef1.current = scene.getObjectByName('avaturn_glasses_1'); // Replace with the actual name of the glasses object
// //         //hide the glasses
// //         // if (glassesRef.current) {
// //         //     glassesRef.current.visible = false;
// //         // }
// //         // if (glassesRef1.current) {
// //         //     glassesRef1.current.visible = false;
// //         // }
// //        
// //         // Access and adjust bone positions to achieve a resting pose
// //         const leftArm = scene.getObjectByName('LeftArm');
// //         const rightArm = scene.getObjectByName('RightArm');
// //         const leftForeArm = scene.getObjectByName('LeftForeArm');
// //         const rightForeArm = scene.getObjectByName('RightForeArm');
// //         const leftHand = scene.getObjectByName('LeftHand');
// //         const rightHand = scene.getObjectByName('RightHand');
// //
// //         // Adjust the pose to remove T-pose
// //         if (leftArm) {
// //             leftArm.rotation.x = Math.PI / 2.2;
// //             leftArm.rotation.y = 0;
// //         }
// //         if (leftForeArm) {
// //             leftForeArm.rotation.x = 0;
// //             leftForeArm.rotation.y = -Math.PI / 8;
// //         }
// //         if (leftHand) {
// //             leftHand.rotation.x = -Math.PI / 16;
// //             leftHand.rotation.y = -Math.PI / 8;
// //         }
// //
// //         if (rightArm) {
// //             rightArm.rotation.x = Math.PI / 2.2;
// //             rightArm.rotation.z = 0;
// //         }
// //         if (rightForeArm) {
// //             rightForeArm.rotation.x = 0;
// //             rightForeArm.rotation.y = Math.PI / 8;
// //         }
// //         if (rightHand) {
// //             rightHand.rotation.x = -Math.PI / 12;
// //             rightHand.rotation.y = -Math.PI / 8;
// //         }
// //
// //         // Scale and position the model to fit the screen properly
// //         scene.scale.set(3, 3, 3);
// //         scene.position.set(0, -4.6, 0.7);
// //         scene.rotation.y = 0;
// //     }, [scene]);
// //
// //     // Make the head follow the mouse with more sensitivity
// //     useFrame((state) => {
// //         if (headRef.current) {
// //             const { mouse } = state;
// //
// //             // Map mouse position to head rotation
// //             const targetRotationX = -mouse.y * Math.PI / 3;  // Up and down rotation (X-axis)
// //             const targetRotationY = mouse.x * Math.PI / 4;   // Left and right rotation (Y-axis)
// //
// //             // Clamp X-axis rotation to limit downward movement
// //             const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI , Math.PI / 60);
// //             // -Math.PI / 12 (about -15 degrees) for slight downward tilt
// //             // Math.PI / 4 (about 45 degrees) for upward freedom
// //
// //             // Smooth transition to the target rotations
// //             headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedRotationX, 0.1);
// //             headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
// //            
// //             // Transition the glasses
// //             if (glassesRef.current) {
// //                 if (transition) {
// //                     document.getElementById("black-overlay")!.style.opacity = "1";
// //                     setTimeout(() => {
// //                         window.location.href = '/gallery'; // Navigate to the virtual reality scene
// //                     }, 1000); // Wait for the fade to complete
// //                 }
// //             }
// //         }
// //     });
// //
// //
// //     // Handle the click on glasses
// //     const handleGlassesClick = () => {
// //         if (glassesRef.current) {
// //             setTransition(true);
// //         }
// //     };
// //
// //     return <primitive object={scene} onPointerDown={handleGlassesClick} />;
// // }
// //
// // export default Model;
//
// import {MeshTransmissionMaterial, useAnimations, useGLTF} from "@react-three/drei";
// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { useFrame, useThree } from "@react-three/fiber";
// import ModelCode from "@components/Home/Main/ModelJSX";
//
// function Model({ url }: { url: string }) {
//     // const {scene} = useGLTF(url);
//     const headRef = useRef<THREE.Object3D>();
//     // const glassesRef = useRef<THREE.Object3D>();
//     // const glassesRef1 = useRef<THREE.Object3D>();
//     // const {camera, viewport} = useThree();
//     // const [transition, setTransition] = useState(false);
//
//     // useEffect(() => {
//     //     // Find and reference the head and glasses
//     //     headRef.current = scene.getObjectByName("Head");
//     //     glassesRef.current = scene.getObjectByName("avaturn_glasses_0");
//     //     glassesRef1.current = scene.getObjectByName("avaturn_glasses_1");
//     //
//     //     // Adjust arms and hands (similar to your original logic)
//     //     const leftArm = scene.getObjectByName("LeftArm");
//     //     const rightArm = scene.getObjectByName("RightArm");
//     //     const leftForeArm = scene.getObjectByName("LeftForeArm");
//     //     const rightForeArm = scene.getObjectByName("RightForeArm");
//     //     const leftHand = scene.getObjectByName("LeftHand");
//     //     const rightHand = scene.getObjectByName("RightHand");
//     //
//     //     if (leftArm) {
//     //         leftArm.rotation.x = Math.PI / 2.2;
//     //     }
//     //     if (leftForeArm) {
//     //         leftForeArm.rotation.y = -Math.PI / 8;
//     //     }
//     //     if (leftHand) {
//     //         leftHand.rotation.x = -Math.PI / 16;
//     //     }
//     //     if (rightArm) {
//     //         rightArm.rotation.x = Math.PI / 2.2;
//     //     }
//     //     if (rightForeArm) {
//     //         rightForeArm.rotation.y = Math.PI / 8;
//     //     }
//     //     if (rightHand) {
//     //         rightHand.rotation.x = -Math.PI / 12;
//     //     }
//     //
//     //     // Responsive adjustments for model scale, position, and rotation
//     //     const adjustModelForScreenSize = () => {
//     //         const screenWidth = window.innerWidth;
//     //
//     //         if (screenWidth <= 768) {
//     //             // Mobile adjustments
//     //             scene.scale.set(2, 2, 2); // Smaller scale for mobile
//     //             scene.position.set(0, -3, 0.5); // Adjust the position to fit mobile screens
//     //         } else if (screenWidth <= 1024) {
//     //             // Tablet adjustments
//     //             scene.scale.set(2.5, 2.5, 2.5); // Medium scale for tablets
//     //             scene.position.set(0, -4.2, 0.7); // Adjust position for tablets
//     //         } else {
//     //             // Desktop adjustments
//     //             scene.scale.set(3, 3, 3); // Larger scale for desktops
//     //             scene.position.set(0, -4.6, 0.7); // Position for desktop
//     //         }
//     //         camera.updateProjectionMatrix(); // Ensure camera adjustments are applied
//     //     };
//     //
//     //     adjustModelForScreenSize();
//     //     window.addEventListener("resize", adjustModelForScreenSize);
//     //
//     //     return () => window.removeEventListener("resize", adjustModelForScreenSize);
//     // }, [scene, camera]);
//     //
//     // // Make the head follow the mouse
//     // useFrame((state) => {
//     //     if (headRef.current) {
//     //         const {mouse} = state;
//     //         const targetRotationX = -mouse.y * Math.PI / 3; // Up and down
//     //         const targetRotationY = mouse.x * Math.PI / 4; // Left and right
//     //         const clampedRotationX = THREE.MathUtils.clamp(
//     //             targetRotationX,
//     //             -Math.PI,
//     //             Math.PI / 60
//     //         );
//     //         headRef.current.rotation.x = THREE.MathUtils.lerp(
//     //             headRef.current.rotation.x,
//     //             clampedRotationX,
//     //             0.1
//     //         );
//     //         headRef.current.rotation.y = THREE.MathUtils.lerp(
//     //             headRef.current.rotation.y,
//     //             targetRotationY,
//     //             0.1
//     //         );
//     //     }
//     // });
//     //
//     // // Handle click on glasses
//     // const handleGlassesClick = () => {
//     //     if (glassesRef.current) {
//     //         setTransition(true);
//     //         // Fade to black effect
//     //         const blackOverlay = document.getElementById("black-overlay");
//     //         if (blackOverlay) {
//     //             blackOverlay.style.opacity = "1";
//     //             setTimeout(() => {
//     //                 window.location.href = "/gallery"; // Navigate to the virtual reality scene
//     //             }, 1000); // Wait for the fade to complete
//     //         }
//     //     }
//     // };
//
//     // return <primitive object={scene} onPointerDown={handleGlassesClick} />;
//     return (
//         <group ref={headRef}>
//             {/* Use the JSX-based model with customization */}
//             <ModelCode />
//         </group>
//     );
// }
//
//
// export default Model;
