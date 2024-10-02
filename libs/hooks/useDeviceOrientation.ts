// import { useState, useCallback } from 'react';
//
// type DeviceOrientation = {
//     alpha: number | null;
//     beta: number | null;
//     gamma: number | null;
// };
//
// type UseDeviceOrientationData = {
//     orientation: DeviceOrientation | null;
//     requestAccess: () => Promise<boolean>;
//     revokeAccess: () => void;
//     error: Error | null;
// };
//
// export const useDeviceOrientation = (): UseDeviceOrientationData => {
//     const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
//     const [error, setError] = useState<Error | null>(null);
//
//     const handleOrientationChange = useCallback((event: DeviceOrientationEvent) => {
//         // Apply a low-pass filter to smooth the values
//         const smooth = (prev: number | null, next: number | null, factor: number) =>
//             prev === null ? next : prev * (1 - factor) + next! * factor;
//
//         const previousGamma = orientation?.gamma ?? 0;  // Handle null or undefined values
//         const previousBeta = orientation?.beta ?? 0;
//
//         const gamma = smooth(previousGamma, event.gamma, 0.1);
//         const beta = smooth(previousBeta, event.beta, 0.1);
//
//         // Clamping the gamma and beta to a reasonable range to avoid abrupt changes
//         const clampedGamma = Math.max(Math.min(gamma!, 45), -45);
//         const clampedBeta = Math.max(Math.min(beta!, 45), -45);
//
//         setOrientation({
//             alpha: event.alpha || 0,
//             beta: clampedBeta,
//             gamma: clampedGamma,
//         });
//     }, [orientation]);
//    
//     const requestAccess = useCallback(async (): Promise<boolean> => {
//         if (typeof DeviceOrientationEvent === 'undefined') {
//             setError(new Error('Device orientation is not supported'));
//             return false;
//         }
//
//         if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
//             try {
//                 const permission = await (DeviceOrientationEvent as any).requestPermission();
//                 if (permission === 'granted') {
//                     window.addEventListener('deviceorientation', handleOrientationChange);
//                     return true;
//                 } else {
//                     setError(new Error('Permission denied for device orientation'));
//                     return false;
//                 }
//             } catch (err) {
//                 setError(new Error('Failed to request permission for device orientation'));
//                 return false;
//             }
//         } else {
//             // For browsers where no permission is required
//             window.addEventListener('deviceorientation', handleOrientationChange);
//             return true;
//         }
//     }, [handleOrientationChange]);
//
//     const revokeAccess = useCallback(() => {
//         window.removeEventListener('deviceorientation', handleOrientationChange);
//         setOrientation(null);
//     }, [handleOrientationChange]);
//
//     return { orientation, requestAccess, revokeAccess, error };
// };

import { useState, useCallback } from 'react';

type DeviceOrientation = {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};

type UseDeviceOrientationData = {
    orientation: DeviceOrientation | null;
    requestAccess: () => Promise<boolean>;
    revokeAccess: () => void;
    error: Error | null;
    resetOrientation: () => void; // Add reset function
};

type UseDeviceOrientationProps = {
    initialAlpha?: number;  // Optional initial alpha value
    initialBeta?: number;   // Optional initial beta value
    initialGamma?: number;  // Optional initial gamma value
};

export const useDeviceOrientation = ({
                                         initialAlpha = 0,  // Default to 0 if not provided
                                         initialBeta = 0,   // Default to 0 if not provided
                                         initialGamma = 0,  // Default to 0 if not provided
                                     }: UseDeviceOrientationProps = {}): UseDeviceOrientationData => {
    const [orientation, setOrientation] = useState<DeviceOrientation>({
        alpha: initialAlpha,
        beta: initialBeta,
        gamma: initialGamma,
    });
    const [error, setError] = useState<Error | null>(null);

    const handleOrientationChange = useCallback((event: DeviceOrientationEvent) => {
        // Apply a low-pass filter to smooth the values
        const smooth = (prev: number | null, next: number | null, factor: number) =>
            prev === null ? next : prev * (1 - factor) + next! * factor;

        const previousGamma = orientation?.gamma ?? initialGamma;  // Use initialGamma if undefined
        const previousBeta = orientation?.beta ?? initialBeta;     // Use initialBeta if undefined

        const gamma = smooth(previousGamma, event.gamma, 0.1);
        const beta = smooth(previousBeta, event.beta, 0.1);

        // Clamping the gamma and beta to a reasonable range to avoid abrupt changes
        const clampedGamma = Math.max(Math.min(gamma!, 45), -45);
        const clampedBeta = Math.max(Math.min(beta!, 45), -45);

        setOrientation({
            alpha: event.alpha ?? initialAlpha,
            beta: clampedBeta,
            gamma: clampedGamma,
        });
    }, [orientation, initialAlpha, initialBeta, initialGamma]);

    const requestAccess = useCallback(async (): Promise<boolean> => {
        if (typeof DeviceOrientationEvent === 'undefined') {
            setError(new Error('Device orientation is not supported'));
            return false;
        }

        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientationChange);
                    return true;
                } else {
                    setError(new Error('Permission denied for device orientation'));
                    return false;
                }
            } catch (err) {
                setError(new Error('Failed to request permission for device orientation'));
                return false;
            }
        } else {
            // For browsers where no permission is required
            window.addEventListener('deviceorientation', handleOrientationChange);
            return true;
        }
    }, [handleOrientationChange]);

    const revokeAccess = useCallback(() => {
        window.removeEventListener('deviceorientation', handleOrientationChange);
        setOrientation({
            alpha: initialAlpha,  // Reset to initial values
            beta: initialBeta,
            gamma: initialGamma,
        });
    }, [handleOrientationChange, initialAlpha, initialBeta, initialGamma]);

    // Function to reset the orientation to the starting values
    const resetOrientation = useCallback(() => {
        setOrientation({
            alpha: initialAlpha,
            beta: initialBeta,
            gamma: initialGamma,
        });
    }, [initialAlpha, initialBeta, initialGamma]);

    return { orientation, requestAccess, revokeAccess, error, resetOrientation };
};


