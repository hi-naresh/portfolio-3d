import {Canvas, useFrame, useThree} from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { OrbitControls} from '@react-three/drei';
import * as THREE from 'three';

// Utility function to preload a texture using a promise
const loadTexture = (url: string) => {
    return new Promise<THREE.Texture>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
            url,
            (texture) => resolve(texture),
            undefined,
            (error) => reject(error)
        );
    });
};

export default function ThreeSixtyBackground({
                                                 children, 
                                                 image, 
                                                 bgClass,
                                                 verticalViewLimit=1,
                                                 background 
}: { children: React.ReactNode, verticalViewLimit?:number , bgClass?:string, image?:string, background:string }) {
    const [textures, setTextures] = useState<{ [key: string]: THREE.Texture }>({});
    const [currentTexture, setCurrentTexture] = useState<THREE.Texture | null>(null);

    // Preload both textures once when the component mounts
    useEffect(() => {
        const preloadTextures = async () => {
            try {
                // Preload the light and dark textures
                const [lightTexture, darkTexture] = await Promise.all([
                    loadTexture('/assets/texture/light.jpg'),
                    loadTexture('/assets/texture/dark.jpg'),
                ]);

                setTextures({
                    light: lightTexture,
                    dark: darkTexture,
                });
            } catch (error) {
                console.error('Error loading textures:', error);
            }
        };

        preloadTextures();
    }, []);

    // Update the current texture based on the background prop
    useEffect(() => {
        if (image)
        {
            const texture = new THREE.TextureLoader().load(image);
            setCurrentTexture(texture);
        }
        if (textures[background] && !image) {
            setCurrentTexture(textures[background]);
        }
    }, [image,background, textures]);

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
        const [initialAzimuthal, setInitialAzimuthal] = useState(Math.PI/4); // Store the initial azimuthal angle
        const [initialPolar, setInitialPolar] = useState(Math.PI / 2); // Store the initial polar angle (vertical)


        useFrame(() => {
            if (controlsRef.current) {
                if (initialView) {
                    const initialAzimuth =  controlsRef.current.getAzimuthalAngle(); // Look at the horizontal center of the image (custom value if needed)
                    controlsRef.current.setAzimuthalAngle(initialAzimuth); // Set initial horizontal look
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

        const { camera } = useThree();
        const [isZoomingOut, setIsZoomingOut] = useState(true); // Controls FOV animation

        const initialFov = 15; // Starting FOV
        const targetFov = 70; // Ending FOV

        useFrame(() => {
            if (isZoomingOut) {
                // Smoothly interpolate the camera FOV
                // @ts-ignore
                camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.02);
                camera.updateProjectionMatrix();

                // Stop animation when close enough to target FOV
                // @ts-ignore
                if (Math.abs(camera.fov - targetFov) < 0.1) {
                    // @ts-ignore
                    camera.fov = targetFov;
                    setIsZoomingOut(false);
                }
            }
        });

        return <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} enableRotate={false} />;
    };

    return (
        <div className={`w-screen ${bgClass} z-10 h-screen bg-transparent`}>
            <Canvas
                gl={{antialias: false}}
                camera={{position: [70, 20, 40], fov: 15}} style={{height: '100vh', width: '100vw'}}>
                {currentTexture && (
                    currentTexture.wrapS = THREE.RepeatWrapping,
                        currentTexture.wrapT = THREE.RepeatWrapping,
                        // image&& currentTexture.repeat.set(2,2),
                        currentTexture.offset.set(-0.4, -0.05),
                        <mesh scale={[1, 1, 1]}>
                            <sphereGeometry args={[200, 60, 40]}/>
                            <meshBasicMaterial toneMapped={true} map={currentTexture} side={THREE.BackSide}/>
                        </mesh>
                )}
                <CameraController/>
            </Canvas>
            <div className="absolute top-0 left-0 w-full h-screen z-10">{children}</div>
        </div>
    );
}
