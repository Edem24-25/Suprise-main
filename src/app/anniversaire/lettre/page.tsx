"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";

const LETTER_TEXT = `À ma reine exceptionnelle unique en son genre,

Pour ton anniversaire, je voulais prendre le temps de t'écrire ces quelques mots pour te remercier d'être la personne exceptionnelle que tu es.

Depuis que tu fais partie de ma vie, chaque moment partagé est un vrai bonheur. Ton rire est communicatif et ta présence rend tout plus léger. Une amitié comme la nôtre est un cadeau que je chéris énormément.

Aujourd'hui, c'est ton jour. Je te souhaite une année remplie de joie, de réussites amplement méritées, et surtout de moments inoubliables.

Joyeux Anniversaire, ma précieuse amie. ✨❤️

À très vite...
`;

export default function LetterPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const router = useRouter();
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    // Effet pour le défilement automatique vers le bas pendant la frappe
    useEffect(() => {
        if (isOpen && !isTypingComplete) {
            scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [displayedText, isOpen, isTypingComplete]);

    useEffect(() => {
        if (!isOpen) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= LETTER_TEXT.length) {
                setDisplayedText(LETTER_TEXT.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTypingComplete(true);
            }
        }, 50); // Vitesse de frappe

        return () => clearInterval(typingInterval);
    }, [isOpen]);

    return (
        <main className="min-h-screen bg-valentine-pink/10 flex items-start justify-center p-4 relative overflow-y-auto pt-24 pb-24 h-screen">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -100 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer group flex flex-col items-center mt-32"
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="bg-white p-12 rounded-2xl shadow-xl border-2 border-valentine-pink/50 relative overflow-hidden group-hover:shadow-2xl group-hover:border-valentine-red transition-all">
                            <Mail size={80} className="text-valentine-red opacity-80 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-0 right-0 w-16 h-16 bg-valentine-pink/20 rounded-bl-full" />
                        </div>
                        <p className="mt-8 text-valentine-red font-playfair font-bold text-xl drop-shadow-sm animate-pulse">
                            Ouvrir la lettre pour ma Reine... ✨
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="bg-[#fcfaf5] w-full max-w-2xl p-8 md:p-14 rounded-sm shadow-2xl relative mb-12"
                        style={{
                            backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px)",
                            backgroundSize: "100% 2.5rem",
                            lineHeight: "2.5rem"
                        }}
                    >
                        {/* Timbre stylisé */}
                        <div className="absolute top-6 right-6 w-12 h-14 border border-gray-300 bg-white/50 flex items-center justify-center rotate-3">
                            <span className="text-xs text-valentine-red font-bold">♥</span>
                        </div>

                        <div className="font-fira text-gray-800 text-lg md:text-xl whitespace-pre-wrap mt-8">
                            {displayedText}
                            <motion.span 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-5 bg-valentine-red ml-1 align-middle"
                            />
                        </div>

                        {/* Ancre pour le scroll auto */}
                        <div ref={scrollAnchorRef} className="h-4" />

                        {isTypingComplete && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="mt-12 flex justify-end"
                            >
                                <button
                                    onClick={() => router.push('/anniversaire/oracle')}
                                    className="group px-6 py-3 bg-valentine-red text-white font-bold rounded-lg shadow-md hover:bg-valentine-red/90 transition-all flex items-center gap-2"
                                >
                                    Fermer la lettre
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
