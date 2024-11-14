import {useVideoTexture} from "@react-three/drei";
import * as THREE from "three";
import React from "react";

// @ts-ignore
function VideoMaterial({ url }) {
    const texture = useVideoTexture(url);
    texture.flipY = false;

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3); 
    texture.offset.set(0.85, -0.45);  
    // texture.anisotropy = 8;

    return (
        <meshBasicMaterial
            map={texture}               
            // transparent={true}          
            // opacity={0.9}           
            side={THREE.FrontSide}      
            toneMapped={false}          
        />
    );
}

export default VideoMaterial;