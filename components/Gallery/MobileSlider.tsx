import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {EmblaCarouselType, EmblaEventType, EmblaOptionsType} from 'embla-carousel';
import {motion} from "framer-motion";
import CircleButton from "@components/Layout/Buttons/CircleButton";
import projects from "../../data/projects";
import Link from "next/link";

const TWEEN_FACTOR_BASE = 0.42;

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max);

type ProjectType = {
    id: number;
    image: string;
    title: string;
    description: string;
    tech: string;
    link: string;
};

type PropType = {
    slides: ProjectType[]; // The slides will be ProjectType objects
    options?: EmblaOptionsType;
    isMobile: boolean;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__slide__content') as HTMLElement;
        });
    }, []);

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            if (!emblaApi) return;

            const engine = emblaApi.internalEngine();
            const scrollProgress = emblaApi.scrollProgress();
            const slidesInView = emblaApi.slidesInView();

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress;
                const slidesInSnap = engine.slideRegistry[snapIndex];

                slidesInSnap.forEach((slideIndex) => {
                    const tweenNode = tweenNodes.current[slideIndex];

                    if (tweenNode) {
                        if (slidesInView.includes(slideIndex)) {
                            const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                            const scale = numberWithinRange(tweenValue, 0.85, 1.15).toString();
                            tweenNode.style.transform = `scale(${scale})`;
                            tweenNode.style.transition = 'transform 0.3s ease';
                        } else {
                            tweenNode.style.transform = 'scale(1)';
                        }
                    }
                });
            });
        },
        []
    );

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenScale)
            .on('scroll', tweenScale)
            .on('select', () => onSelect(emblaApi));

        onSelect(emblaApi);
    }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale, onSelect]);

    return (
        <div className="w-full flex-row justify-center items-center mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {slides.map((project) => (
                        <div className="flex-shrink-0 pl-4 w-[70%] transition-transform duration-300" 
                             key={project.id}>
                            <div
                                className="embla__slide__content h-full p-2 pb-4 border rounded-2xl bg-white/20 glassmorphism text-white">
                                {/* Display project details */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-2xl"
                                />
                                <div className="p-2.5 m-3 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                                    <h2 className="text-white text-lg text-center md:text-xl font-semibold">{project.title}</h2>
                                </div>

                                {/* Description */}
                                {/*<div className="p-4 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">*/}
                                {/*    <p className="text-white text-sm md:text-base">{project.description}</p>*/}
                                {/*</div>*/}

                                {/* Tech Stack */}
                                <div className="p-2.5 m-3 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                                    <span className="text-white text-sm md:text-base">Tech Used: {project.tech}</span>
                                </div>
                                <div className="flex space-x-4 justify-center">
                                    <button
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                                        <img className="w-5 h-5 md:w-6 md:h-6 filter invert"
                                             src="/assets/icons/share.svg" alt="Share"/>
                                    </button>
                                    <button
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20">
                                        <img className="w-5 h-5 md:w-6 md:h-6 filter invert"
                                             src="/assets/icons/like.svg" alt="Like"/>
                                    </button>
                                    <Link
                                        href={project.link}
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
                                    >
                                        <img className="w-5 h-5 md:w-6 md:h-6 filter invert"
                                             src="/assets/icons/redirect.svg" alt="Redirect"/>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*//NavBar*/}
            <motion.div
                className=" mt-12 w-[100%] flex justify-center items-center"
                initial={{width: 0}}
                animate={{width: '100%'}}
                transition={{delay: 0.5, duration: 2, ease: 'easeOut'}}
            >
                <motion.div
                    className="glassmorphism p-1 rounded-full flex justify-between items-center"
                    initial={{width: 0}}
                    animate={{width: '20rem'}}
                    transition={{delay: 0.1, duration: 2, ease: "circOut"}}
                >
                    <CircleButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}
                                  icon="/icons/site/icon9.svg"/>
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                            transition={{delay: 2, duration: 2}}
                            className="text-white pt-2 h-10 flex-col justify-center items-center text-lg font-bold"
                        >
                            {projects[selectedIndex].title}
                        </motion.p>
                        <div className="transform rotate-180">
                            <CircleButton onClick={onNextButtonClick} disabled={nextBtnDisabled}
                                          icon="/icons/site/icon9.svg"/>
                        </div>
                    </motion.div>
                </motion.div>

        </div>
    );
};

export default EmblaCarousel;
