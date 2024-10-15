import React, { useEffect, useRef, useState } from "react";
import {Text, useVideoTexture} from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {useDeviceOrientation} from "libs/hooks/useDeviceOrientation";
import {useIsMobile} from "libs/hooks/useIsMobile";

export default function ModelCode({ props, onPopupTrigger }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/model/mymodel.glb");

    const headRef = useRef(); // Reference for the head
    const glassesRef = useRef(); // Reference for the glasses
    const glassesRef1 = useRef(); // Reference for the second glasses mesh
    const [ transition,setTransition] = useState(false);
    // const lightRef = useRef(); // Reference for the moving ambient light
    // const decalTexture = useTexture('/banner.png'); // Replace with the correct image path
    const [isHovered, setIsHovered] = useState(false); // State to track hover
    // const [isPopupVisible, setPopupVisible] = useState(false);
    
    const handleBodyClick = () => {
        if (onPopupTrigger) {
            onPopupTrigger(); // Trigger the popup
        }
    }
    
    // Use the device orientation hook
    // const { orientation, requestAccess, error, permissionDenied } = useDeviceOrientation();
    const {
        orientation,
        requestAccess,
        revokeAccess,
        error,
        resetOrientation
    } = useDeviceOrientation({
    });

    const [accessGranted, setAccessGranted] = useState(false);

    // Request access to the device orientation
    useEffect(() => {
        const requestOrientationAccess = async () => {
            const granted = await requestAccess();
            setAccessGranted(granted);
        };
        requestOrientationAccess().then(r => 
            console.log("Requesting access to device orientation")
        );
    }, [requestAccess]);


    useEffect(() => {
        headRef.current = nodes.Head;
        glassesRef.current = nodes.avaturn_glasses_0;
        glassesRef1.current = nodes.avaturn_glasses_1;

        // Adjust arms and hands (as per your original logic)
        const leftArm = nodes.LeftArm;
        const rightArm = nodes.RightArm;
        const leftForeArm = nodes.LeftForeArm;
        const rightForeArm = nodes.RightForeArm;
        const leftHand = nodes.LeftHand;
        const rightHand = nodes.RightHand;

        if (leftArm) leftArm.rotation.x = Math.PI / 2.2;
        if (leftForeArm) leftForeArm.rotation.y = -Math.PI / 8;
        if (leftHand) leftHand.rotation.x = -Math.PI / 16;

        if (rightArm) rightArm.rotation.x = Math.PI / 2.2;
        if (rightForeArm) rightForeArm.rotation.y = Math.PI / 8;
        if (rightHand) rightHand.rotation.x = -Math.PI / 12;

        const adjustModelForScreenSize = () => {
            const screenWidth = window.innerWidth;
            if (group.current) {
                if (screenWidth <= 768) {
                    group.current.scale.set(2, 2, 2);
                    group.current.position.set(0, -3, 0.5);
                } else if (screenWidth <= 1024) {
                    group.current.scale.set(2.5, 2.5, 2.5);
                    group.current.position.set(0, -4.2, 0.7);
                } else {
                    group.current.scale.set(3, 3, 3);
                    group.current.position.set(0, -4.6, 0.7);
                }
            }
        };

        adjustModelForScreenSize();
        window.addEventListener("resize", adjustModelForScreenSize);

        return () => window.removeEventListener("resize", adjustModelForScreenSize);
    }, [nodes]);

    const isMobile = useIsMobile();

    // Make the head follow the device orientation (or mouse for fallback)
    useFrame((state) => {
        const { mouse } = state;

        if (headRef.current){
            if (isMobile){
                const targetRotationX = THREE.MathUtils.degToRad(orientation.beta ?? 0);  // Up/Down tilt
                const targetRotationY = THREE.MathUtils.degToRad(orientation.gamma ?? 0); // Left/Right tilt

                // Increase the sensitivity for the Y-axis (vertical) rotation
                const ySensitivity = -1.5;  // Increase this factor to make the Y-axis more sensitive
                const xSensitivity = 1.5;  // Increase this factor to make the X-axis more sensitive

                // Apply the rotation smoothly
                headRef.current.rotation.x = THREE.MathUtils.lerp(
                    headRef.current.rotation.x,
                    targetRotationX *xSensitivity * -0.5,  // Scale for subtle movement
                    0.1
                );
                headRef.current.rotation.y = THREE.MathUtils.lerp(
                    headRef.current.rotation.y,
                    targetRotationY * ySensitivity * 0.8,  // Scale for subtle movement
                    0.1
                );
            }else {
                const { mouse } = state;
                const targetRotationX = -mouse.y * Math.PI / 3;
                const targetRotationY = mouse.x * Math.PI / 4;
                const clampedRotationX = THREE.MathUtils.clamp(
                    targetRotationX,
                    -Math.PI,
                    Math.PI / 60
                );
                headRef.current.rotation.x = THREE.MathUtils.lerp(
                    headRef.current.rotation.x,
                    clampedRotationX,
                    0.1
                );
                headRef.current.rotation.y = THREE.MathUtils.lerp(
                    headRef.current.rotation.y,
                    targetRotationY,
                    0.1
                );
            }
        }
    });
    const handleGlassesClick = () => {
        if (glassesRef.current) {
            setTransition(true);
            const blackOverlay = document.getElementById("black-overlay");
            if (blackOverlay) {
                blackOverlay.style.opacity = "1";
                setTimeout(() => {
                    window.location.href = "/gallery/prodo"; // Navigate to the virtual reality scene
                }, 1000);
            }
        }
    };

    const textRef = useRef(); // Ref for the text to animate

    useFrame((state) => {
        // Animate the text position or other properties
        if (textRef.current) {
            textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2; 
        }
    });

    return (
        <group ref={group} {...props} castShadow dispose={null}>
            <group name="Scene">
                <group name="Armature">
                    {/* Attach Hips object */}
                    <primitive object={nodes.Hips}/>
                    
                    <skinnedMesh
                        name="avaturn_body"
                        geometry={nodes.avaturn_body.geometry}
                        material={materials.avaturn_body_material}
                        skeleton={nodes.avaturn_body.skeleton}
                        // onClick={handleBodyClick} // Show popup on click
                    />
                    
                    {/* Glasses with Transmission Material */}
                    <skinnedMesh
                        name="avaturn_glasses_0"
                        geometry={nodes.avaturn_glasses_0.geometry}
                        material={materials.avaturn_glasses_0_material}
                        skeleton={nodes.avaturn_glasses_0.skeleton}
                        ref={glassesRef}
                        onPointerDown={handleGlassesClick}
                    >
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
                        onPointerOver={() => setIsHovered(true)}
                        onPointerOut={() => setIsHovered(false)}
                    >
                        <VideoMaterial
                            url="/images/glass.mp4"
                        />
                    </skinnedMesh>
                    
                    {/* Hair */}
                    <skinnedMesh
                        name="avaturn_hair_0"
                        geometry={nodes.avaturn_hair_0.geometry}
                        material={materials.avaturn_hair_0_material}
                        skeleton={nodes.avaturn_hair_0.skeleton}
                        onClick={handleBodyClick} // Show popup on click
                    />

                    {/* Face details */}
                    <skinnedMesh
                        name="avaturn_look_0"
                        geometry={nodes.avaturn_look_0.geometry}
                        material={materials.avaturn_look_0_material}
                        skeleton={nodes.avaturn_look_0.skeleton}
                        onClick={handleBodyClick} // Show popup on click
                    />
                </group>
            </group>


        </group>
    );
}

