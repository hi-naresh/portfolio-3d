import { useState, useEffect } from 'react';

const useWindowHeight = (): number | null => {
	const [windowHeight, setWindowHeight] = useState<number | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setWindowHeight(window.innerHeight);
		}
	}, []);

	return windowHeight;
};

export default useWindowHeight;
