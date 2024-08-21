import {useGLTF} from "@react-three/drei";
import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const headRef = useRef<THREE.Object3D>();
    const glassesRef = useRef<THREE.Object3D>();
    const glassesRef1 = useRef<THREE.Object3D>();
    const [transition, setTransition] = useState(false);

    //make scene in highest quality
    // scene.attach(
    //     new THREE.AmbientLight(0xffffff, -0.5)
    // )
    
    // scene.traverse((child) => {
    //         if (child instanceof THREE.Mesh) {
    //             child.material = new THREE.MeshStandardMaterial({
    //                 color: child.material.color,
    //                 map: child.material.map,
    //                 roughness: 0.7,
    //                 metalness: 0.3,
    //             });
    //         }
    //     }
    // );

    useEffect(() => {
        // Find and reference the head
        headRef.current = scene.getObjectByName('Head');
        glassesRef.current = scene.getObjectByName('avaturn_glasses_0'); // Replace with the actual name of the glasses object
        glassesRef1.current = scene.getObjectByName('avaturn_glasses_1'); // Replace with the actual name of the glasses object
        //hide the glasses
        // if (glassesRef.current) {
        //     glassesRef.current.visible = false;
        // }
        // if (glassesRef1.current) {
        //     glassesRef1.current.visible = false;
        // }
        
        // Access and adjust bone positions to achieve a resting pose
        const leftArm = scene.getObjectByName('LeftArm');
        const rightArm = scene.getObjectByName('RightArm');
        const leftForeArm = scene.getObjectByName('LeftForeArm');
        const rightForeArm = scene.getObjectByName('RightForeArm');
        const leftHand = scene.getObjectByName('LeftHand');
        const rightHand = scene.getObjectByName('RightHand');

        // Adjust the pose to remove T-pose
        if (leftArm) {
            leftArm.rotation.x = Math.PI / 2.2;
            leftArm.rotation.y = 0;
        }
        if (leftForeArm) {
            leftForeArm.rotation.x = 0;
            leftForeArm.rotation.y = -Math.PI / 8;
        }
        if (leftHand) {
            leftHand.rotation.x = -Math.PI / 16;
            leftHand.rotation.y = -Math.PI / 8;
        }

        if (rightArm) {
            rightArm.rotation.x = Math.PI / 2.2;
            rightArm.rotation.z = 0;
        }
        if (rightForeArm) {
            rightForeArm.rotation.x = 0;
            rightForeArm.rotation.y = Math.PI / 8;
        }
        if (rightHand) {
            rightHand.rotation.x = -Math.PI / 12;
            rightHand.rotation.y = -Math.PI / 8;
        }

        // Scale and position the model to fit the screen properly
        scene.scale.set(3, 3, 3);
        scene.position.set(0, -4.6, 0.7);
        scene.rotation.y = 0;
    }, [scene]);

    // Make the head follow the mouse with more sensitivity
    useFrame((state) => {
        if (headRef.current) {
            const { mouse } = state;

            // Map mouse position to head rotation
            const targetRotationX = -mouse.y * Math.PI / 3;  // Up and down rotation (X-axis)
            const targetRotationY = mouse.x * Math.PI / 4;   // Left and right rotation (Y-axis)

            // Clamp X-axis rotation to limit downward movement
            const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI , Math.PI / 60);
            // -Math.PI / 12 (about -15 degrees) for slight downward tilt
            // Math.PI / 4 (about 45 degrees) for upward freedom

            // Smooth transition to the target rotations
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedRotationX, 0.1);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
            
            // Transition the glasses
            if (glassesRef.current) {
                if (transition) {
                    document.getElementById("black-overlay")!.style.opacity = "1";
                    setTimeout(() => {
                        window.location.href = '/gallery'; // Navigate to the virtual reality scene
                    }, 1000); // Wait for the fade to complete
                }
            }
        }
    });


    // Handle the click on glasses
    const handleGlassesClick = () => {
        if (glassesRef.current) {
            setTransition(true);
        }
    };

    return <primitive object={scene} onPointerDown={handleGlassesClick} />;
}

export default Model;