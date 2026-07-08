"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";

// Position des étoiles pour dessiner un vague coeur
const STARS = [
    { id: 1, top: "30%", left: "30%" },
    { id: 2, top: "20%", left: "50%" },
    { id: 3, top: "30%", left: "70%" },
    { id: 4, top: "55%", left: "65%" },
    { id: 5, top: "80%", left: "50%" },
    { id: 6, top: "55%", left: "35%" },
];

export default function ConstellationPage() {
    const router = useRouter();
    const [activeStars, setActiveStars] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const handleStarClick = (id: number) => {
        if (!activeStars.includes(id)) {
            setActiveStars([...activeStars, id]);
        }
    };

    useEffect(() => {
        if (activeStars.length === STARS.length) {
            setTimeout(() => {
                setIsComplete(true);
            }, 1000);
        }
    }, [activeStars]);

    return (
        <main className="min-h-screen bg-[#0a0f1d] text-valentine-white relative overflow-x-hidden overflow-y-auto flex flex-col py-12 px-4 items-center">
            
            {/* Ciel étoilé de fond (généré aléatoirement) */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none fixed">
               {[...Array(50)].map((_, i) => (
                   <div 
                       key={i} 
                       className="absolute bg-white rounded-full"
                       style={{
                           width: Math.random() * 3 + 'px',
                           height: Math.random() * 3 + 'px',
                           top: Math.random() * 100 + '%',
                           left: Math.random() * 100 + '%',
                           opacity: Math.random(),
                           animation: `twinkle ${Math.random() * 3 + 2}s infinite`
                       }}
                   />
               ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10 p-4"
            >
                <h1 className="text-3xl md:text-5xl font-playfair font-bold text-blue-100 mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    La Constellation d'Adara
                </h1>
                <p className="text-lg md:text-xl italic text-blue-200/80 font-medium">
                    Touche les maîtresses étoiles pour révéler la constellation.
                </p>
            </motion.div>

            {/* Zone interactive */}
            <div className="relative w-full max-w-lg aspect-square mt-8 z-10">
                
                {/* Lignes connectant les étoiles (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {activeStars.length > 1 && activeStars.map((starId, index) => {
                        if (index === 0) return null;
                        const prevStar = STARS.find(s => s.id === activeStars[index - 1]);
                        const currStar = STARS.find(s => s.id === starId);
                        
                        if (!prevStar || !currStar) return null;

                        return (
                            <motion.line 
                                key={`line-${prevStar.id}-${currStar.id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                x1={prevStar.left} 
                                y1={prevStar.top} 
                                x2={currStar.left} 
                                y2={currStar.top} 
                                stroke="#fcfaf5" 
                                strokeWidth="2" 
                                className="opacity-60"
                            />
                        )
                    })}
                    {/* Ligne finale pour fermer le motif si complet */}
                    {isComplete && (
                        <motion.line 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            x1={STARS[STARS.length - 1].left} 
                            y1={STARS[STARS.length - 1].top} 
                            x2={STARS[0].left} 
                            y2={STARS[0].top} 
                            stroke="#fcfaf5" 
                            strokeWidth="2" 
                            className="opacity-60"
                        />
                    )}
                </svg>

                {/* Les 6 maîtresses étoiles */}
                {STARS.map((star) => {
                    const isActive = activeStars.includes(star.id);
                    return (
                        <motion.button
                            key={star.id}
                            className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center rounded-full transition-all duration-300 ${isActive ? 'scale-125' : 'hover:scale-110 animate-pulse'}`}
                            style={{ top: star.top, left: star.left }}
                            onClick={() => handleStarClick(star.id)}
                            disabled={isActive}
                        >
                            <Star 
                                size={isActive ? 32 : 24} 
                                className={`transition-colors duration-500 ${isActive ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)] fill-white' : 'text-blue-200/50 fill-transparent'}`} 
                            />
                            {isActive && (
                                <span className="absolute inset-0 rounded-full animate-ping bg-white/30" />
                            )}
                        </motion.button>
                    )
                })}

                {/* Aurore Boréale Centrale (Révélation) */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="absolute w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[50px] animate-pulse" />
                            <div className="absolute w-48 h-48 bg-blue-500/20 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: '1s' }} />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-center z-20 mt-4 px-4 flex flex-col items-center"
                    >
                        <h2 className="text-2xl md:text-4xl font-playfair font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] leading-tight">
                            "Je vais pas changer, je promets<br/>d'être plus dingue qu'avant."
                        </h2>
                        
                        <button
                            onClick={() => router.push('/anniversaire/tourne-disque')}
                            className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3"
                        >
                            Écouter un secret...
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            
        </main>
    );
}
