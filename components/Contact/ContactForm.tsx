import React from "react";
import { motion } from "framer-motion";
import {CardContainer} from "@components/ui/3d-card";

const ContactForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <CardContainer className={"w-[28rem]"}>
            <motion.div
                className="relative w-full xs:m-4 xs:mt-20 md:m-0 md:mt-0 max-w-[28rem] p-6 glassmorphism-dark rounded-[30px] "
                initial={{scale: 0.8}}
                animate={{scale: 1}}
                exit={{scale: 0.8}}
                transition={{duration: 0.6}}
            >
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-white mb-4">
                    Get In Touch
                </h2>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm text-white font-medium "
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Max Doe"
                            className="rounded-xl placeholder-white/50 px-4 py-2 text-white bg-white/20 border-[1px] border-white/40 focus:outline-none focus:ring-[0.5px] focus:ring-white"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm text-white font-medium "
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="max.doe@example.com"
                            className="rounded-xl placeholder-white/50 px-4 py-2 text-white bg-white/20 border-[1px] border-white/40 focus:outline-none focus:ring-[0.5px] focus:ring-white"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="message"
                            className="text-sm text-white font-medium "
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Write your message..."
                            className="rounded-xl placeholder-white/50 px-4 py-2 text-white bg-white/20 border-[1px] border-white/40 focus:outline-none focus:ring=[0.5px] focus:ring-white"
                            rows={5}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-medium text-white rounded-3xl bg-accent/90 border-[1px] border-white/20 hover:bg-black transition duration-300"
                    >Send Message
                    </button>
                </form>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 m-[1.2rem] p-2 rounded-full glassBg hover:scale-105 transition duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </motion.div>
        </CardContainer>
    );
};

export default ContactForm;
