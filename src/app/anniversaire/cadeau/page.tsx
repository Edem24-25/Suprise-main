"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function GiftPage() {
    const [clicks, setClicks] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleGiftClick = () => {
        if (isOpen) return;

        const newClicks = clicks + 1;
        setClicks(newClicks);

        if (newClicks >= 3) {
            setIsOpen(true);
            fireConfetti();
        }
    };

    const fireConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#DB7093', '#C71585']
            });
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FFA500', '#FF8C00']
            });
        }, 250);
    };

    return (
        <main className="min-h-screen bg-valentine-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="gift"
                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-playfair font-bold text-valentine-red mb-12 text-center">
                            Il te reste une dernière surprise...
                        </h1>
                        <p className="text-valentine-red/70 italic mb-8 animate-pulse text-lg">
                            {clicks === 0 ? "Clique sur le cadeau pour l'ouvrir !" : clicks === 1 ? "Encore un peu..." : "Presque !"}
                        </p>

                        <motion.button
                            onClick={handleGiftClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9, rotate: (clicks % 2 === 0 ? 5 : -5) }}
                            animate={clicks > 0 ? {
                                x: [0, -10, 10, -10, 10, 0],
                                transition: { duration: 0.4 }
                            } : {}}
                            className="relative drop-shadow-2xl"
                        >
                            {/* Représentation d'un cadeau en CSS (simple et mignon) */}
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-valentine-pink rounded-xl border-4 border-valentine-red relative overflow-hidden flex items-center justify-center shadow-inner">
                                {/* Ruban horizontal */}
                                <div className="absolute top-1/2 left-0 w-full h-8 bg-valentine-red -translate-y-1/2" />
                                {/* Ruban vertical */}
                                <div className="absolute top-0 left-1/2 w-8 h-full bg-valentine-red -translate-x-1/2" />
                                {/* Nœud */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 flex justify-between">
                                    <div className="w-8 h-full bg-valentine-red rounded-full border-2 border-valentine-pink/30 -rotate-12" />
                                    <div className="w-8 h-full bg-valentine-red rounded-full border-2 border-valentine-pink/30 rotate-12" />
                                </div>
                            </div>
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="opened"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        className="text-center z-10 bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-2xl border border-valentine-pink/30 max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-valentine-red mb-6 leading-tight">
                            Bon, je suis à toi...
                        </h2>
                        <div className="text-2xl md:text-4xl font-fira font-bold text-valentine-pink drop-shadow-sm mb-8 leading-relaxed">
                            Ton plus beau cadeau, c'est moi ! 🎁
                        </div>
                        <p className="text-xl md:text-2xl text-valentine-red/80 italic font-medium mb-12">
                            Alors fais-en bon usage 😉❤️<br />
                            Tu es irremplaçable.
                        </p>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            onClick={() => window.location.href = '/memory?theme=birthday'}
                            className="px-8 py-3 rounded-full bg-valentine-red text-white font-bold hover:bg-valentine-red/90 transition-colors shadow-lg"
                        >
                            Une dernière chose... 😍
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
