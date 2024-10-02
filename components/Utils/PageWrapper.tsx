'use client';

import React, { useEffect, useState } from 'react';
import {useLoading} from "@libs/hooks/useLoading";
import LoadingAnimation from "../Layout/loading";

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { loading } = useLoading();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return loading && isLoading ? <LoadingAnimation /> : <>{children}</>;
};

export default PageWrapper;