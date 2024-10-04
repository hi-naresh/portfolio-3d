export type Project ={
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    available: string | undefined;
    link: string;
}

export type ProjectCardProps ={
    project: Project,
    position: {
        translateX: number;
        scale: number;
        zIndex: number;
        opacity: number;
        rotateY: number;
        translateZ: number;
    },
    isActive: boolean,
    initialLoad: boolean,
    nextSlide?: () => void,
    prevSlide?: () => void,
    isPrev?: boolean,
    currentIndex?: number
}
