import { useState, useCallback } from 'react';

const useMouseRotation = (windowHeight: number | null) => {
	const [rotation, setRotation] = useState({ x: 0, y: 0 });

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (windowHeight !== null) {
			const { clientX, clientY } = e;
			const centerX = window.innerWidth / 2;
			const centerY = windowHeight / 2;
			const moveX = (centerX - clientX) / centerX;
			const moveY = (centerY - clientY) / centerY;

			setRotation({
				x: moveY * 20,
				y: moveX * 20,
			});
		}
	}, [windowHeight]);

	return { rotation, handleMouseMove };
};

export default useMouseRotation;
