// import React, { useEffect, useRef, useState} from "react";
// import { useGLTF } from "@react-three/drei";
// import {useFrame} from "@react-three/fiber";
// import * as THREE from "three";
// import {useDeviceOrientation} from "libs/hooks/useDeviceOrientation";
// import {useIsMobile} from "libs/hooks/useIsMobile";
// import ToolTip from "@components/Home/Tooltip";
// import VideoMaterial from "@components/Home/VideoMaterial";
// export default function ModelCode({ props, onPopupTrigger }) {
//     const group = useRef();
//     const { nodes, materials } = useGLTF("/model/mymodel.glb");
//
//     // Handlers for tooltips
//     const [hoveredPart, setHoveredPart] = useState(null);
//
//     // Hover and unhover handlers attached at group level
//     const handlePointerOver = (e) => {
//         if (e.object && e.object.name) {
//             setHoveredPart(e.object.name); // Set the name of the mesh being hovered
//             document.body.style.cursor = 'pointer'; // Change the cursor to pointer
//         }
//     };
//
//     const handlePointerOut = (e) => {
//         if (e.object && e.object.name === hoveredPart) {
//             setHoveredPart(null); // Clear the hovered part when pointer leaves
//             document.body.style.cursor = 'default'; // Reset the cursor to default
//         }
//     };
//
//
//     const headRef = useRef(); // Reference for the head
//     const glassesRef = useRef(); // Reference for the glasses
//     const glassesRef1 = useRef(); // Reference for the second glasses mesh
//     const [ transition,setTransition] = useState(false);
//     // const lightRef = useRef(); // Reference for the moving ambient light
//
//     const handleBodyClick = () => {
//         if (onPopupTrigger) {
//             onPopupTrigger(); // Trigger the popup
//         }
//     }
//
//
//     // Use the device orientation hook
//     // const { orientation, requestAccess, error, permissionDenied } = useDeviceOrientation();
//     const {
//         orientation,
//         requestAccess,
//         revokeAccess,
//         error,
//         resetOrientation
//     } = useDeviceOrientation({
//     });
//
//     const [accessGranted, setAccessGranted] = useState(false);
//
//     // Request access to the device orientation
//     useEffect(() => {
//         const requestOrientationAccess = async () => {
//             const granted = await requestAccess();
//             setAccessGranted(granted);
//         };
//         requestOrientationAccess().then(r => 
//             console.log("Requesting access to device orientation")
//         );
//     }, [requestAccess]);
//
//
//     useEffect(() => {
//         headRef.current = nodes.Head;
//         glassesRef.current = nodes.avaturn_glasses_0;
//         glassesRef1.current = nodes.avaturn_glasses_1;
//
//         // Adjust arms and hands (as per your original logic)
//         const leftArm = nodes.LeftArm;
//         const rightArm = nodes.RightArm;
//         const leftForeArm = nodes.LeftForeArm;
//         const rightForeArm = nodes.RightForeArm;
//         const leftHand = nodes.LeftHand;
//         const rightHand = nodes.RightHand;
//
//         if (leftArm) leftArm.rotation.x = Math.PI / 2.2;
//         if (leftForeArm) leftForeArm.rotation.y = -Math.PI / 8;
//         if (leftHand) leftHand.rotation.x = -Math.PI / 16;
//
//         if (rightArm) rightArm.rotation.x = Math.PI / 2.2;
//         if (rightForeArm) rightForeArm.rotation.y = Math.PI / 8;
//         if (rightHand) rightHand.rotation.x = -Math.PI / 12;
//
//         const adjustModelForScreenSize = () => {
//             const screenWidth = window.innerWidth;
//             if (group.current) {
//                 if (screenWidth <= 768) {
//                     group.current.scale.set(2, 2, 2);
//                     group.current.position.set(0, -3, 0.5);
//                 } else if (screenWidth <= 1024) {
//                     group.current.scale.set(2.5, 2.5, 2.5);
//                     group.current.position.set(0, -4.2, 0.7);
//                 } else {
//                     group.current.scale.set(3, 3, 3);
//                     group.current.position.set(0, -4.6, 0.7);
//                 }
//             }
//         };
//
//         adjustModelForScreenSize();
//         window.addEventListener("resize", adjustModelForScreenSize);
//
//         return () => window.removeEventListener("resize", adjustModelForScreenSize);
//     }, [nodes]);
//
//     const isMobile = useIsMobile();
//
//     // Make the head follow the device orientation (or mouse for fallback)
//     useFrame((state) => {
//         const { mouse } = state;
//
//         if (headRef.current){
//             if (isMobile){
//                 const targetRotationX = THREE.MathUtils.degToRad(orientation.beta ?? 0);  // Up/Down tilt
//                 const targetRotationY = THREE.MathUtils.degToRad(orientation.gamma ?? 0); // Left/Right tilt
//
//                 // Increase the sensitivity for the Y-axis (vertical) rotation
//                 const ySensitivity = -1.5;  // Increase this factor to make the Y-axis more sensitive
//                 const xSensitivity = 1.5;  // Increase this factor to make the X-axis more sensitive
//
//                 // Apply the rotation smoothly
//                 headRef.current.rotation.x = THREE.MathUtils.lerp(
//                     headRef.current.rotation.x,
//                     targetRotationX *xSensitivity * -0.5,  // Scale for subtle movement
//                     0.1
//                 );
//                 headRef.current.rotation.y = THREE.MathUtils.lerp(
//                     headRef.current.rotation.y,
//                     targetRotationY * ySensitivity * 0.8,  // Scale for subtle movement
//                     0.1
//                 );
//             }else {
//                 const { mouse } = state;
//                 const targetRotationX = -mouse.y * Math.PI / 3;
//                 const targetRotationY = mouse.x * Math.PI / 4;
//                 const clampedRotationX = THREE.MathUtils.clamp(
//                     targetRotationX,
//                     -Math.PI,
//                     Math.PI / 60
//                 );
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
//     const handleGlassesClick = () => {
//         if (glassesRef.current) {
//             setTransition(true);
//             const blackOverlay = document.getElementById("black-overlay");
//             if (blackOverlay) {
//                 blackOverlay.style.opacity = "1";
//             }
//             window.location.href = "/project/prodo";
//         }
//     };
//
//     // const textRef = useRef(); // Ref for the text to animate
//     // useFrame((state) => {
//     //     // Animate the text position or other properties
//     //     if (textRef.current) {
//     //         textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2; 
//     //     }
//     // });
//
//     return (
//         <group ref={group} {...props} castShadow dispose={null}
//                onPointerOver={handlePointerOver}
//                onPointerOut={handlePointerOut}
//         >
//             <group name="Scene">
//                 <group name="Armature">
//                     {/* Attach Hips object */}
//                     <primitive object={nodes.Hips}/>
//                     {/*Face */}
//                     <skinnedMesh
//                         name="avaturn_body"
//                         geometry={nodes.avaturn_body.geometry}
//                         material={materials.avaturn_body_material}
//                         skeleton={nodes.avaturn_body.skeleton}
//                         // onPointerOver={() => handlePointerOver('avaturn_body')}
//                         // onPointerOut={handlePointerOut}
//                     >
//                         {hoveredPart === "avaturn_body" && (
//                             <ToolTip isVisible={true} style={{ pointerEvents: "none" }} position={[-0.21, 1.52, 0]}>Click to Know me</ToolTip>
//                         )}
//                     </skinnedMesh>
//
//                     {/* Glasses with Transmission Material */}
//                     <skinnedMesh
//                         name="avaturn_glasses_0"
//                         geometry={nodes.avaturn_glasses_0.geometry}
//                         material={materials.avaturn_glasses_0_material}
//                         skeleton={nodes.avaturn_glasses_0.skeleton}
//                         ref={glassesRef}
//                         onPointerDown={handleGlassesClick}
//                         // onPointerOver={() => handlePointerOver('avaturn_glasses_0')}
//                         // onPointerOut={handlePointerOut}
//                     >
//                         {hoveredPart === "avaturn_glasses_0" && (
//                             <ToolTip isVisible={true} style={{ pointerEvents: "none" }} position={[-0.1, 1.725, 0]}>Click to jump in</ToolTip>
//                         )}
//                         <meshStandardMaterial
//                             roughness={0.15}
//                             metalness={0.1}
//                             color="rgb(100, 100, 100)"/>
//
//                     </skinnedMesh>
//
//                     {/* Glasses with Text Attached */}
//                     <skinnedMesh
//                         name="avaturn_glasses_1"
//                         geometry={nodes.avaturn_glasses_1.geometry}
//                         material={materials.avaturn_glasses_1_material}
//                         skeleton={nodes.avaturn_glasses_1.skeleton}
//                         ref={glassesRef1}
//                         onClick={handleGlassesClick}
//                     >
//                         <VideoMaterial
//                             url="/assets/video/glass.mp4"
//                         />
//                         {hoveredPart === "avaturn_glasses_1" && (
//                             <ToolTip isVisible={true} style={{ pointerEvents: "none" }} position={[-0.1, 1.725, 0]}>Click on Headset</ToolTip>
//                         )}
//                     </skinnedMesh>
//
//                     {/* Hair */}
//                     <skinnedMesh
//                         name="avaturn_hair_0"
//                         geometry={nodes.avaturn_hair_0.geometry}
//                         material={materials.avaturn_hair_0_material}
//                         skeleton={nodes.avaturn_hair_0.skeleton}
//                         onClick={handleBodyClick} // Show popup on click
//                     >
//                     </skinnedMesh>
//
//                     {/* Look details */}
//                     <skinnedMesh
//                         name="avaturn_look_0"
//                         geometry={nodes.avaturn_look_0.geometry}
//                         material={materials.avaturn_look_0_material}
//                         skeleton={nodes.avaturn_look_0.skeleton}
//                         onClick={handleBodyClick} // Show popup on click
//                         // onPointerOver={() => handlePointerOver('avaturn_look_0')}
//                         // onPointerOut={handlePointerOut}
//                     >
//                         {hoveredPart === "avaturn_look_0" && (
//                             <ToolTip isVisible={true} style={{ pointerEvents: "none" }} position={[-0.21, 1.52, 0]}>Click to Know me</ToolTip>
//                         )}
//                     </skinnedMesh>
//                 </group>
//             </group>
//         </group>
//     );
// }
//
// useGLTF.preload("/model/mymodel.glb");

