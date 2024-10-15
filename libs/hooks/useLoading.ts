import { useState, useEffect } from 'react';

// Define the type of options that can be passed to the hook
interface LoadingOptions {
    delay?: number; // Optional delay in milliseconds
    onLoaded?: () => boolean | Promise<boolean>; // Optional function to determine when loading is complete
}

export const useLoading = (options?: LoadingOptions) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { delay = 2000, onLoaded } = options || {};

        if (onLoaded) {
            // If a custom function is provided, use it to determine when loading is finished
            const checkLoading = async () => {
                const isLoaded = await onLoaded(); // Call the custom loading function (can be async)
                if (isLoaded) {
                    setLoading(false);
                }
            };

            checkLoading();
        } else {
            // Use the delay if no custom function is provided
            const simulateLoading = setTimeout(() => {
                setLoading(false);
            }, delay);

            return () => clearTimeout(simulateLoading); // Cleanup timeout on unmount
        }
    }, [options]);

    return { loading };
};
