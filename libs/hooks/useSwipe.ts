import { useState, useEffect } from 'react';

const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const minSwipeDistance = 50; // Minimum distance to consider a valid swipe

    // When touch starts, record the initial touch point
    const handleTouchStart = (e: TouchEvent) => {
        setTouchEndX(null); // Reset touchEnd
        setTouchStartX(e.targetTouches[0].clientX); // Record the starting X position
    };

    // When touch moves, record the last touch point
    const handleTouchMove = (e: TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX); // Update the current touch X position
    };

    // When touch ends, calculate if swipe was successful
    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;

        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > minSwipeDistance; // Left swipe if distance is greater than the minimum
        const isRightSwipe = distance < -minSwipeDistance; // Right swipe if distance is less than negative minimum

        if (isLeftSwipe) {
            onSwipeLeft();
        } else if (isRightSwipe) {
            onSwipeRight();
        }
    };

    // Add touch event listeners on mount
    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [touchStartX, touchEndX]);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
};

export default useSwipe;
