import * as THREE from "three";
// @ts-ignore
export const scrollInteraction = (headRef, isMobile) => {
    if (typeof window !== "undefined" && headRef.current) {
        import("gsap").then((gsapModule) => {
            const gsap = gsapModule.default;
            import("gsap/dist/ScrollTrigger").then((gsapModule) => {

                const ScrollTrigger = gsapModule.ScrollTrigger;
                gsap.registerPlugin(ScrollTrigger);

                // GSAP scroll-triggered timeline to rotate head
                // Initially set the head's rotation to -45 degrees (looking down)
                headRef.current.rotation.x = THREE.MathUtils.degToRad(-40);

                // GSAP scroll-triggered timeline to rotate head
                // Horizontal scroll-triggered timeline to rotate head
                const mobileTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#scroll-section", // The ID of the scrollable section
                        start: "left left",
                        end: "right right", // Horizontal scrolling
                        scrub: true,
                        markers: false,
                    },
                });
                
                const desktopTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#scroll-section",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        markers: false,
                    },
                });
                
                const tl = isMobile ? mobileTl : desktopTl;

                // Rotate head from -45° (initial) to 45° (upward) as you scroll
                tl
                    .to(headRef.current.rotation, { x: THREE.MathUtils.degToRad(-40),duration: 0 }, 0)
                    .to(headRef.current.rotation, { x: THREE.MathUtils.degToRad(15),duration: 1},0)
            });
        });
    }
};

//@ts-ignore
export const headMouseInteraction = (state, { headRef }) => {
    const { mouse } = state;
    if (headRef.current) {
        const targetRotationX = -mouse.y * Math.PI / 3;
        const targetRotationY = mouse.x * Math.PI / 4;
        const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI, Math.PI / 60);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedRotationX, 0.1);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
    }
};

//@ts-ignore
export const headMouseInteractionVertical = (state, { headRef, beamRef,glassesRef1 }) => {
    const { mouse } = state; // Mouse state provides normalized x, y between -1 and 1

    // Ensure headRef and headRef.current are available
    if (!headRef || !headRef.current || !beamRef || !beamRef.current) {
        console.warn('headRef or glassesRef1 is undefined or not properly initialized');
        return;
    }

    // Mapping mouse.y (-1 to 1) to degrees between -40° and 15°
    const targetRotationX = THREE.MathUtils.mapLinear(
        mouse.y,
        1, // Top of the screen
        -1, // Bottom of the screen
        THREE.MathUtils.degToRad(-40), // Looking down
        THREE.MathUtils.degToRad(15)   // Looking up
    );

    // Optionally clamp the rotation if you want to restrict extreme head movements
    const clampedRotationX = THREE.MathUtils.clamp(
        targetRotationX,
        THREE.MathUtils.degToRad(-40),
        THREE.MathUtils.degToRad(15)
    );

    // Smoothly interpolate between current and target rotation for smooth animation
    headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        clampedRotationX,
        0.1
    );
    
    //make beam ref position clamp without needing headref
    beamRef.current.position.y = THREE.MathUtils.lerp(
        beamRef.current.position.y,
        THREE.MathUtils.mapLinear(
            mouse.y,
            1, // Top of the screen
            -1, // Bottom of the screen
            1.89, // Looking down
            1.55   // Looking up
        ),
        0.1
    );

    beamRef.current.position.z = THREE.MathUtils.lerp(
        beamRef.current.position.z,
        THREE.MathUtils.mapLinear(
            mouse.y,
            1, // Top of the screen
            -1, // Bottom of the screen
            0.265, // Looking down
            0.31  // Looking up
        ),
        0.1
    );
    
    

    // Make sure the glasses (and the rays) follow the head movement
    beamRef.current.rotation.x = headRef.current.rotation.x; // Match the X rotation of the head
};

