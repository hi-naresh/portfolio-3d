import { useEffect, useState, useRef } from 'react';
import {useIsMobile} from "@libs/hooks/useIsMobile";

const message = "Sorry for the interruption but your device might not support high-performance rendering. Your device might be an old/low-end device. Please use a modern device/high-end pc for the best experience.";
const useManualPerformanceMonitor = (threshold = 30, warningMessage = message) => {
    const [lowPerformance, setLowPerformance] = useState(false);
    const frameCountRef = useRef(0);
    const lastTimestampRef = useRef(performance.now());
    
    const isMobile = useIsMobile();

    useEffect(() => {
        let animationFrameId: number;

        const checkPerformance = (timestamp: number) => {
            frameCountRef.current += 1;
            const delta = timestamp - lastTimestampRef.current;

            // Check every second
            if (delta >= 1000) {
                const fps = (frameCountRef.current / delta) * 1000;

                // Detect if FPS drops below the threshold
                if (fps < threshold) {
                    setLowPerformance(true);
                } else {
                    setLowPerformance(false);
                }

                frameCountRef.current = 0;
                lastTimestampRef.current = timestamp;
            }

            animationFrameId = requestAnimationFrame(checkPerformance);
        };

        animationFrameId = requestAnimationFrame(checkPerformance);

        return () => cancelAnimationFrame(animationFrameId);
    }, [threshold]);
    
    const message = isMobile ? "Sorry for the interruption but please use a good pc for the best experience." : warningMessage;

    return { lowPerformance, message };
};

export default useManualPerformanceMonitor;