import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useIsMobile } from "libs/hooks/useIsMobile";
import ToolTip from "@components/Home/Tooltip";
import VideoMaterial from "@components/Home/VideoMaterial";
import {useFrame} from "@react-three/fiber";

export default function ModelCode({ props, onPopupTrigger, customPose, customInteraction }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/model/mymodel.glb");
    const [ transition,setTransition] = useState(false);

    // Handlers for tooltips
    const [hoveredPart, setHoveredPart] = useState(null);
    const headRef = useRef();
    const glassesRef = useRef();
    const glassesRef1 = useRef();
    const isMobile = useIsMobile();

    // Hover and unhover handlers attached at group level
    const handlePointerOver = (e) => {
        if (e.object && e.object.name) {
            setHoveredPart(e.object.name);
            document.body.style.cursor = 'pointer'; // Change the cursor to pointer
        }
    };

    const handlePointerOut = (e) => {
        if (e.object && e.object.name === hoveredPart) {
            setHoveredPart(null);
            document.body.style.cursor = 'default'; // Reset the cursor
        }
    };

    const handleBodyClick = () => {
        if (onPopupTrigger) {
            onPopupTrigger(); // Trigger the popup
        }
    };

    // Apply custom pose using the customPose prop
    useEffect(() => {
        // headRef.current = nodes.Head; // Ensure headRef is assigned after model loads
        // if (!nodes) return;
        if (nodes) headRef.current = nodes.Head;
        
            
        if (nodes && customPose) {
            customPose(nodes, group);  // Call the customPose function
        }
    }, [nodes, customPose]);

    // Run custom interactions in the frame loop (mouse, orientation, scroll, etc.)
    useFrame((state) => {
        if (customInteraction) {
            customInteraction(state, { headRef, glassesRef, glassesRef1, isMobile });
        }
    });


    const handleGlassesClick = () => {
        if (glassesRef.current) {
            setTransition(true);
            const blackOverlay = document.getElementById("black-overlay");
            if (blackOverlay) {
                blackOverlay.style.opacity = "1";
            }
            window.location.href = "/project/prodo";
        }
    };

    return (
        <group ref={group} {...props} castShadow dispose={null}
               onPointerOver={handlePointerOver}
               onPointerOut={handlePointerOut}
        >
            <group name="Scene">
                <group name="Armature">
                    {/* Attach Hips object */}
                    <primitive object={nodes.Hips}/>
                    {/*Face */}
                    <skinnedMesh
                        name="avaturn_body"
                        geometry={nodes.avaturn_body.geometry}
                        material={materials.avaturn_body_material}
                        skeleton={nodes.avaturn_body.skeleton}
                        // ref={headRef}
                    >
                        {hoveredPart === "avaturn_body" && (
                            <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.21, 1.52, 0]}>Click
                                to Know me</ToolTip>
                        )}
                    </skinnedMesh>

                    {/* Glasses with Transmission Material */}
                    <skinnedMesh
                        name="avaturn_glasses_0"
                        geometry={nodes.avaturn_glasses_0.geometry}
                        material={materials.avaturn_glasses_0_material}
                        skeleton={nodes.avaturn_glasses_0.skeleton}
                        ref={glassesRef}
                        onPointerDown={handleGlassesClick}
                        // onPointerOver={() => handlePointerOver('avaturn_glasses_0')}
                        // onPointerOut={handlePointerOut}
                    >
                        {hoveredPart === "avaturn_glasses_0" && (
                            <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.1, 1.725, 0]}>Click
                                to jump in</ToolTip>
                        )}
                        <meshStandardMaterial
                            roughness={0.15}
                            metalness={0.1}
                            color="rgb(100, 100, 100)"/>

                    </skinnedMesh>

                    {/* Glasses with Text Attached */}
                    <skinnedMesh
                        name="avaturn_glasses_1"
                        geometry={nodes.avaturn_glasses_1.geometry}
                        material={materials.avaturn_glasses_1_material}
                        skeleton={nodes.avaturn_glasses_1.skeleton}
                        ref={glassesRef1}
                        onClick={handleGlassesClick}
                    >
                        <VideoMaterial
                            url="/assets/video/glass.mp4"
                        />
                        {hoveredPart === "avaturn_glasses_1" && (
                            <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.1, 1.725, 0]}>Click
                                on Headset</ToolTip>
                        )}
                    </skinnedMesh>

                    {/* Hair */}
                    <skinnedMesh
                        name="avaturn_hair_0"
                        geometry={nodes.avaturn_hair_0.geometry}
                        material={materials.avaturn_hair_0_material}
                        skeleton={nodes.avaturn_hair_0.skeleton}
                        onClick={handleBodyClick} // Show popup on click
                    >
                    </skinnedMesh>

                    {/* Look details */}
                    <skinnedMesh
                        name="avaturn_look_0"
                        geometry={nodes.avaturn_look_0.geometry}
                        material={materials.avaturn_look_0_material}
                        skeleton={nodes.avaturn_look_0.skeleton}
                        onClick={handleBodyClick} // Show popup on click
                        // onPointerOver={() => handlePointerOver('avaturn_look_0')}
                        // onPointerOut={handlePointerOut}
                    >
                        {hoveredPart === "avaturn_look_0" && (
                            <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.21, 1.52, 0]}>Click
                                to Know me</ToolTip>
                        )}
                    </skinnedMesh>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/model/mymodel.glb");
