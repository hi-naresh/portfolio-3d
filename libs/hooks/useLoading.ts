import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
        setLoading(false);
        //wait for 2 seconds , while animating the loader
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
