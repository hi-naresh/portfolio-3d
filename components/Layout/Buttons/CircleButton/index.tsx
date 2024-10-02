import React, { memo } from "react";

interface ControlButtonProps {
	onClick: () => void;
	icon: string;
	//optional disabled prop
	disabled?: boolean;
}

// eslint-disable-next-line react/display-name
const CircleButton: React.FC<ControlButtonProps> = memo(({ onClick, icon,disabled }) => (
	<button onClick={onClick} disabled={disabled} className="bg-white bg-opacity-10 border-[1px] border-white/20 rounded-full text-white p-2">
		<img src={icon} alt="control icon" className="w-6 h-6 filter invert" />
	</button>
));

export default CircleButton;
