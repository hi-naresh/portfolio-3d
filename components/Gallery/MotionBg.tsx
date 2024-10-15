import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Noise } from '@react-three/postprocessing'; // Import Noise effect

export default function ThreeSixtyBackground({ children }: { children: React.ReactNode }) {
    const [texture, setTexture] = useState<THREE.Texture | null>(null); // State to hold the texture
    const [initialAzimuthal, setInitialAzimuthal] = useState(Math.PI/4); // Store the initial azimuthal angle
    const [initialPolar, setInitialPolar] = useState(Math.PI / 2); // Store the initial polar angle (vertical)

    // Ensure texture loading happens only on the client side
    useEffect(() => {
       //load the texture and then only load child components
        const loader = new THREE.TextureLoader();
        loader.load('/images/151.jpg', (loadedTexture) => {
            setTexture(loadedTexture);
        });
    }, []);

    // Mouse movement state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [initialView, setInitialView] = useState(true); // Tracks if the initial position is set

    // Update mouse position based on hover movement
    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({
            x: (event.clientX / window.innerWidth) * 2 - 1, // Scale X between -1 and 1
            y: (event.clientY / window.innerHeight) * 2 - 1, // Scale Y between -1 and 1
        });
        setInitialView(false); // Disable initial view once the user moves the mouse
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Custom component to control camera inside Canvas
    const CameraController = () => {
        const controlsRef = useRef<any>(null);

        useFrame(() => {
            if (controlsRef.current) {
                // If still in the initial view, set the default camera position to center of the texture
                if (initialView) {
                    const initialAzimuth =  controlsRef.current.getAzimuthalAngle(); // Look at the horizontal center of the image (custom value if needed)
                    // const initialPolar = Math.PI / 2; // Start looking straight at the vertical center (equator)
                    // const currentAzimuthalAngle = controlsRef.current.getAzimuthalAngle(); // Get current horizontal look
                    // const smoothedAzimuthal = THREE.MathUtils.lerp(currentAzimuthalAngle, initialAzimuth, 0.001); // Smooth over time
                    controlsRef.current.setAzimuthalAngle(initialAzimuth); // Set initial horizontal look
                    // controlsRef.current.setPolarAngle(initialPolar); // Set initial vertical look
                    // setInitialAzimuthal(initialAzimuth); // Store this as the base azimuthal angle
                    // setInitialPolar(initialPolar); // Store this as the base polar angle
                } else {
                    // Adjust rotation based on mouse movement relative to the initial camera orientation
                    const azimuthalAngle = initialAzimuthal + (mousePosition.x * Math.PI) / 8; // Apply horizontal rotation
                    const polarAngle = THREE.MathUtils.clamp(
                        initialPolar + (mousePosition.y * Math.PI) / 6, // Apply vertical rotation
                        Math.PI / 3, // Limit how far up the user can look
                        Math.PI / 2.1 // Limit how far down the user can look
                    );

                    controlsRef.current.setAzimuthalAngle(azimuthalAngle); // Apply relative horizontal rotation
                    controlsRef.current.setPolarAngle(polarAngle); // Apply relative vertical rotation
                }
                controlsRef.current.update(); // Update the controls
            }
        });

        return <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} enableRotate={false} />;
    };

    return (
        <div className=" w-screen z-10 h-screen bg-transparent">
            <Canvas camera={{ position: [70, 20, 40], fov: 70 }} style={{ height: '100vh', width: '100vw' }}>
                {texture && (
                    texture.wrapS = THREE.RepeatWrapping,
                    texture.wrapT = THREE.RepeatWrapping,
                    texture.offset.set(-0.4, -0.05),
                    <mesh scale={[1, 1, 1]}> {/* Create an elliptical shape by scaling the X axis */}
                        <sphereGeometry args={[200, 60, 40]} />
                        <meshBasicMaterial 
                            map={texture} side={THREE.BackSide} />
                    </mesh>
                )}

                {/* Noise Effect */}
                {/*<EffectComposer>*/}
                {/*    <Noise opacity={0.05} /> */}
                {/*</EffectComposer>*/}

                <CameraController />
            </Canvas>
            <div className="absolute top-0 left-0 w-full h-screen z-10">{children}</div>
        </div>
    );
}
