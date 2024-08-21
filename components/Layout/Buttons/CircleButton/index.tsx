import React, { memo } from "react";

interface ControlButtonProps {
	onClick: () => void;
	icon: string;
}

// eslint-disable-next-line react/display-name
const CircleButton: React.FC<ControlButtonProps> = memo(({ onClick, icon }) => (
	<button onClick={onClick} className="glassmorphism rounded-full text-white p-2">
		<img src={icon} alt="control icon" className="w-6 h-6 filter invert" />
	</button>
));

export default CircleButton;
