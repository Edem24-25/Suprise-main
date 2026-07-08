"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BirthdayCakeProps {
    onComplete: () => void;
}

export default function BirthdayCake({ onComplete }: BirthdayCakeProps) {
    const [candlesBlown, setCandlesBlown] = useState([false, false, false]);
    const [showWish, setShowWish] = useState(false);

    const allBlown = candlesBlown.every((c) => c);

    const handleBlowCandle = (index: number) => {
        if (!candlesBlown[index]) {
            const newBlown = [...candlesBlown];
            newBlown[index] = true;
            setCandlesBlown(newBlown);
        }
    };

    useEffect(() => {
        if (allBlown && !showWish) {
            setShowWish(true);
            
            // Pluie de confettis dorés et roses
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#D4AF37', '#FFD700', '#F8C8DC', '#C9184A']
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#D4AF37', '#FFD700', '#F8C8DC', '#C9184A']
                }));
            }, 250);

            setTimeout(() => {
                onComplete();
            }, 4000);
        }
    }, [allBlown, showWish, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center relative">
            
            <AnimatePresence>
                {!allBlown && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mb-12 text-center z-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-valentine-red mb-4 drop-shadow-sm">
                            Fais un vœu...
                        </h2>
                        <p className="text-lg md:text-xl font-fira text-valentine-red/80 italic">
                            Touche les bougies pour les souffler ✨
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showWish && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5, y: -50 }}
                        animate={{ opacity: 1, scale: 1, y: -20 }}
                        className="absolute top-[-100px] text-center z-20 w-max"
                    >
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-valentine-gold drop-shadow-md">
                            Vœu exaucé ! ✨
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Le Gâteau (CSS) */}
            <div className="relative mt-16 scale-125 md:scale-150">
                
                {/* Bougies */}
                <div className="absolute -top-12 left-0 w-full flex justify-center gap-6 z-20">
                    {candlesBlown.map((isBlown, i) => (
                        <div 
                            key={i} 
                            className="relative flex flex-col items-center cursor-pointer group"
                            onClick={() => handleBlowCandle(i)}
                        >
                            {/* Flamme */}
                            <AnimatePresence>
                                {!isBlown && (
                                    <motion.div 
                                        exit={{ opacity: 0, scale: 0, y: 10 }}
                                        className="w-3 h-5 bg-yellow-400 rounded-full blur-[1px] absolute -top-5 animate-pulse shadow-[0_0_15px_#fbbf24]"
                                        style={{ filter: "drop-shadow(0 0 5px #f59e0b)" }}
                                    >
                                        <div className="w-1.5 h-3 bg-white rounded-full mx-auto mt-1 blur-[1px]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {/* Fumée quand soufflée */}
                            {isBlown && (
                                <motion.div 
                                    initial={{ opacity: 1, y: -5, scale: 0.5 }}
                                    animate={{ opacity: 0, y: -20, scale: 2 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="w-2 h-2 bg-gray-300 rounded-full absolute -top-5 blur-[2px]"
                                />
                            )}
                            {/* Corps de la bougie */}
                            <div className="w-3 h-12 bg-gradient-to-b from-white to-pink-100 rounded-sm shadow-sm relative overflow-hidden border border-pink-200">
                                {/* Rayures */}
                                <div className="absolute top-0 right-0 w-[150%] h-2 bg-valentine-red/30 -rotate-45 translate-x-1" />
                                <div className="absolute top-4 right-0 w-[150%] h-2 bg-valentine-red/30 -rotate-45 translate-x-1" />
                                <div className="absolute top-8 right-0 w-[150%] h-2 bg-valentine-red/30 -rotate-45 translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Glaçage Supérieur */}
                <div className="relative z-10 w-48 h-12 bg-white rounded-[50%] shadow-[inset_0_-5px_10px_rgba(0,0,0,0.05),0_5px_10px_rgba(0,0,0,0.1)] border border-pink-50" />
                
                {/* Coulures */}
                <div className="absolute top-6 left-2 w-8 h-8 bg-white rounded-full z-10 shadow-[0_5px_5px_rgba(0,0,0,0.05)]" />
                <div className="absolute top-6 left-12 w-6 h-10 bg-white rounded-full z-10 shadow-[0_5px_5px_rgba(0,0,0,0.05)]" />
                <div className="absolute top-6 left-20 w-10 h-7 bg-white rounded-full z-10 shadow-[0_5px_5px_rgba(0,0,0,0.05)]" />
                <div className="absolute top-6 right-6 w-7 h-12 bg-white rounded-full z-10 shadow-[0_5px_5px_rgba(0,0,0,0.05)]" />

                {/* Étage du haut */}
                <div className="absolute top-6 left-0 w-48 h-16 bg-valentine-pink/80 rounded-bl-[10px] rounded-br-[10px] shadow-inner" style={{ backgroundImage: 'linear-gradient(to right, #F8C8DC, #ffb3c1, #F8C8DC)'}} />

                {/* Séparateur fruité (Fraises/Framboises) */}
                <div className="absolute top-20 left-0 w-48 flex justify-between px-2 z-10">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.4)]" />
                    <div className="w-4 h-4 bg-red-600 rounded-full shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.4)]" />
                    <div className="w-5 h-5 bg-red-500 rounded-full shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.4)] -mt-1" />
                    <div className="w-4 h-4 bg-red-600 rounded-full shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.4)]" />
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.4)]" />
                </div>

                {/* Base du gâteau */}
                <div className="absolute top-22 left-[-10px] w-[212px] h-12 bg-[#f4a261] rounded-[50%] shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)] z-0 hidden" /> {/* Hidden ellipse for depth if needed */}
                <div className="absolute top-22 left-[-8px] w-52 h-16 bg-[#ffd166] rounded-bl-[12px] rounded-br-[12px] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)]" style={{ backgroundImage: 'linear-gradient(to right, #f4a261, #e76f51, #f4a261)'}} />

                {/* Plat en dessous */}
                <div className="absolute top-[82px] left-[-20px] w-56 h-8 bg-gray-200 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-b-4 border-gray-300 -z-10" />

            </div>
        </div>
    );
}
