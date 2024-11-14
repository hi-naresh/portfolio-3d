// import React, {useEffect, useState} from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import NavControls from "@components/Layout/NavControl";
// import {Github, Globe, Linkedin, Mail, Phone} from "lucide-react";
// import {CVData} from "../../data/cvData";
// import Link from "next/link";
// import {useIsMobile} from "@libs/hooks/useIsMobile";
//
// interface CVProps {
//     data: CVData;
// }
//
// const CV: React.FC<CVProps> = ({ data }) => {
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const { personalInfo, skills, education, experience, projects, volunteering, interests } = data;
//     const isMobile = useIsMobile();
//
//     useEffect(() => {
//         // Check system preference on mount
//         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//             setIsDarkMode(true);
//         }
//     }, []);
//
//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//         if (!isDarkMode) {
//             document.documentElement.classList.add('dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//         }
//     };
//
//     const downloadPDF = async () => {
//         const element = document.getElementById('cv-content');
//         if (!element) return;
//
//         const canvas = await html2canvas(element, {
//             scale: 2,
//             logging: false,
//             useCORS: true
//         });
//
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF({
//             format: 'a4',
//             unit: 'px'
//         });
//
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('resume-naresh-jhawar.pdf');
//     };
//
//     return (
//         <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-white'}`}>
//             {/* Controls */}
//
//             <div id="cv-content" className={`max-w-5xl mx-auto p-8 font-sans ${
//                 isDarkMode
//                     ? 'dark:bg-gray-900 dark:text-white'
//                     : 'bg-white text-gray-900'
//             }`}>
//
//                 {/* Header Section */}
//                 <header className="mb-8">
//                     <NavControls
//                         toggleDarkMode={toggleDarkMode}
//                         downloadPDF={downloadPDF}
//                         isDarkMode={isDarkMode}
//                     />
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h1 className="text-4xl font-bold mb-2">
//                                 <span className="font-light">{personalInfo.firstName} </span>
//                                 <span className="font-bold">{personalInfo.lastName}</span>
//                             </h1>
//                             <div className="flex md:text-lg absolute xs:text-sm">
//                                 <h2 className={"text-blue-500 font-bold dark:text-blue-400 mr-2"}>
//                                     {personalInfo.title}
//                                 </h2>
//                                 | <a href={`https://github.com/${personalInfo.github}`}
//                                      className="flex justify-center items-center mx-2 gap-1 hover:underline">
//                                 <Github size={16}/>{personalInfo.github}</a>
//                             </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-1 font-medium text-sm">
//                             <a href={`https://${personalInfo.website}`}
//                                className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
//                                 <span>{personalInfo.website}</span>
//                                 <Globe size={16}/>
//                             </a>
//                             <a href={`https://linkedin.com/in/${personalInfo.linkedin}`}
//                                className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
//                                 <span>{personalInfo.linkedin}</span>
//                                 <Linkedin size={16}/>
//                             </a>
//                             <a href={`mailto:${personalInfo.email}`}
//                                className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
//                                 <span>{personalInfo.email}</span>
//                                 <Mail size={16}/>
//                             </a>
//                             <a href={`tel:${personalInfo.phone}`}
//                                className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
//                                 <span>{personalInfo.phone}</span>
//                                 <Phone size={16}/>
//                             </a>
//                         </div>
//                     </div>
//                 </header>
//
//                 {/*//divider line*/}
//                 <hr className="my-4 border-gray-800 dark:border-gray-600"/>
//
//                 <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
//
//                     {/* Skills Section */}
//                     <section className="mb-8">
//                         <h2 className="text-2xl font-bold mb-4 dark:text-white">Skills</h2>
//                         <div className="grid text-justify gap-4">
//                             {skills.map((skill, index) => (
//                                 <p key={index} className="dark:text-gray-300">
//                                     <span className="font-bold">{skill.category} |</span> {skill.items.join(" • ")}
//                                 </p>
//                             ))}
//                         </div>
//                     </section>
//
//                     {/* Education Section */}
//                     <section className="mb-8 text-justify">
//                         <h2 className="text-2xl font-bold mb-4 dark:text-white">Education</h2>
//                         <div>
//                             <Link
//                                 target="_blank"
//                                 href={education.universityLink}
//                                 className="font-bold hover:text-blue-400 dark:hover:text-blue-400 dark:text-gray-200">{education.university} | {education.degree}</Link>
//                             <p className="text-blue-500 mt-2 font-bold dark:text-blue-400">CGPA: {education.cgpa} | {education.period}</p>
//                             <p className="mt-4 dark:text-gray-300">
//                                 <span className="font-bold">Coursework |</span> {education.coursework.join(" • ")}
//                             </p>
//                         </div>
//                     </section>
//                 </div>
//                 {/* Experience Section */}
//                 <section className="mb-8">
//                     <h2 className="text-2xl font-bold mb-4 dark:text-white">Experience</h2>
//                     <div className="space-y-6">
//                         {experience.map((exp, index) => (
//                             <div key={index}>
//                                 <h3 className="text-blue-500 font-bold dark:text-blue-400 hover:underline">
//                                     {exp.company} | {exp.technologies.join(", ")}
//                                 </h3>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">{exp.title} | {exp.period} | {exp.location}</p>
//                                 <ul className="list-disc ml-5 mt-2 dark:text-gray-300">
//                                     {exp.details.map((detail, idx) => (
//                                         <li key={idx}>{detail}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//
//                 <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
//                     {/* Projects Section */}
//                     <section className="mb-8">
//                         <h2 className="text-2xl font-bold mb-4 dark:text-white">Projects</h2>
//                         <div className="space-y-4">
//                             {projects.map((project, index) => (
//                                 <div key={index}>
//                                     <h3 className="text-blue-500 font-bold dark:text-blue-400 hover:underline">
//                                         {project.name} | {project.technologies.join(", ")}
//                                     </h3>
//                                     <ul className="list-disc ml-5 mt-2 dark:text-gray-300">
//                                         {project.details.map((detail, idx) => (
//                                             <li key={idx}>{detail}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//
//                     {/* Volunteering Section */}
//                     <div>
//                         <section className="mb-8">
//                             <h2 className="text-2xl font-bold mb-4 dark:text-white">Volunteering</h2>
//                             <div className="space-y-4">
//                                 {volunteering.map((vol, index) => (
//                                     <div key={index}>
//                                         <h3 className="text-blue-500 font-bold dark:text-blue-400 hover:underline">
//                                             {vol.organization} | {vol.role}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 dark:text-gray-400">{vol.period}</p>
//                                         <p className={"dark:text-gray-300"}>
//                                             {vol.details?.map((detail, idx) => (
//                                                 <span key={idx}>{detail}</span>
//                                             ))}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>
//
//                         <section className="mb-8">
//                             <h2 className="text-2xl font-bold mb-4 dark:text-white">Interests</h2>
//                             <ul className="list-disc flex flex-wrap gap-4 dark:text-gray-300">
//                                 {interests.map((interest, index) => (
//                                     <li key={index}>{interest}</li>
//                                 ))}
//                             </ul>
//                         </section>
//                     </div>
//                 </div>
//
//                 <hr className="my-4 border-gray-800 dark:border-gray-600"/>
//
//                 <div>
//                     <p className="text-center text-sm dark:text-gray-400 flex justify-center gap-2 mt-2">
//                         • Note: All references to projects, and resources are clickable 
//                         <span className={"text-blue-400 underline"}>**Links</span>.
//                     </p>
//                     <p className="text-center mt-2 text-sm dark:text-gray-400">
//                         &copy; 2023 - {new Date().getFullYear()} All rights reserved by Naresh Jhawar.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default CV;

// components/CV.tsx
import React, {useEffect, useState} from 'react';
import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";
import {CVData} from "../../data/cvData";
import {useIsMobile} from "@libs/hooks/useIsMobile";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import NavControls from "@components/Layout/NavControl";
import { motion } from 'framer-motion';

interface CVProps {
    data: CVData;
    isEditing: boolean;
    onSave: (newData: CVData, versionName?: string) => void;
}


const SaveBar = ({
                        handleSaveClick
                    }: { handleSaveClick: (type: 'save' | 'saveAs') => void
                 }) => {
    return (
        <motion.div
            className="fixed z-50 bottom-0 p-1 mb-12 w-full flex justify-center"
            initial={{scaleX: 0, scaleY: 0}}
            animate={{scaleX: 1, scaleY: 1}}
            exit={{scaleX: 0, scaleY: 0, opacity: 0}}
            transition={{delay: 0.2, duration: 1, ease: 'easeOut'}}
        >
            <div className="bottom-0 left-0 right-0 rounded-full bg-dark/20 backdrop-blur-sm border-[0.5px] border-gray-400 dark:bg-white/10 p-3 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="space-x-4">
                        <button
                            onClick={() => handleSaveClick('save')}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleSaveClick('saveAs')}
                            className="bg-green-500 text-white px-6 py-2 rounded-full"
                        >
                            Save As
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const CV: React.FC<CVProps> = ({data, isEditing, onSave}) => {
    const [editedData, setEditedData] = useState<CVData>(data);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [saveType, setSaveType] = useState<'save' | 'saveAs'>('save');
    const [newVersionName, setNewVersionName] = useState('');

    const {personalInfo, skills, education, experience, projects, volunteering, interests} = editedData;

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    const downloadPDF = async () => {
        const element = document.getElementById('cv-content');
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            format: 'a4',
            unit: 'px'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume-naresh-jhawar.pdf');
    };
    // const downloadAsPDF = async () => {
    //     // if (loading) return;
    //     const element = document.getElementById("resume");
    //     if (!element) return toast.error("Something went wrong");
    //
    //     // setLoading(true);
    //
    //     const controls = document.getElementById("controls");
    //
    //     controls?.style.setProperty("display", "none");
    //
    //     const style = document.createElement("style");
    //     document.head.appendChild(style);
    //     style.sheet?.insertRule(
    //         "body > div:last-child img { display: inline-block; }",
    //     );
    //
    //     const canvas = await html2canvas(element, {
    //         backgroundColor: "black",
    //     });
    //
    //     style.remove();
    //
    //     const img = canvas.toDataURL("image/png");
    //
    //     const width = 210;
    //     const height = 297;
    //
    //     const pdf = new jsPDF({
    //         orientation: "portrait",
    //         unit: "cm",
    //         format: [width, height],
    //     });
    //
    //     pdf.addImage(img, "PNG", 0, 0, width, height);
    //
    //     // setLoading(false);
    //
    //     pdf.save("NARESH_JHAWAR_resume.pdf");
    //
    //     controls?.style.setProperty("display", "flex");
    // };


    const handleSaveClick = (type: 'save' | 'saveAs') => {
        setSaveType(type);
        if (type === 'save') {
            onSave(editedData);
        } else {
            // Show version name input dialog
            const dialog = document.getElementById('versionDialog');
            if (dialog instanceof HTMLDialogElement) {
                dialog.showModal();
            }
        }
    };

    const handleSaveConfirm = () => {
        onSave(editedData, newVersionName);
        const dialog = document.getElementById('versionDialog');
        if (dialog instanceof HTMLDialogElement) {
            dialog.close();
        }
        setNewVersionName('');
    };

    // Editable field component to allow only one field at a time to be editable
    const EditableField = ({
                               value,
                               onChange,
                               multiline = false,
                               fieldKey,
                               className
                           }: {
        value: string,
        onChange: (value: string) => void,
        multiline?: boolean,
        fieldKey: string,
        className?: string
    }) => {
        const isFocused = focusedField === fieldKey;

        if (!isEditing || !isFocused) {
            return (
                <span
                    onClick={() => setFocusedField(fieldKey)}
                    className={`${className} mr-2`}
                >
                    {value}
                </span>
            );
        }

        return multiline ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => setFocusedField(null)}
                autoFocus
                className={`w-full p-1 border rounded focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 ${className}`}
                rows={3}
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => setFocusedField(null)}
                autoFocus
                className={`w-full p-1 border rounded focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 ${className}`}
            />
        );
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-white'}`}>
            {isEditing && (
                <SaveBar handleSaveClick={
                    handleSaveClick
                }/>
            )}

            <dialog id="versionDialog" className="p-6 rounded-lg glassmorphism backdrop-blur-md">
                <h3 className="text-lg text-gray-500 dark:text-white font-bold mb-4">Save as New Version</h3>
                <input
                    type="text"
                    value={newVersionName}
                    onChange={(e) => setNewVersionName(e.target.value)}
                    placeholder="Enter version name (e.g., 1.0 or Summer 2024)"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => {
                            const dialog = document.getElementById('versionDialog');
                            if (dialog instanceof HTMLDialogElement) dialog.close();
                        }}
                        className="px-4 text-gray-500 dark:text-white py-2 border rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </dialog>
            <div id="cv-content"
                 className={`max-w-5xl mx-auto p-8 font-sans ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-gray-900'}`}>

                {/* Header Section */}
                <header className="mb-8">
                    <NavControls
                        toggleDarkMode={toggleDarkMode}
                        downloadPDF={downloadPDF}
                        isDarkMode={isDarkMode}
                    />
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                <span className="font-light">{personalInfo.firstName} </span>
                                <span className="font-bold">{personalInfo.lastName}</span>
                            </h1>
                            <div className="flex md:text-lg absolute xs:text-sm">
                                <h2 className={"text-blue-500 font-bold dark:text-blue-400 mr-2"}>
                                    {personalInfo.title}
                                </h2>
                                | <a href={`https://github.com/${personalInfo.github}`}
                                     className="flex justify-center items-center mx-2 gap-1 hover:underline">
                                <Github size={16}/>{personalInfo.github}</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 font-medium text-sm">
                            <a href={`https://${personalInfo.website}`}
                               className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
                                <span>{personalInfo.website}</span>
                                <Globe size={16}/>
                            </a>
                            <a href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                               className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
                                <span>{personalInfo.linkedin}</span>
                                <Linkedin size={16}/>
                            </a>
                            <a href={`mailto:${personalInfo.email}`}
                               className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
                                <span>{personalInfo.email}</span>
                                <Mail size={16}/>
                            </a>
                            <a href={`tel:${personalInfo.phone}`}
                               className="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-2">
                                <span>{personalInfo.phone}</span>
                                <Phone size={16}/>
                            </a>
                        </div>
                    </div>
                </header>

                <hr className="my-4 border-gray-800 dark:border-gray-600"/>

                <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Skills Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Skills</h2>
                        <div className="grid text-justify gap-4">
                            {skills.map((skill, index) => (
                                <p key={index} className="dark:text-gray-300">
                                    <EditableField
                                        value={skill.category}
                                        onChange={(value) => {
                                            const newSkills = [...skills];
                                            newSkills[index].category = value;
                                            setEditedData({...editedData, skills: newSkills});
                                        }}
                                        fieldKey={`skills.${index}.category`}
                                        className="font-bold"
                                    />
                                    |
                                    <EditableField
                                        value={skill.items.join(" • ")}
                                        onChange={(value) => {
                                            const newSkills = [...skills];
                                            newSkills[index].items = value.split(" • ").map(item => item.trim());
                                            setEditedData({...editedData, skills: newSkills});
                                        }}
                                        fieldKey={`skills.${index}.items`}
                                        className="ml-2"
                                    />
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Education</h2>
                        <EditableField
                            value={education.university}
                            onChange={(value) => setEditedData({
                                ...editedData,
                                education: {...education, university: value}
                            })}
                            fieldKey="education.university"
                            className="font-bold dark:text-gray-200"
                        />
                        |
                        <EditableField
                            value={education.degree}
                            onChange={(value) => setEditedData({
                                ...editedData,
                                education: {...education, degree: value}
                            })}
                            fieldKey="education.degree"
                            className="font-bold ml-2"
                        />
                        <p className="text-blue-500 mt-2 font-bold dark:text-blue-400">
                            CGPA: <EditableField
                            value={education.cgpa}
                            onChange={(value) => setEditedData({...editedData, education: {...education, cgpa: value}})}
                            fieldKey="education.cgpa"
                        />
                            | <EditableField
                            value={education.period}
                            onChange={(value) => setEditedData({
                                ...editedData,
                                education: {...education, period: value}
                            })}
                            fieldKey="education.period"
                        />
                        </p>
                        <p className="mt-4 dark:text-gray-300">
                            <EditableField
                                value={education.coursework.join(" • ")}
                                onChange={(value) => setEditedData({
                                    ...editedData,
                                    education: {...education, coursework: value.split(" • ").map(item => item.trim())}
                                })}
                                fieldKey="education.coursework"
                            />
                        </p>
                    </section>
                </div>
                {/* Experience Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index}>
                            <EditableField
                                value={exp.company}
                                onChange={(value) => {
                                    const newExperience = [...experience];
                                    newExperience[index].company = value;
                                    setEditedData({...editedData, experience: newExperience});
                                }}
                                fieldKey={`experience.${index}.company`}
                                className="text-blue-500 font-bold dark:text-blue-400"
                            />
                            |
                            <EditableField
                                className={"ml-2"}
                                value={exp.technologies.join(", ")}
                                onChange={(value) => {
                                    const newExperience = [...experience];
                                    newExperience[index].technologies = value.split(", ").map(item => item.trim());
                                    setEditedData({...editedData, experience: newExperience});
                                }}
                                fieldKey={`experience.${index}.technologies`}
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <EditableField
                                    value={exp.title}
                                    onChange={(value) => {
                                        const newExperience = [...experience];
                                        newExperience[index].title = value;
                                        setEditedData({...editedData, experience: newExperience});
                                    }}
                                    fieldKey={`experience.${index}.title`}
                                />
                                |
                                <EditableField
                                    className={"ml-2"}
                                    value={exp.period}
                                    onChange={(value) => {
                                        const newExperience = [...experience];
                                        newExperience[index].period = value;
                                        setEditedData({...editedData, experience: newExperience});
                                    }}
                                    fieldKey={`experience.${index}.period`}
                                />
                            </p>
                            <ul className="list-disc ml-5 mt-2 mb-4 dark:text-gray-400">
                                {exp.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>
                                        <EditableField
                                            value={detail}
                                            onChange={(value) => {
                                                const newExperience = [...experience];
                                                newExperience[index].details[detailIndex] = value;
                                                setEditedData({...editedData, experience: newExperience});
                                            }}
                                            fieldKey={`experience.${index}.details.${detailIndex}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Projects Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Projects</h2>
                        {projects.map((project, index) => (
                            <div key={index}>
                                <EditableField
                                    value={project.name}
                                    onChange={(value) => {
                                        const newProjects = [...projects];
                                        newProjects[index].name = value;
                                        setEditedData({...editedData, projects: newProjects});
                                    }}
                                    fieldKey={`projects.${index}.name`}
                                    className="text-blue-500 font-bold dark:text-blue-400"
                                />
                                |
                                <EditableField
                                    className={"ml-2"}
                                    value={project.technologies.join(", ")}
                                    onChange={(value) => {
                                        const newProjects = [...projects];
                                        newProjects[index].technologies = value.split(", ").map(item => item.trim());
                                        setEditedData({...editedData, projects: newProjects});
                                    }}
                                    fieldKey={`projects.${index}.technologies`}
                                />
                                <ul className="list-disc ml-5 mt-2 dark:text-gray-300">
                                    {project.details.map((detail, detailIndex) => (
                                        <li key={detailIndex}>
                                            <EditableField
                                                value={detail}
                                                onChange={(value) => {
                                                    const newProjects = [...projects];
                                                    newProjects[index].details[detailIndex] = value;
                                                    setEditedData({...editedData, projects: newProjects});
                                                }}
                                                fieldKey={`projects.${index}.details.${detailIndex}`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    {/* Volunteering Section */}
                    <div>
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Volunteering</h2>
                            {volunteering.map((vol, index) => (
                                <div key={index}>
                                    <EditableField
                                        value={vol.organization}
                                        onChange={(value) => {
                                            const newVolunteering = [...volunteering];
                                            newVolunteering[index].organization = value;
                                            setEditedData({...editedData, volunteering: newVolunteering});
                                        }}
                                        fieldKey={`volunteering.${index}.organization`}
                                        className="text-blue-500 font-bold dark:text-blue-400"
                                    />
                                    |
                                    <EditableField
                                        className={"ml-2"}
                                        value={vol.role}
                                        onChange={(value) => {
                                            const newVolunteering = [...volunteering];
                                            newVolunteering[index].role = value;
                                            setEditedData({...editedData, volunteering: newVolunteering});
                                        }}
                                        fieldKey={`volunteering.${index}.role`}
                                    />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <EditableField
                                            value={vol.period}
                                            onChange={(value) => {
                                                const newVolunteering = [...volunteering];
                                                newVolunteering[index].period = value;
                                                setEditedData({...editedData, volunteering: newVolunteering});
                                            }}
                                            fieldKey={`volunteering.${index}.period`}
                                        />
                                    </p>
                                    <p className="mb-2 mt-2 dark:text-gray-300">
                                        {vol.details?.map((detail, detailIndex) => (
                                            <EditableField
                                                key={detailIndex}
                                                value={detail}
                                                onChange={(value) => {
                                                    const newVolunteering = [...volunteering];
                                                    newVolunteering[index].details![detailIndex] = value;
                                                    setEditedData({...editedData, volunteering: newVolunteering});
                                                }}
                                                fieldKey={`volunteering.${index}.details.${detailIndex}`}
                                            />
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </section>
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Interests</h2>
                            <ul className="list-disc flex flex-wrap gap-4 dark:text-gray-300">
                                {interests.map((interest, index) => (
                                    <li key={index}>
                                        <EditableField
                                            value={interest}
                                            onChange={(value) => {
                                                const newInterests = [...interests];
                                                newInterests[index] = value;
                                                setEditedData({...editedData, interests: newInterests});
                                            }}
                                            fieldKey={`interests.${index}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                </div>
                
                <hr className="my-4 border-gray-800 dark:border-gray-600"/>
                <div>
                    <p className="text-center text-sm dark:text-gray-400 flex justify-center gap-2 mt-2">
                        • Note: All references to projects, and resources are clickable
                        <span className={"text-blue-400 underline"}>**Links</span>.
                    </p>
                    <p className="text-center mt-2 text-sm dark:text-gray-400">
                        &copy; 2023 - {new Date().getFullYear()} All rights reserved by Naresh Jhawar.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CV;