import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300); // Transition time for animation to move
      }, 200); // Minimum 1 second delay
    };

    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);

    // Ensure we complete initial loading
    handleComplete();

    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
    };
  }, []);

  return { loading };
};
