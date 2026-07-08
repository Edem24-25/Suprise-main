"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface EnvelopeProps {
    onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => {
                onOpen();
            }, 1000); // Wait for animation
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen cursor-pointer" onClick={handleOpen}>
            <div className="relative w-72 h-48 md:w-96 md:h-64 bg-valentine-pink rounded-b-lg shadow-2xl flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
                {/* Envelope Flap */}
                <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-valentine-red origin-top z-20 rounded-t-lg"
                    style={{ filter: "brightness(0.9)" }}
                />

                {/* Envelope Body (Back) used for layering illusion */}
                <div className="absolute inset-0 bg-valentine-pink rounded-b-lg z-0" />

                {/* Letter */}
                <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: isOpen ? -100 : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute w-11/12 h-5/6 bg-white shadow-md z-10 p-4 flex flex-col items-center justify-center text-center -top-2"
                >
                    <p className="font-fira text-valentine-red text-lg md:text-xl font-bold">Pour toi...</p>
                    <p className="text-2xl mt-2">💌</p>
                </motion.div>

                {/* Envelope Front (Pocket) */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-valentine-pink border-t-2 border-valentine-white z-30 [clip-path:polygon(0%_0%,_50%_50%,_100%_0%,_100%_100%,_0%_100%)] rounded-b-lg opacity-90 shadow-inner" style={{ background: 'conic-gradient(from 135deg at top, #C9184A 90deg, #F8C8DC 0)' }} />

                {/* Text Hint */}
                {!isOpen && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                        className="absolute -bottom-16 text-valentine-red font-fira text-xl font-bold tracking-widest uppercase z-40"
                    >
                        Touche pour ouvrir
                    </motion.p>
                )}
            </div>
        </div>
    );
}
