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
"use client";
import React, {useEffect, useRef, useState} from "react";
import { useAnimations, useGLTF} from "@react-three/drei";
import { useIsMobile } from "libs/hooks/useIsMobile";
import ToolTip from "@components/Home/Tooltip";
import VideoMaterial from "@components/Home/VideoMaterial";
import {useFrame, useThree} from "@react-three/fiber";
import {
    Bloom,
    EffectComposer,
    ToneMapping
} from "@react-three/postprocessing";
import {Color, ShaderMaterial} from "three";
import * as THREE from "three";
import {BlendFunction} from "postprocessing";

const modelPath = "/model/me-pose-transformed.glb";
const EMISSION_INTENSITY = 3.5; // Adjust for glow intensity
const SCAN_BAND_HEIGHT = 0.3; // Height of the visible wireframe band
const SCAN_SPEED = 0.5; // Speed of the scanning band
export default function ModelCode(
    { props, position,    visibleRing = true, 
        isBeams=false, onPopupTrigger,play, customPose,onToolTip, onGlassClick , customInteraction, customAnimation }) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(modelPath);
    const { ref, actions, names } = useAnimations(animations)


    const [ transition,setTransition] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    // Handlers for tooltips
    const [hoveredPart, setHoveredPart] = useState(null);
    const headRef = useRef();
    const glassesRef = useRef();
    const glassesRef1 = useRef();
    const isMobile = useIsMobile();
    const [isBeamVisible, setIsBeamVisible] = useState(false);
    const spotlightRef = useRef();  // Spotlight reference for possible updates

    const beamRef = useRef();
    const { camera } = useThree();

    const ringHeight = 0.85; // Maximum height the ring travels
    const ringSpeed = 0.5; // Speed at which the ring moves
    const ringRef = useRef();
    const [videoTexture, setVideoTexture] = useState(null);
    useEffect(() => {
        // Create a video element and apply it as a texture
        const video = document.createElement("video");
        video.src = "/assets/video/glass.mp4";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        // Wait until video data loads, then create a Three.js video texture
        video.onloadeddata = () => {
            video.play(); // Ensure the video starts playing

            // Create a VideoTexture and set filtering options
            const texture = new THREE.VideoTexture(video);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            texture.wrapS = THREE.ClampToEdgeWrapping; 
            texture.wrapT = THREE.ClampToEdgeWrapping;
            // texture.flipY = false; // Ensure the video displays correctly
            texture.repeat.set(9,9 ); // Prevent texture repetition
            texture.offset.set(0.85, -0.45); // Reset texture offset
            setVideoTexture(texture);
        };
    }, []);

    // Apply the video texture to the glasses material when loaded
    useEffect(() => {
        if (glassesRef1.current && videoTexture) {
            // Apply a new MeshBasicMaterial with the video texture
            glassesRef1.current.material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                toneMapped: false, // Disable tone mapping to keep video colors accurate
            });
        }
    }, [videoTexture]);

    // Wireframe overlay shader material
    const wireframeMaterial = new ShaderMaterial({
        uniforms: {
            scanYPosition: { value: 1.5 }, // Start scanning from the top
            scanBandHeight: { value: SCAN_BAND_HEIGHT }, // Height of the wireframe scan band
            color: { value: new Color(0x47709c) }, // Green wireframe color
        },
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float scanYPosition;
            uniform float scanBandHeight;
            uniform vec3 color;
            varying vec3 vPosition;

            void main() {
                // Calculate opacity based on the Y position for scanning effect
                float opacity = smoothstep(scanYPosition + scanBandHeight, scanYPosition - scanBandHeight, vPosition.y);
                gl_FragColor = vec4(color, opacity); // Wireframe color with animated opacity
            }
        `,
        transparent: true,
        wireframe: true,
    });

    // Track accumulated rotation
    let accumulatedRotation = 0;

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const scanY = Math.sin(time * SCAN_SPEED) * 1.5;

        if (visibleRing) {
            // When visibleRing is active, continuously rotate the model
            wireframeMaterial.uniforms.scanYPosition.value = scanY;

            if (ringRef.current) {
                ringRef.current.position.y = scanY * 0.65;

                // Continuously increase rotation
                accumulatedRotation += delta;
                group.current.rotation.y = accumulatedRotation; // Apply continuous rotation
            }
        } else {
            // Calculate the next multiple of 360° (or `2 * PI` radians) the model should reach
            const targetRotation = Math.ceil(accumulatedRotation / (2 * Math.PI)) * (2 * Math.PI);

            // Smoothly interpolate to this next 360° mark
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.02);

            // Gradually align accumulated rotation with the visible rotation
            accumulatedRotation = THREE.MathUtils.lerp(accumulatedRotation, targetRotation, 0.02);
        }
    });
    
    
    const gradientShader = {
        uniforms: {
            time: { value: 0.0 },
            emissionIntensity: { value: EMISSION_INTENSITY }, // New emission intensity uniform
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float emissionIntensity;
            varying vec2 vUv;

            void main() {
                float angle = vUv.x * 6.283185; // Full circle (2 * PI)
                // Color oscillation with time for smooth transition
                vec3 color1 = vec3(0.07, 0.23, 0.99); // Red
                vec3 color2 = vec3(0.0, 0.1, 0.91); // Red
                vec3 color3 = vec3(0.0, 0.1, 0.91); // Red
                
                // Calculate weights for smooth color blending
                float weight1 = 0.5 + 0.5 * sin(time + angle);
                float weight2 = 0.5 + 0.5 * sin(time + angle + 2.094); // Offset by 2π/3
                float weight3 = 0.5 + 0.5 * sin(time + angle + 4.188); // Offset by 4π/3
                
                // Blend colors seamlessly around the ring
                vec3 color = normalize(weight1 * color1 + weight2 * color2 + weight3 * color3);
                
                // Apply emissive intensity to enhance glow
                gl_FragColor = vec4(color * emissionIntensity, 1.0);
            }
        `,
    };

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
       headRef.current = nodes.Head;
         // beamRef.current = nodes.avaturn_glasses_0;
        // if (group.current) {
        //     group.current.position.set(0, -1.5, 0);  // Adjust this for better placement
        //     group.current.scale.set(0.5, 0.5, 0.5);  // Adjust scale as needed
        // }
        
        
        
       //setPlaying
        if(play){
            setIsPlaying(true);
        }
        
        if (isBeams) {
            setIsBeamVisible(true);
        }
        
        if (onToolTip) {
            setShowToolTip(true);
        }
            
        if (nodes && customPose) {
            customPose(nodes, group);
        }
    }, [nodes,isBeams, customPose, showToolTip, play, onToolTip]);

    // Run custom interactions in the frame loop (mouse, orientation, scroll, etc.)
    useFrame((state,delta) => {
        // if (group.current) {
        //     const { position, rotation } = group.current;
        //
        //     // Log group position and rotation
        //     console.log("Group Position:", position);
        //     console.log("Group Rotation:", rotation);
        // }
        //
        // if (camera) {
        //     const { position: cameraPos, rotation: cameraRot } = camera;
        //
        //     // Log camera position and rotation
        //     console.log("Camera Position:", cameraPos);
        //     console.log("Camera Rotation:", cameraRot);
        // }

        // if (ringRef.current) {
        //     gradientShader.uniforms.time.value += delta * ANIMATION_SPEED; // Adjust for animation speed
        // }
        //
        // if (visibleRing && ringRef.current) {
        //     const time = state.clock.getElapsedTime();
        //     ringRef.current.position.y = Math.sin(time * ringSpeed) * ringHeight;
        //     group.current.rotation.y = time;
        //     // ringRef.current.rotation.z = time;
        // }
        
        if (customInteraction) {
            customInteraction(state, { headRef, beamRef,glassesRef, glassesRef1, isMobile });
        }
    });

    useEffect(() => {
        if (customAnimation) {
            customAnimation(headRef, isMobile);
        }
    }, [customAnimation,isMobile]);
    
    const handleGlassesClick = () => {
        if (glassesRef.current && onGlassClick) {
            setTransition(true);
            onGlassClick();
        }
    };
    
    

    return (
        <>
            <group ref={group} {...props}
                // position={[0,0,0]}
                   castShadow dispose={null}
                   onPointerOver={handlePointerOver}
                   onPointerOut={handlePointerOut}
            >
                <group
                    position={visibleRing ? [0, -1, 0] : [0, 0, 0]}
                    name="Scene">
                    <group name="Armature">
                        {/* Attach Hips object */}
                        <primitive
                            object={nodes.Hips}/>
                        {/*body with face */}
                        <skinnedMesh
                            name="avaturn_body"
                            geometry={nodes.avaturn_body.geometry}
                            material={materials.avaturn_body_material}
                            skeleton={nodes.avaturn_body.skeleton}
                            // ref={headRef}
                        >
                            {hoveredPart === "avaturn_body" && showToolTip && (
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
                            {hoveredPart === "avaturn_glasses_0" && showToolTip && (
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
                            // material={materials.avaturn_glasses_1_material}
                            skeleton={nodes.avaturn_glasses_1.skeleton}
                            ref={glassesRef1}
                            onClick={handleGlassesClick}
                        >
                            {/*{isPlaying && (*/}
                            {/*    <VideoMaterial*/}
                            {/*        url="/assets/video/glass.mp4"*/}
                            {/*    />*/}
                            {/*)}*/}
                            {hoveredPart === "avaturn_glasses_1" && showToolTip && (
                                <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.1, 1.725, 0]}>Click
                                    on Headset</ToolTip>
                            )}
                            {/*{*/}
                            {/*    isBeams && (*/}
                            {/*        <meshStandardMaterial*/}
                            {/*            emissive="rgb(0, 255, 255)" // Cyan light emission*/}
                            {/*            emissiveIntensity={1.5}*/}
                            {/*            roughness={0.1}*/}
                            {/*            transparent*/}
                            {/*            metalness={0.9}*/}
                            {/*            color="rgb(0, 100, 255)"    // Base color for the glasses*/}
                            {/*        />*/}
                            {/*    )*/}
                            {/*}*/}

                        </skinnedMesh>

                        {
                            isBeams && (
                                <mesh
                                    // position={[0, 1.75, 0.3]}
                                    rotation={[0, Math.PI / 2, -Math.PI / 2.5]}
                                    ref={beamRef}
                                >
                                    <cylinderGeometry args={[0.03, 0.15, 0.4, 32]}/>
                                    <meshStandardMaterial
                                        color="rgb(0, 255, 255)"
                                        emissive="transparent"
                                        wireframe
                                        emissiveIntensity={20}
                                        transparent
                                        opacity={0.9}
                                    />
                                </mesh>
                            )
                        }


                        {/* Hair */}
                        <skinnedMesh
                            name="avaturn_hair_0"
                            geometry={nodes.avaturn_hair_0.geometry}
                            material={materials.avaturn_hair_0_material}
                            skeleton={nodes.avaturn_hair_0.skeleton}
                            onClick={handleBodyClick} // Show popup on click
                        >
                        </skinnedMesh>

                        <skinnedMesh geometry={nodes.avaturn_shoes_0.geometry}
                                     material={materials.avaturn_shoes_0_material}
                                     skeleton={nodes.avaturn_shoes_0.skeleton}/>


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
                            {hoveredPart === "avaturn_look_0" && showToolTip && (
                                <ToolTip isVisible={true} style={{pointerEvents: "none"}} position={[-0.21, 1.52, 0]}>Click
                                    to Know me</ToolTip>
                            )}
                        </skinnedMesh>
                    </group>
                </group>

                {/*{visibleRing&& (*/}
                {/*    <group*/}
                {/*        position={[0, -1, 0]}*/}
                {/*        ref={group}*/}
                {/*        name="Scene">*/}
                {/*        <group name="Armature">*/}
                {/*            /!* Attach Hips object *!/*/}
                {/*            /!*body with face *!/*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_body.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_body.skeleton}/>*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_glasses_0.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_glasses_0.skeleton}/>*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_glasses_1.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_glasses_1.skeleton}/>*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_hair_0.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_hair_0.skeleton}/>*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_look_0.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_look_0.skeleton}/>*/}
                {/*            <skinnedMesh geometry={nodes.avaturn_shoes_0.geometry}*/}
                {/*                         material={wireframeMaterial}*/}
                {/*                         skeleton={nodes.avaturn_shoes_0.skeleton}/>*/}
                
                {/*        </group>*/}
                {/*    </group>*/}
                {/*)}*/}

                {visibleRing && (
                    <mesh ref={ringRef} position={[0, 1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.45, 0.02, 6, 50]}/>
                        <shaderMaterial
                            attach="material"
                            args={[gradientShader]}
                            uniformsNeedUpdate={true}
                        />
                    </mesh>
                )}
            </group>
                {
                    isBeams || visibleRing && (
                        <EffectComposer disableNormalPass multisampling={8}>
                            
                            <ToneMapping
                                blendFunction={BlendFunction.NORMAL} // blend mode
                                adaptive={true} // toggle adaptive luminance map usage
                                resolution={256} // texture resolution of the luminance map
                                middleGrey={0.2} // middle grey factor
                                maxLuminance={10.0} // maximum luminance
                                averageLuminance={2.0} // average luminance
                                adaptationRate={1.0} // luminance adaptation rate
                                // adaptive={true} minLuminance={0.05}
                            />
                            
                            {/*<SelectiveBloom*/}
                            {/*    lights={[ringRef]} // ⚠️ REQUIRED! all relevant lights*/}
                            {/*    selection={[ringRef]} // selection of objects that will have bloom effect*/}
                            {/*    selectionLayer={1} // selection layer*/}
                            {/*    intensity={5.0} // The bloom intensity.*/}
                            {/*    luminanceThreshold={0.4} // luminance threshold. Raise this value to mask out darker elements in the scene.*/}
                            {/*    luminanceSmoothing={0.15} // smoothness of the luminance threshold. Range is [0, 1]*/}
                            {/*/>*/}
                            <Bloom luminanceThreshold={0.9} mipmapBlur luminanceSmoothing={0.6} intensity={0.7}/>
                        </EffectComposer>
                    )
                }
        </>
    );
}

useGLTF.preload(modelPath);
