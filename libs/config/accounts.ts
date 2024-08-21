import {
	FaSpotify,
} from "react-icons/fa";
import {
	FiGithub,
	FiInstagram,
	FiLinkedin,
	FiMail
} from "react-icons/fi";

export const CONTACT = [
	{
		href: "mailto:hello.nareshjhawar@gmail.com",
		icon: FiMail,
		name: "E-Mail",
		value: "hello.nareshjhawar@gmail.com",
		color: "text-red-500",
	},
	{
		href: "https://github.com/hi-naresh",
		icon: FiGithub,
		name: "GitHub",
		value: "@hi-naresh",
		color: "text-dark",
	},
	{
		href: "https://www.linkedin.com/in/naresh-jhawar/",
		icon: FiLinkedin,
		name: "Linkedin",
		value: "naresh-jhawar",
		color: "text-blue-500",
	},
	{
		href: "https://instagram.com/nareshjhawar",
		icon: FiInstagram,
		name: "Instagram",
		value: "@nareshjhawar",
		color: "text-pink-500",
	}
];

export const SOCIALS = [
	{
		href: "https://open.spotify.com/user/nareshjhawar",
		icon: FaSpotify,
		name: "Spotify",
		value: "Naresh Jhawar",
		color: "text-green-500",
	}
];
