import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import Link from "next/link";
import { Project } from "../../@types/project";
import { handleLikeClick, handleRedirectClick, handleShareClick } from "@libs/guestService";
import NavBar from "@components/Gallery/MobileNav";

const TWEEN_FACTOR_BASE = 0.42;

const numberWithinRange = (number: number, min: number, max: number) =>
    Math.min(Math.max(number, min), max);

type PropType = {
    slides: Project[];
    options?: EmblaOptionsType;
    isMobile: boolean;
};

const MobileCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [viewDetails, setViewDetails] = useState<boolean[]>(Array(slides.length).fill(false));  // Track view state per slide
    const [stats, setStats] = useState({ likes: 0, shares: 0, redirects: 0 });

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
                            tweenNode.style.transition = 'transform 0.5s ease';
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

    // Toggle view details state for the current slide
    const toggleDetails = (index: number) => {
        setViewDetails((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index]; // Toggle the state
            return newState;
        });
    };

    return (
        <div className="w-full flex-row justify-center items-center mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {slides.map((project, index) => (
                        <div className="flex-shrink-0 pl-4 w-[70%] transition-transform duration-500"
                             key={project.id}>
                            <div className="embla__slide__content h-full p-[0.3rem] flex flex-col items-center justify-center border rounded-2xl bg-white/20 glassmorphism text-white relative">

                                {/* Conditionally render image or details */}
                                {!viewDetails[index] ? (
                                    <div className=" duration-500">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-52 p-0.5 object-cover rounded-2xl"
                                        />
                                        <div
                                            className="p-2.5 m-3 rounded-2xl bg-black border-[0.5px] border-white/40 bg-opacity-20">
                                            <h2 className="text-white text-lg text-center md:text-xl font-semibold">{project.title}</h2>
                                        </div>
                                    </div>
                                ) : (
                                    <div className=" flex flex-col items-center justify-center duration-500 my-2 h-50">
                                            {/*<h2 className="text-white text-lg md:text-xl font-semibold">{project.title}</h2>*/}
                                            <p className="p-2.5 m-1 text-white text-sm md:text-base mt-2 rounded-2xl bg-black border-[0.5px] border-white/60 bg-opacity-40 text-center">{project.description}</p>
                                            <div className="p-2.5 m-1 text-white text-sm md:text-base mt-2 rounded-2xl bg-black border-[0.5px] border-white/60 bg-opacity-40 text-center">
                                                Tech: {project.tech}</div>
                                    </div>
                                )}

                                {/* View/Hide Details Button */}
                                <button
                                    onClick={() => toggleDetails(index)}
                                    className=" w-[90%] p-3 text-center bg-black/30 border border-white/30 rounded-2xl"
                                >
                                    {viewDetails[index] ? "Hide Details" : "View Details"}
                                </button>

                                {/* Buttons */}
                                <div className="flex space-x-4 justify-center mt-4 my-2">
                                    <button
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
                                        onClick={() => handleShareClick(project, setStats)}
                                    >
                                        <img className="w-5 h-5 md:w-6 md:h-6 filter invert"
                                             src="/assets/icons/share.svg" alt="Share"/>
                                    </button>
                                    <button
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
                                        onClick={() => handleLikeClick(project, setStats, () => {})}
                                    >
                                        <img className="w-5 h-5 md:w-6 md:h-6 filter invert"
                                             src="/assets/icons/like.svg" alt="Like"/>
                                    </button>
                                    <Link
                                        href={project.link}
                                        className="p-3 rounded-full bg-black border-[0.5px] border-white/40 bg-opacity-20"
                                        onClick={() => handleRedirectClick(project, setStats)}
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

            {/* NavBar */}
            <NavBar
                selectedIndex={selectedIndex}
                prev={prevBtnDisabled}
                next={nextBtnDisabled}
                onPrev={onPrevButtonClick}
                onNext={onNextButtonClick}
            />
        </div>
    );
};

export default MobileCarousel;
