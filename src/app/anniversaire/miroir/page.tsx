"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import BirthdayGallery from "@/components/ui/BirthdayGallery";
import FloatingHearts from "@/components/ui/FloatingHearts";

export default function BirthdayPage() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (!isMounted) return;
        window.scrollTo(0, 0);

        // Trigger anniversaire confetti au chargement !
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, [isMounted]);

    if (!isMounted) {
        return <div className="min-h-screen bg-valentine-white flex items-center justify-center font-playfair text-valentine-red">Chargement...</div>;
    }

    return (
        <main className="min-h-screen bg-valentine-white relative text-valentine-red selection:bg-valentine-pink selection:text-white">
            {/* 
              Musique gérée globalement par AnniversaryLayout
            */}
            
            <FloatingHearts />

            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center relative px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="z-10"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-valentine-red mb-6 drop-shadow-sm leading-tight">
                        Quelques éclats <br />
                        <span className="italic text-valentine-pink text-4xl md:text-6xl">de ton année...</span>
                    </h1>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="absolute bottom-10 flex flex-col items-center animate-bounce"
                >
                    <span className="text-sm font-fira tracking-[0.3em] uppercase opacity-60 mb-2">Découvrir</span>
                    <div className="w-[1px] h-12 bg-valentine-red opacity-40"></div>
                </motion.div>
            </section>

            {/* Galerie Parallaxe */}
            <BirthdayGallery />

            {/* Footer Section */}
            <section className="min-h-[50vh] flex flex-col items-center justify-center bg-valentine-pink/10 px-4 text-center pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-valentine-red mb-6">
                        Joyeux Anniversaire ! 🎉
                    </h2>
                    <p className="text-xl md:text-2xl text-valentine-red/80 italic font-medium mb-12">
                        Que cette nouvelle page de ta vie soit encore plus belle que les précédentes.
                    </p>

                    <button
                        onClick={() => window.location.href = '/anniversaire/cadeau'}
                        className="group px-8 py-4 bg-valentine-red text-white font-bold rounded-full shadow-lg hover:bg-valentine-red/90 transition-all flex items-center gap-3"
                    >
                        Ouvrir ton cadeau
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                    </button>
                </motion.div>
            </section>
        </main>
    );
}
