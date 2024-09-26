import React, { useEffect, useRef, useState } from "react";
import { RenderTexture} from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GlowingText from "@components/Animations/GlowHollowText";

export default function ModelCode(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/model/mymodel.glb");

    const headRef = useRef(); // Reference for the head
    const glassesRef = useRef(); // Reference for the glasses
    const glassesRef1 = useRef(); // Reference for the second glasses mesh
    const [ transition,setTransition] = useState(false);
    const lightRef = useRef(); // Reference for the moving ambient light
    // const decalTexture = useTexture('/banner.png'); // Replace with the correct image path
    const [isHovered, setIsHovered] = useState(false); // State to track hover

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

    // Make the head follow the mouse
    useFrame((state) => {
        const { mouse } = state;

        if (headRef.current) {
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

        // Update the light position to follow the cursor
        if (lightRef.current) {
            const { width, height } = state.viewport;
            lightRef.current.position.set(mouse.x * width * 1.5, mouse.y * height * 1.5, 3); // Adjust Z for depth
        }
    });

    const handleGlassesClick = () => {
        if (glassesRef.current) {
            setTransition(true);
            const blackOverlay = document.getElementById("black-overlay");
            if (blackOverlay) {
                blackOverlay.style.opacity = "1";
                setTimeout(() => {
                    window.location.href = "/gallery"; // Navigate to the virtual reality scene
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

                    {/* Body */}
                    <skinnedMesh
                        name="avaturn_body"
                        geometry={nodes.avaturn_body.geometry}
                        material={materials.avaturn_body_material}
                        skeleton={nodes.avaturn_body.skeleton}
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
                            roughness={0.5}
                            metalness={0.2}
                            color="rgb(100, 90, 90)"/>
                        
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
                        {/*<Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur  edgeStrength={10} />*/}
                        {/* Change material when hovered */}
                        <meshStandardMaterial
                            roughness={0.1}
                            metalness={0.2}
                            resolution={128}
                            thickness={0.9}
                            anisotropy={3}
                            // emissive={isHovered ? "white" : "black"} // Glow effect when hovered
                        >
                            <RenderTexture attach="map" anisotropy={16}>
                                <GlowingText/>
                            </RenderTexture>
                        </meshStandardMaterial>
                        
                    </skinnedMesh>


                    {/* Hair */}
                    <skinnedMesh
                        name="avaturn_hair_0"
                        geometry={nodes.avaturn_hair_0.geometry}
                        material={materials.avaturn_hair_0_material}
                        skeleton={nodes.avaturn_hair_0.skeleton}
                    />

                    {/*/!* Shoes with custom material *!/*/}
                    {/*<skinnedMesh*/}
                    {/*    name="avaturn_shoes_0"*/}
                    {/*    geometry={nodes.avaturn_shoes_0.geometry}*/}
                    {/*    material={materials.avaturn_shoes_0_material}*/}
                    {/*    skeleton={nodes.avaturn_shoes_0.skeleton}*/}
                    {/*>*/}
                    {/*</skinnedMesh>*/}

                    {/* Face details */}
                    <skinnedMesh
                        name="avaturn_look_0"
                        geometry={nodes.avaturn_look_0.geometry}
                        material={materials.avaturn_look_0_material}
                        skeleton={nodes.avaturn_look_0.skeleton}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/model/mymodel.glb");