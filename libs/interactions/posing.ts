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
export const customPose = (nodes, group) => {
    restPose(nodes);
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
};

// @ts-ignore
export const sidePose = (nodes, group) => {
    restPose(nodes);
    const adjustModelForScreenSize = () => {
        const screenWidth = window.innerWidth;
        if (group.current) {
            if (screenWidth <= 768) {
                group.current.scale.set(2, 2, 2);
                group.current.position.set(0, -3.5, 0.5);
                group.current.rotation.y = Math.PI / 2.5;
            } else if (screenWidth <= 1024) {
                group.current.scale.set(2.5, 2.5, 2.5);
                group.current.position.set(-0.6, -4.2, 0.5);
                group.current.rotation.y = Math.PI / 2;
            } else {
                group.current.scale.set(3, 3, 3);
                group.current.position.set(0, -4.6, 0.5);
                group.current.rotation.y = Math.PI / 2.4;
            }
        }
    };

    adjustModelForScreenSize();
}