import { useRef, useEffect } from "react";

const useParallaxEffect = () => {
	const parallaxX = useRef(0);
	const parallaxY = useRef(0);
	const requestRef = useRef(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY, currentTarget } = e;
		const { width, height } = currentTarget.getBoundingClientRect();

		const x = ((clientX / width) - 0.5) * -30;
		const y = ((clientY / height) - 0.5) * -30;

		document.documentElement.style.setProperty('--parallaxBgX', `${50 + x}%`);
		document.documentElement.style.setProperty('--parallaxBgY', `${50 + y}%`);

		parallaxX.current = x;
		parallaxY.current = y;
	};

	const applyParallaxEffect = () => {
		requestRef.current = requestAnimationFrame(applyParallaxEffect);
		document.documentElement.style.setProperty('--parallaxX', `${parallaxX.current}px`);
		document.documentElement.style.setProperty('--parallaxY', `${parallaxY.current}px`);
	};

	useEffect(() => {
		applyParallaxEffect();
		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	return handleMouseMove;
};

export default useParallaxEffect;