// const VideoTextureGlasses = ({videoUrl, isHovered, glassesRef1}) => {
//     const videoRef = useRef();
//
//     useEffect(() => {
//         const video = document.createElement('video');
//         video.src = videoUrl;
//         video.loop = true; // Loop the video
//         video.muted = true; // Mute video
//         video.play(); // Autoplay the video
//
//         // Create a VideoTexture and set its properties
//         const videoTexture = new THREE.VideoTexture(video);
//         videoTexture.minFilter = THREE.LinearFilter;
//         videoTexture.magFilter = THREE.LinearFilter;
//         videoTexture.format = THREE.RGBFormat;
//
//         // Assign the video texture to the glasses material map
//         if (glassesRef1.current) {
//             glassesRef1.current.material.map = videoTexture;
//             glassesRef1.current.material.needsUpdate = true;
//         }
//
//         // Clean up the video when the component unmounts
//         return () => {
//             video.pause();
//             video.src = '';
//         };
//     }, [videoUrl, glassesRef1]);
//
//     return null; // This component doesn't render anything itself
// };

function VideoMaterial({ url }) {
    // Load the video texture
    const texture = useVideoTexture(url);

    // Ensure the video isn't flipped along the Y-axis
    texture.flipY = false;

    // Ensure the texture doesn't repeat unnecessarily
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(3, 3);  // Example of making the texture repeat
    texture.offset.set(0.85, -0.45);  // Example to move texture slightly

    // Optional: You can adjust anisotropy for better quality
    texture.anisotropy = 8;

    return (
        <meshBasicMaterial
            map={texture}               // Video texture applied to the material
            thickness={0.1}             // Adds a thickness to simulate glass
            clearcoat={0.1}               // Adds a clear coating on top of the material
            clearcoatRoughness={0.9}    // Defines the roughness of the clear coat
            transparent={true}          // Allows transparency
            opacity={0.8}               // Controls the opacity of the material (set to 1.0 to make the video fully visible)
            side={THREE.FrontSide}      // Ensures the video is rendered on the front side
            toneMapped={true}          // Disable tone mapping for video textures
        />
    );
}

useGLTF.preload("/model/mymodel.glb");