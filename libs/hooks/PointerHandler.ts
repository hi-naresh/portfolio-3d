import {useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import * as THREE from "three";

const PointerHandler = ({
                            isMenuHovered,
                        }: { isMenuHovered: boolean;
                        }) => {
    const {camera, pointer} = useThree(); // Access Three.js camera and mouse
    const raycaster = useRef(new THREE.Raycaster());

    useEffect(() => {
        const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
            // Normalize mouse coordinates
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (!isMenuHovered) {
                raycaster.current.setFromCamera(pointer, camera);
                // Additional raycasting logic can be added here
            }
        };

        // Add event listener for mouse movement
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // Cleanup event listener
        };
    }, [isMenuHovered, camera, pointer]);

    return null; // This component is just for handling mouse events, no JSX is needed
};

export default PointerHandler;