// import {
//     CSSProperties,
//     useCallback,
//     useEffect,
//     useState,
// } from 'react';
//
// // @see: https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// export type DeviceOrientation = {
//     absolute: boolean,
//     alpha: number | null,
//     beta: number | null,
//     gamma: number | null,
// }
//
// type UseDeviceOrientationData = {
//     orientation: DeviceOrientation | null,
//     error: Error | null,
//     cssTransformInverse: CSSProperties,
//     // The requestAccess() could only be called on a user gesture (e.g. on click).
//     // @see: https://developer.apple.com/forums/thread/128376
//     requestAccess: () => Promise<boolean>,
//     revokeAccess: () => Promise<void>,
// };
//
// const roundAngle = (angle: number | null): number | null => {
//     if (typeof angle !== 'number') {
//         return angle;
//     }
//     const fractionDigits = 2;
//     return +angle.toFixed(fractionDigits);
// };
//
// export const useDeviceOrientation = (): UseDeviceOrientationData => {
//     const [error, setError] = useState<Error | null>(null);
//     const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
//     const [cssTransformInverse, setCssTransformInverse] = useState<CSSProperties>({});
//
//     const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
//         const angles: DeviceOrientation = {
//             alpha: roundAngle(event.alpha),
//             beta: roundAngle(event.beta),
//             gamma: roundAngle(event.gamma),
//             absolute: event.absolute,
//         };
//         setOrientation(angles);
//         if (angles
//             && typeof angles.alpha === 'number'
//             && typeof angles.beta === 'number'
//             && typeof angles.gamma === 'number'
//         ) {
//             const a = angles.alpha > 180 ? angles.alpha - 360 : angles.alpha;
//             const b = angles.beta - 90;
//             const g = angles.gamma > 180 ? 360 - angles.gamma : -angles.gamma;
//             setCssTransformInverse({
//                 transform: `rotateX(${b}deg) rotateY(${g}deg) rotateZ(${a}deg)`,
//             });
//         }
//     };
//
//     const revokeAccessAsync = async (): Promise<void> => {
//         window.removeEventListener('deviceorientation', onDeviceOrientation);
//         setOrientation(null);
//         setCssTransformInverse({});
//     };
//
//     const requestAccessAsync = async (): Promise<boolean> => {
//         if (!DeviceOrientationEvent) {
//             setError(new Error('Device orientation event is not supported by your browser'));
//             return false;
//         }
//
//         // Requesting the permission to access device orientation in iOS.
//         // @see: https://developer.apple.com/forums/thread/128376
//         if (
//             // @ts-ignore
//             DeviceOrientationEvent.requestPermission
//             // @ts-ignore
//             && typeof DeviceMotionEvent.requestPermission === 'function'
//         ) {
//             let permission: PermissionState;
//             try {
//                 // @ts-ignore
//                 permission = await DeviceOrientationEvent.requestPermission();
//             } catch (err) {
//                 // @ts-ignore
//                 const e = new Error((err && err.message) || 'unknown error');
//                 setError(e);
//                 return false;
//             }
//             if (permission !== 'granted') {
//                 setError(new Error('Request to access the device orientation was rejected'));
//                 return false;
//             }
//         }
//
//         window.addEventListener('deviceorientation', onDeviceOrientation);
//
//         return true;
//     };
//
//     const requestAccess = useCallback(requestAccessAsync, []);
//     const revokeAccess = useCallback(revokeAccessAsync, []);
//
//     useEffect(() => {
//         return (): void => {
//             revokeAccess();
//         };
//     }, [revokeAccess]);
//
//     return {
//         orientation,
//         error,
//         requestAccess,
//         revokeAccess,
//         cssTransformInverse,
//     };
// };