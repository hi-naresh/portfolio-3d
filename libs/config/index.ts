import { CONTACT, SOCIALS } from "@libs/config/accounts";

const NOW = new Date().getFullYear();
const STARTED_AT = 2019; // Assuming you started professional work in 2019
const EXPERIENCE = NOW - STARTED_AT;

export interface IFramework {
	name: string;
	color: string;
	experience: number;
	icon: string;
}

const domain = "nareshjhawar.in";

const SEO = {
	layoutTitle: "%s - Naresh Jhawar",
	title: "Home - Naresh Jhawar",
	domain,
	publishDomain: `https://${domain}`,
	themeColor: "#FF005D", 
	keywords: [
		"naresh",
		"jhawar",
		"developer",
		"fullstack",
		"react",
		"flutter",
		"nextjs",
		"web development",
		"blockchain",
	],
	description: "Welcome to Naresh Jhawar's profile!",
};

export const CONFIG = {
	EMAIL: "hello.nareshjhawar@gmail.com",
	GITHUB_USERNAME: "hi-naresh",
	AVATAR_URL: "https://avatars.githubusercontent.com/u/130601453?v=4",
	STARTED_AT,
	NOW,
	EXPERIENCE,
	GA_TRACKING_ID: "G-XXXXX", // Google Analytics ID, if available
	IMPORTANT_SKILLS: [
		"JavaScript (Node & Client-Side)",
		"TypeScript",
		"Python",
		"GoLang",
		"NoSQL (MongoDB & Firebase)",
		"SQL (PostgreSQL & SQL)",
	],
	FAVOURITE_FRAMEWORKS: [
		{
			name: "Flutter",
			color: "bg-blue-500 dark:bg-blue-800",
			experience: NOW - 2020,
			// icon: FlutterSVG,
		},
		{
			name: "ReactJS",
			color: "bg-blue-600 dark:bg-blue-800",
			experience: NOW - 2019,
			// icon: ReactSVG,
		},
		{
			name: "NextJS",
			color: "bg-gray-500 dark:bg-gray-700",
			experience: NOW - 2020,
			// icon: NextSVG,
		},
		{
			name: "MongoDB",
			color: "bg-green-500 dark:bg-green-800",
			experience: NOW - 2020,
			// icon: MongoDBSVG,
		},
		{
			name: "TailwindCSS",
			color: "bg-blue-500 dark:bg-blue-800",
			experience: NOW - 2021,
			// icon: TailwindSVG,
		},
	] as IFramework[],
	INTERESTS: [
		{
			name: "Blockchain",
			color: "text-gray-600 dark:text-gray-400",
			href: "https://ethereum.org/",
		},
		{
			name: "Flutter",
			color: "text-blue-600 dark:text-blue-400",
			href: "https://flutter.dev/",
		},
		{
			name: "ReactJS",
			color: "text-blue-600 dark:text-blue-400",
			href: "https://reactjs.org/",
		},
		{
			name: "NextJS",
			color: "text-indigo-700 dark:text-indigo-300",
			href: "https://nextjs.org/",
		},
		{
			name: "GoLang",
			color: "text-blue-600 dark:text-blue-400",
			href: "https://golang.org/",
		},
	],
	CONTACT,
	SOCIALS,
	BLOG: {
		discussions: {
			username: "hi-naresh",
			repo: "portfolio",
			repo_id: "MDEwOlJlcG9zaXRvcnkzNzgzMjQ4NA==", // Example repo ID, replace with actual
		},
	},
	SOURCE: {
		repo: "portfolio",
		username: "hi-naresh",
	},
	DEV: process.env.NODE_ENV != "production",
	REVALIDATION: 60 * 5,
	SEO,
	PHONE: "+91 9828649826",
	LOCATION: "Surat, Gujarat, India",
	SKILLS: [
		[
			{
				name: "English (Fluent)",
				value: 80,
				color: "bg-blue-600",
			},
			{
				name: "Hindi (Native)",
				value: 100,
				color: "bg-red-600",
			},
		],
		[
			{
				name: "JavaScript",
				value: 90,
				color: "bg-yellow-600",
			},
			{
				name: "TypeScript",
				value: 85,
				color: "bg-blue-600",
			},
			{
				name: "GoLang",
				value: 70,
				color: "bg-blue-600",
			},
			{
				name: "Python",
				value: 90,
				color: "bg-green-500",
			},
		],
		[
			{
				name: "ReactJS",
				value: 85,
				color: "bg-blue-600",
			},
			{
				name: "NextJS",
				value: 80,
				color: "bg-gray-600",
			},
			{
				name: "Flutter",
				value: 75,
				color: "bg-blue-600",
			},
			{
				name: "TailwindCSS",
				value: 70,
				color: "bg-blue-600",
			},
		],
		[
			{
				name: "MongoDB",
				value: 85,
				color: "bg-green-600",
			},
			{
				name: "Firebase",
				value: 80,
				color: "bg-yellow-600",
			},
			{
				name: "PostgreSQL",
				value: 75,
				color: "bg-blue-600",
			},
			{
				name: "SQL",
				value: 80,
				color: "bg-blue-600",
			},
		],
	],
	EDUCATION: [
		{
			name: "agu",
			department: "eee",
			era: "2021 - 2024",
			degree: "bachelors",
			gpa: "9.1/10",
		},
	],
	WORK_EXPERIENCE: [
		{
			name: "Auro University & SAILC",
			era: "May 2022 - Present",
			title: "Software Developer",
			location: "Surat, Gujarat, India",
			description:
				"Developed and deployed blockchain-based payment system, 3D web applications, and virtual interfaces, enhancing user engagement and transaction efficiency.",
		},
		{
			name: "Varushi Apparels",
			era: "March 2021 - April 2022",
			title: "Full Stack Developer",
			location: "Surat, Gujarat, India",
			description:
				"Engineered a comprehensive stock management platform, improving inventory tracking and operational throughput.",
		},
		{
			name: "Freelancer",
			era: "February 2019 - January 2021",
			title: "Web & Graphics Developer",
			location: "Global",
			description:
				"Delivered customized websites and branding solutions, enhancing client digital presence and audience reach.",
		},
	],
	CERTIFICATES: [
		{
			name: "JavaScript Certificate",
			issuer: "Udemy",
			year: 2022,
			href: "https://www.udemy.com/certificate/UC-XXXXX", // Replace with actual URL
		},
		{
			name: "Python Certificate",
			issuer: "Coursera",
			year: 2021,
			href: "https://www.coursera.org/certificate/UC-XXXXX", // Replace with actual URL
		},
	],
};
