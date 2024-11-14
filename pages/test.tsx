import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ModelCode from '@components/Home/Model';

// @ts-ignore
const CircularCameraAnimation = ({ menuVisible, onZoomOut }) => {
    const { camera } = useThree(); // Access the camera
    const angleRef = useRef(0); // Track the angle for the circular path
    const radiusRef = useRef(3.2); // Track the distance (radius)
    const heightRef = useRef(9); // Track the height of the camera
    const lookAtHeightRef = useRef(0); // Track the height of the 'lookAt' target for smooth transition

    // Key camera positions for front and back
    const frontPosition = { radius: 3.2, height: 1.4, angle: 0, zoom: 0.7 }; // Front is zoomed-in
    const backPosition = { radius: 4.8, height: 2.8, angle: 0, zoom: 3.5 }; // Back is fully zoomed-out

    useFrame(() => {
        // Interpolate between front and back position
        const targetPosition = menuVisible ? frontPosition : backPosition;

        // Smoothly interpolate the camera's angle, radius, and height for the arc
        angleRef.current = THREE.MathUtils.lerp(angleRef.current, targetPosition.angle, 0.02); // Angle interpolation
        radiusRef.current = THREE.MathUtils.lerp(radiusRef.current, targetPosition.zoom, 0.02); // Radius interpolation (zoom)
        heightRef.current = THREE.MathUtils.lerp(heightRef.current, targetPosition.height, 0.02); // Height interpolation
        lookAtHeightRef.current = THREE.MathUtils.lerp(lookAtHeightRef.current, menuVisible ? 1.5 : 0.4, 0.02); // Smooth 'lookAt' transition

        const angle = angleRef.current;

        // Calculate the new camera position along the arc
        const targetX = radiusRef.current * Math.sin(angle); // X position
        const targetZ = radiusRef.current * Math.cos(angle); // Z position

        // Set the camera's position and ensure smooth look-at behavior
        camera.position.set(targetX, heightRef.current, targetZ);

        // Ensure the camera always smoothly looks at the model
        camera.lookAt(0, lookAtHeightRef.current, 0);

        // Check if zoomed out enough to trigger the ring visibility callback
        if (!menuVisible && radiusRef.current <= backPosition.zoom + 0.1) {
            onZoomOut(true); // Notify zoom out complete for ring visibility
        } else {
            onZoomOut(false);
        }

        // Update the camera's projection matrix
        camera.updateProjectionMatrix();
    });

    return null; // No JSX needed
};

const HomeSection = () => {
    const [menuVisible, setMenuVisible] = useState(true); // Toggle front or back pose
    const [visibleRing, setVisibleRing] = useState(false); // Control ring visibility based on zoom level

    return (
        <div className="w-screen h-[90vh] fixed bg-black">
            <Canvas
                camera={{
                    fov: 35,
                }}
                flat
                gl={{ antialias: true }}
            >
                <pointLight intensity={10} color="#fff" distance={10} decay={3} position={[-2.22, 0.0, 0]} />
                <pointLight intensity={5} color="#197CE2" distance={20} decay={3} position={[0.92, 0.0, 0.06]} />
                <directionalLight intensity={0.1} color="#197CE2" position={[0.32, 0, -1]} />

                {/* Circular camera animation */}
                <CircularCameraAnimation
                    menuVisible={menuVisible}
                    onZoomOut={setVisibleRing} // Callback to control ring visibility
                />

                {/* The model with poses for front and back */}
                <ModelCode
                    props={undefined}
                    position={undefined}
                    onPopupTrigger={undefined}
                    play={undefined}
                    visibleRing={visibleRing} // Toggle ring visibility based on zoom level
                    customPose={undefined} // Toggle between front and back poses
                    onToolTip={undefined}
                    onGlassClick={undefined}
                    customInteraction={undefined}
                    customAnimation={undefined}
                />
            </Canvas>

            {/* Button to toggle between front and back poses */}
            <button
                onClick={() => setMenuVisible(!menuVisible)}
                className="fixed z-50 left-0 m-6 p-2 bg-white rounded"
            >
                {menuVisible ? 'Switch to Back Pose' : 'Switch to Front Pose'}
            </button>
        </div>
    );
};

export default HomeSection;