//@ts-ignore
export const headMouseInteractionHorizontal = (state, { headRef }) => {
    const { mouse } = state; // Mouse state provides normalized x, y between -1 and 1

    // Ensure headRef and headRef.current are available
    if (!headRef || !headRef.current) {
        console.warn('headRef is undefined or not properly initialized');
        return;
    }

    // Mapping mouse.x (-1 to 1) to degrees between -40° and 40°
    const targetRotationY = THREE.MathUtils.mapLinear(
        mouse.x,
        1, // Left of the screen
        -1,  // Right of the screen
        THREE.MathUtils.degToRad(-40), // Looking left
        THREE.MathUtils.degToRad(40)   // Looking right
    );

    const targetRotationX = THREE.MathUtils.mapLinear(
        mouse.y,
        1, // Left of the screen
        -1,  // Right of the screen
        THREE.MathUtils.degToRad(-40), // Looking left
        THREE.MathUtils.degToRad(0)   // Looking right
    );

    // Optionally clamp the rotation if you want to restrict extreme head movements
    const clampedRotationY = THREE.MathUtils.clamp(
        targetRotationY,
        THREE.MathUtils.degToRad(-40),
        THREE.MathUtils.degToRad(40)
    );

    // Smoothly interpolate between current and target rotation for smooth animation
    headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        clampedRotationY,
        0.1
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
    );
}


// export const headMouseInteractionVertical = (state, { headRef }) => {
//     const { mouse } = state; // Mouse state provides normalized x, y between -1 and 1
//
//     // Ensure headRef and headRef.current are available
//     if (!headRef || !headRef.current) {
//         console.warn('headRef is undefined or not properly initialized');
//         return;
//     }
//
//     // Mapping mouse.y (-1 to 1) to degrees between -40° and 15°
//     const targetRotationX = THREE.MathUtils.mapLinear(mouse.y, 1, -1, THREE.MathUtils.degToRad(-40), THREE.MathUtils.degToRad(15));
//
//     // Optionally clamp the rotation if you want to restrict extreme head movements
//     const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, THREE.MathUtils.degToRad(-40), THREE.MathUtils.degToRad(15));
//
//     // Smoothly interpolate between current and target rotation for smooth animation
//     headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedRotationX, 0.1);
// };



// export const ModelHeadInteraction = (headRef: { current: { rotation: { x: number; y: number; }; }; }, isMobile: any, orientation: { beta: any; gamma: any; }) => {
//     useFrame((state) => {
//         const { mouse } = state;
//
//         if (headRef.current) {
//             if (isMobile) {
//                 const targetRotationX = THREE.MathUtils.degToRad(orientation.beta ?? 0); // Up/Down tilt
//                 const targetRotationY = THREE.MathUtils.degToRad(orientation.gamma ?? 0); // Left/Right tilt
//
//                 // Sensitivity adjustments for device orientation
//                 const ySensitivity = -1.5; // Increase Y-axis sensitivity (vertical rotation)
//                 const xSensitivity = 1.5;  // Increase X-axis sensitivity (horizontal rotation)
//
//                 // Apply the rotation smoothly using `lerp`
//                 headRef.current.rotation.x = THREE.MathUtils.lerp(
//                     headRef.current.rotation.x,
//                     targetRotationX * xSensitivity * -0.5, // Adjust scale for smooth movement
//                     0.1
//                 );
//                 headRef.current.rotation.y = THREE.MathUtils.lerp(
//                     headRef.current.rotation.y,
//                     targetRotationY * ySensitivity * 0.8,  // Adjust scale for smooth movement
//                     0.1
//                 );
//             } else {
//                 const targetRotationX = -mouse.y * Math.PI / 3;
//                 const targetRotationY = mouse.x * Math.PI / 4;
//
//                 // Clamp and smooth the mouse interaction for the head
//                 const clampedRotationX = THREE.MathUtils.clamp(targetRotationX, -Math.PI, Math.PI / 60);
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
// };

