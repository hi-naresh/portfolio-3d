// types.ts
export interface Skill {
    category: string;
    items: string[];
}

export interface Education {
    universityLink: string ;
    university: string;
    degree: string;
    cgpa: string;
    period: string;
    coursework: string[];
}

export interface Experience {
    company: string;
    title: string;
    period: string;
    location: string;
    technologies: string[];
    details: string[];
}

export interface Project {
    name: string;
    technologies: string[];
    details: string[];
    link?: string;
}

export interface Volunteering {
    organization: string;
    role: string;
    period: string;
    details?: string[];
}

export interface CVData {
    personalInfo: {
        firstName: string;
        lastName: string;
        title: string;
        github: string;
        website: string;
        linkedin: string;
        email: string;
        phone: string;
    };
    skills: Skill[];
    education: Education;
    experience: Experience[];
    projects: Project[];
    volunteering: Volunteering[];
    interests: string[];
}

export const cvData: CVData = {
    personalInfo: {
        firstName: "Naresh",
        lastName: "Jhawar",
        title: "Software Developer",
        github: "hi-naresh",
        website: "www.nareshjhawar.in",
        linkedin: "naresh-jhawar",
        email: "hello.nareshjhawar@gmail.com",
        phone: "+91 9828649826"
    },
    skills: [
        {
            category: "Languages",
            items: ["Java", "GO","Python"]
        },
        // {
        //     category: "Frontend",
        //     items: ["Flutter", "React", "TypeScript", "Redux", "Figma", "Blender"]
        // },
        // {
        //     category: "Backend",
        //     items: ["NodeJS", "MongoDB", "Firebase", "REST APIs", "Flask", "Django", "Web3.JS"]
        // },
        {
            category:"Full-Stack",
            items:["Flutter", "React", "TypeScript", "Redux", "Figma", "Blender","NodeJS", "MongoDB", "Firebase", "REST APIs", "Flask", "Django", "Web3.JS"]
        },
        {
            category: "Frameworks & Tools",
            items: ["Jira", "Next.JS","Jenkins", "AWS", "Git/Github", "Docker", "Kubernetes"]
        },
    ],
    education: {
        university: "Auro University",
        universityLink: "https://www.aurouniversity.edu.in/",
        degree: "B.Sc. in Information Technology",
        cgpa: "9.33/10",
        period: "August 2021 - July 2024",
        coursework: [
            "Data Structure & Algorithms",
            "Computer Networks",
            "Operating Systems",
            "C/C++",
            "Java",
            "Python",
            "Mobile Application Development",
            "Blockchain",
            "Cyber Security",
            "Software Development LifeCycle"
        ]
    },
    experience: [
        {
            company: "Auro University & SAILC",
            title: "Software Developer",
            period: "May 2022 - Present",
            location: "Surat, Gujarat, India",
            technologies: ["Flutter", "React", "Three.js", "NodeJS", "Firebase", "Jira", "OpenAI", "APIs"],
            details: [
                "Led the development and deployment of 'Aurocoins', a blockchain-based payment system, resulting in a 22% increase in campus store transactions within the first 6 months.",
                "Implemented a secure and user-friendly interface, integrating a unique digital currency system for seamless campus transactions with blockchain network support, resulting in a 28% revenue growth of stores.",
                "Launched the development of 'Auroverse', a 3D web application for the Tech-Fest, which facilitated over 1,000 student registrations and managed 4+ event listings, boosting event participation by 35%.",
                "Designed a web app for SAILC to showcase their work, values, and teachings, enhancing community engagement with a monthly audience of 500+ visitors, improving interaction by 40%.",
                "Engineered a virtual interface for an escape room game, handling real-time updates like scores, tasks, and time-remaining, enhancing the user experience with over 1,500+ updates processed per level."
            ]
        },
        {
            company: "Varushi Apparels",
            title: "Full Stack Developer",
            period: "March 2021 - April 2022",
            location: "Surat, Gujarat, India",
            technologies: ["Flask", "JavaScript", "NodeJS", "MongoDB", "Shopify"],
            details: [
                "Engineered a comprehensive stock management platform for textile firms, enhancing inventory tracking and efficiency.",
                "Automated stock handling processes, resulting in a 16% increase in operational throughput.",
                "Streamlined online showcasing of clothing designs, leading to a 20% boost in customer engagement and an 18% increase in business."
            ]
        },
        {
            company: "Freelancer",
            title: "Web & Graphics Developer",
            period: "February 2019 - January 2021",
            location: "",
            technologies: ["Webflow", "Wordpress", "JavaScript", "Shopify", "Bootstrap", "Illustrator"],
            details: [
                "Delivered over 10+ customized websites and branding solutions that expanded client digital presence and audience reach."
            ]
        }
    ],
    projects: [
        {
            name: "Auroverse",
            technologies: ["React", "Three.js", "R3F", "Node.js", "MongoDB", "Blender", "Figma"],
            details: [
                "Launched an immersive 3D experience with unique UI/UX interfaces, using React, R3F & Three.js for 3D integration, MongoDB for user registration & authentication."
            ]
        },
        {
            name: "AuroPay",
            technologies: ["Flutter", "Firebase", "localAuth", "Solidity", "JavaScript", "Web3.js", "NodeJS", "REST APIs", "Hardhat", "Jira"],
            details: [
                "Executed the construction of 'AuroPay', a Flutter-based application leveraging the Ethereum blockchain, leading to a 28% increase in revenue."
            ]
        },
        {
            name: "AuroBees",
            technologies: ["React", "Firebase", "MVC pattern", "Figma", "Material UI"],
            details: [
                "Integrated Firebase for real-time user interactions and secure messaging, resulting in a 50% uptick in active monthly users.",
                "Developed and fine-tuned a matching algorithm, enhancing user engagement and successful matches."
            ]
        }
    ],
    volunteering: [
        {
            organization: "National Service Scheme",
            role: "President",
            period: "July 2022 - 2024",
            details: [
                "Overseeing the NSS unit, organizing community service campaigns, clean-ups, and donation drives, enhancing local collaborations."
            ]
        },
        {
            organization: "AIESEC Global Organisation",
            role: "Member",
            period: "February 2022 - January 2023",
            details: [
                "Engaged in global youth leadership and cultural exchange initiatives aligning with AIESEC's vision."
            ]
        }
    ],
    interests: [
        "Coffee Brewing",
        "Volunteering",
        "Fitness",
        "Table Tennis",
        "Personal Development"
    ]
};
