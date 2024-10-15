import {useVideoTexture} from "@react-three/drei";
import * as THREE from "three";
import React from "react";

// @ts-ignore
function VideoMaterial({ url }) {
    const texture = useVideoTexture(url);
    texture.flipY = false;

    // Ensure the texture doesn't repeat unnecessarily
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);  // Example of making the texture repeat
    texture.offset.set(0.85, -0.45);  // Example to move texture slightly
    texture.anisotropy = 8;

    return (
        <meshBasicMaterial
            map={texture}               // Video texture applied to the material
            // clearcoat={0.1}               // Adds a clear coating on top of the material
            // clearcoatRoughness={0.9}    // Defines the roughness of the clear coat
            transparent={true}          // Allows transparency
            opacity={0.8}               // Controls the opacity of the material (set to 1.0 to make the video fully visible)
            side={THREE.FrontSide}      // Ensures the video is rendered on the front side
            toneMapped={true}          // Disable tone mapping for video textures
        />
    );
}

export default VideoMaterial;