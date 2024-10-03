const projects = [
	{
		id: 1,
		image: '/images/projects/prodo.png',
		title: 'Prodo',
		description: 'Prodo is a productivity tool designed to streamline workflows and task management for individuals and teams. It features seamless integration with calendars, task tracking, and real-time collaboration.',
		tech: 'Flutter, Gemini API, Firebase',
		link: '#'
	},
	{
		id: 2,
		image: '/images/projects/jscrapper.webp',
		title: 'JScrapper',
		description: 'JScrapper is a high-performance web scraping tool that automates data extraction from websites. It supports multiple formats including JSON, CSV, and integrates with APIs for real-time data collection.',
		tech: 'Java, JavaFX JSoup, SpringBoot, Scene Builder',
		link: 'https://github.com/hi-naresh/jscrapper.git'
	},
	{
		id: 3,
		image: '/images/projects/auroverse.webp',
		title: 'AuroVerse 3D WebApp',
		description: 'AuroVerse is an immersive 3D web application that allows users to explore a virtual world. Built with WebGL and Three.js, it provides a rich interactive experience with dynamic environments and real-time user interactions.',
		tech: 'R3F, React, Three.js, GSAP, Framer, Firebase',
		link: 'https://auroverse.vercel.app/'
	},
	{
		id: 4,
		image: '/images/projects/auropay.webp',
		title: 'AuroPay',
		description: 'AuroPay is a secure payment gateway solution designed to handle transactions for e-commerce platforms and service-based applications. It supports multiple currencies and payment methods, ensuring smooth and secure transactions.',
		tech: 'Flutter, Node.js, RazorPay API, Web3, Infura, MetaMask',
		link: '#'
	},
	{
		id: 6,
		image: '/images/projects/aurobees.webp',
		title: 'AuroBees',
		description: 'AuroBees is a decentralized task management and micro-tasking platform powered by blockchain. It allows users to post tasks and reward task completers with cryptocurrency, making it an efficient decentralized gig economy app.',
		tech: 'Next Js, Tailwind, Firebase, GCP',
		link: 'https://aurobees.netlify.app/'
	},
	{
		id: 7,
		image: '/images/projects/escape.webp',
		title: 'EscapeRoom',
		description: 'EscapeRoom is a 3D multiplayer game where users must solve puzzles and navigate complex environments to escape virtual rooms. It features real-time multiplayer interactions and various themed rooms to challenge players.',
		tech: 'React JS, Apollo, Firebase',
		link: 'https://escaperoom.in/'
	},
	// {
	// 	id: 8,
	// 	image: '/images/projects/common.webp',
	// 	title: '3JS Agency Portfolio',
	// 	description: 'A dynamic 3D portfolio website for agencies using Three.js to display services, projects, and team members in an interactive and visually engaging way. It includes animations, 3D models, and responsive design for a modern web experience.',
	// 	tech: 'Three.js, Next.js, Tailwind CSS',
	// 	link: '#'
	// },
	{
		id: 9,
		image: '/images/projects/personal3d.webp',
		title: 'Personal 3D Portfolio',
		description: 'A visually stunning 3D personal portfolio showcasing projects, skills, and achievements. It features interactive elements, 3D models, and smooth transitions to give users a highly engaging experience.',
		tech: 'Next JS, R3F, Three.js, GSAP, Framer,Axios, Tailwind CSS',
		link: 'https://nareshjhawar.in/'
	},
	{
		id: 10,
		image: '/images/projects/varushi.webp',
		title: 'Varushi Apparel',
		description: 'Varushi Apparel is an e-commerce platform for a modern apparel brand. It provides a seamless shopping experience with product filters, integrated payment gateways, and a responsive design for mobile and desktop users.',
		tech: 'Shopify, Woo-Commerce, CSS, JavaScript',
		link: 'https://www.varushiapparel.com/'
	},
	{
		id: 12,
		image: '/images/projects/knowyourself.webp',
		title: 'Know Yourself Better',
		description: 'Know Yourself Better is an all-in-one self-mastery mobile app based on Sri Aurobindo\'s teachings, offering mental, physical, emotional, and spiritual well-being resources. It covers all aspects of life and well-being.',
		tech: 'Flutter, Firebase, Gemini API, GCP',
		link: '#'
	},
	{
		id: 13,
		image: '/images/projects/kriraAI.webp',
		title: 'KriraAI Agency',
		description: 'KriraAI Agency is a smart sports analytics platform powered by AI. It provides insights into player performance, game strategies, and predictive analysis for professional sports teams and coaches.',
		tech: 'Next JS, Tailwind, Firebase, Framer, Lottie',
		link: 'https://kriraai.com/'
	},
	{
		id: 14,
		image: '/images/projects/sailcWS.webp',
		title: 'SAILC Support Web App',
		description: 'SAILC WS Web App is a collaboration and document-sharing tool designed for teams working in a secure environment. It supports file encryption, version control, and real-time collaboration for documents and spreadsheets.',
		tech: 'React, Node.js, Firebase',
		link: 'https://knowyourselfbetter.netlify.app/'
	},
	{
		id: 15,
		image: '/images/projects/AI.webp',
		title: 'Chapter Creator AI Tool',
		description: 'Chapter Creator is an AI-powered content creation tool that helps writers, educators, and students create structured chapters for books and academic content. It automates chapter summaries, outlines, and references.',
		tech: 'Python , Flask, Gemini API',
		link: 'https://github.com/hi-naresh/mood-shift'
	},
	{
		id: 16,
		image: '/images/projects/AI.webp',
		title: 'Value Analysis AI Tool',
		description: 'Value Analysis AI Tool is a data-driven application that helps businesses analyze the value proposition of their products or services. It uses AI to process market trends, customer feedback, and financial data to provide insights.',
		tech: 'Python , Flask, Gemini API, Pandas, Scikit-learn',
		link: 'https://github.com/hi-naresh/value-analysis.git'
	},
	{
		id: 17,
		image: '/images/projects/AI.webp',
		title: 'Mood Shift Tool',
		description: 'Mood Shift is a mental health tool that tracks users\' emotional well-being and provides AI-generated suggestions to improve mood. It integrates with wearable devices to track physiological data and suggest personalized activities.',
		tech: 'Python , Flask, Gemini API, Scikit-learn, TensorFlow',
		link: 'https://github.com/hi-naresh/mood-shift'
	}
];

export const FloatingProjects = [
	{ id: 1, image: '/images/projects/work1.webp', title: 'Project 1' },
	{ id: 2, image: '/images/projects/work2.webp', title: 'Project 2' },
	{ id: 3, image: '/images/projects/work3.webp', title: 'Project 3' },
	{ id: 4, image: '/images/projects/work4.webp', title: 'Project 4' },
	{ id: 5, image: '/images/projects/work5.webp', title: 'Project 5' },
	{ id: 6, image: '/images/projects/work6.webp', title: 'Project 6' },
	{ id: 7, image: '/images/projects/work7.webp', title: 'Project 7' },
	{ id: 8, image: '/images/projects/work2.webp', title: 'Project 8' },
	{ id: 9, image: '/images/projects/work5.webp', title: 'Project 9' },
	{ id: 10, image: '/images/projects/work5.webp', title: 'Project 10' },
	{ id: 11, image: '/images/projects/work5.webp', title: 'Project 11' },
];

export default projects;
