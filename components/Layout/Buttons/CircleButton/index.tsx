import React, { memo } from "react";
import { motion } from "framer-motion";

interface ControlButtonProps {
	onClick: () => void;
	icon: string;
	disabled?: boolean;
}

// eslint-disable-next-line react/display-name
const CircleButton: React.FC<ControlButtonProps> = memo(({ onClick, icon,disabled }) => (
	<motion.button
		whileHover={{ scale: 1.1 }} // Pop out further on hover
		onClick={onClick} disabled={disabled} className="bg-white bg-opacity-10 border-[1px] border-white/20 rounded-full text-white p-2">
		<img src={icon} alt="control icon" className="w-6 h-6 filter invert" />
	</motion.button>
));

export default CircleButton;
