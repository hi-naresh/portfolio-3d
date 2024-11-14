// export const restFrontPose = (nodes, group) => {
//     const headRef = nodes.Head;
//     const glassesRef = nodes.avaturn_glasses_0;
//     const glassesRef1 = nodes.avaturn_glasses_1;
//
//     // Adjust arms and hands
//     const leftArm = nodes.LeftArm;
//     const rightArm = nodes.RightArm;
//     const leftForeArm = nodes.LeftForeArm;
//     const rightForeArm = nodes.RightForeArm;
//     const leftHand = nodes.LeftHand;
//     const rightHand = nodes.RightHand;
//
//     if (leftArm) leftArm.rotation.x = Math.PI / 2.2;
//     if (leftForeArm) leftForeArm.rotation.y = -Math.PI / 8;
//     if (leftHand) leftHand.rotation.x = -Math.PI / 16;
//
//     if (rightArm) rightArm.rotation.x = Math.PI / 2.2;
//     if (rightForeArm) rightForeArm.rotation.y = Math.PI / 8;
//     if (rightHand) rightHand.rotation.x = -Math.PI / 12;
//
//     // Adjust for screen size
//     const adjustModelForScreenSize = () => {
//         const screenWidth = window.innerWidth;
//         if (group.current) {
//             if (screenWidth <= 768) {
//                 group.current.scale.set(2, 2, 2);
//                 group.current.position.set(0, -3, 0.5);
//             } else if (screenWidth <= 1024) {
//                 group.current.scale.set(2.5, 2.5, 2.5);
//                 group.current.position.set(0, -4.2, 0.7);
//             } else {
//                 group.current.scale.set(3, 3, 3);
//                 group.current.position.set(0, -4.6, 0.7);
//             }
//         }
//     };
//
//     adjustModelForScreenSize();
//     window.addEventListener("resize", adjustModelForScreenSize);
//
//     // Cleanup event listener on unmount
//     return () => window.removeEventListener("resize", adjustModelForScreenSize);
// };

// @ts-ignore
const restPose = (nodes) => {
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
}

// @ts-ignore
export const frontPose = (nodes, group) => {
    // restPose(nodes);
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

};

// @ts-ignore
export const sidePose = (nodes, group,isRight) => {
    restPose(nodes);
    const adjustModelForScreenSize = () => {
        const screenWidth = window.innerWidth;
        if (group.current) {
            if (screenWidth <= 768) {
                group.current.scale.set(2, 2, 2);
                group.current.position.set(0, -3.5, 0.5);
                group.current.rotation.y = isRight? Math.PI / 2.5 : -Math.PI / 2.5;
            } else if (screenWidth <= 1024) {
                group.current.scale.set(2.5, 2.5, 2.5);
                // group.current.position.set(-0.6, -4.2, 0.5);
                group.current.position.set(isRight? 0 :0.9, -4.2, 0.5);
                group.current.rotation.y = isRight? Math.PI / 2 : -Math.PI / 2.8;
                group.current.rotation.x = isRight? Math.PI / 8 : -Math.PI / 8;

            } else {
                group.current.scale.set(3, 3, 3);
                group.current.position.set(isRight? 0 :1.2, -4.8, 0.7);
                group.current.rotation.y = isRight? Math.PI / 2.4 : -Math.PI / 2.8;
                group.current.rotation.x = isRight? Math.PI / 8 : -Math.PI / 8;
            }
        }
    };

    adjustModelForScreenSize();

    window.addEventListener("resize", adjustModelForScreenSize);
    
    //log position of group for debugging
    

    return () => window.removeEventListener("resize", adjustModelForScreenSize);
}

// @ts-ignore
export const sideRightPose = (nodes, group) => {
    sidePose(nodes, group,true);
}

// @ts-ignore
export const sideLeftPose = (nodes, group) => {
    sidePose(nodes, group,false);
}

// @ts-ignore
export const floatingPose = (nodes, group) => {
    // Initial positioning for the floating effect
    let startY = group.current ? group.current.position.y : 0;
    const floatSpeed = 0.5; // Floating speed (adjustable)
    const floatHeight = 0.1; // Maximum height offset (adjustable)

    const updateFloatingPose = () => {
        if (group.current) {
            const elapsedTime = Date.now() * 0.001; // Use time in seconds
            // Apply floating Y position with sine wave oscillation
            group.current.position.y = startY + Math.sin(elapsedTime * floatSpeed) * floatHeight;

            // Optional: Add slight rotation to create a more dynamic floating effect
            group.current.rotation.y = Math.sin(elapsedTime * 0.1) * 0.05; // Small rotation around Y axis
            group.current.rotation.x = Math.cos(elapsedTime * 0.1) * 0.02; // Small rotation around X axis
        }
    };

    // Call the update function repeatedly for animation
    const animationInterval = setInterval(updateFloatingPose, 16); // 60fps

    // Clean up interval when unmounting
    return () => clearInterval(animationInterval);
};
