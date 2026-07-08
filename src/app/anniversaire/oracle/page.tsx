"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

const CARDS = [
    { 
        id: 1, 
        title: "Avenir Merveilleux", 
        text: "« Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance. »\n— Jérémie 29:11" 
    },
    { 
        id: 2, 
        title: "Bénédiction", 
        text: "« L'Éternel te bénisse, et qu'il te garde ! L'Éternel fasse luire sa face sur toi, et qu'il t'accorde sa grâce ! L'Éternel tourne sa face vers toi, et qu'il te donne la paix ! »\n— Nombres 6:24-26" 
    },
    { 
        id: 3, 
        title: "Vœux Exaucés", 
        text: "« Qu'il te donne ce que ton cœur désire, Et qu'il accomplisse tous tes desseins ! »\n— Psaumes 20:4" 
    }
];

export default function OraclePage() {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-[#1a0b12] text-valentine-white flex flex-col items-center justify-center p-4 py-12 lg:py-4 relative overflow-x-hidden overflow-y-auto">
            {/* Fond mystique */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-valentine-red/20 via-[#1a0b12] to-[#1a0b12] pointer-events-none fixed" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16 relative z-10"
            >
                <h1 className="text-4xl md:text-6xl font-playfair font-bold text-valentine-gold mb-4 drop-shadow-md flex items-center justify-center gap-4">
                    <Sparkles className="text-valentine-gold" />
                    L'Oracle Suprême
                    <Sparkles className="text-valentine-gold" />
                </h1>
                <p className="text-xl italic text-valentine-pink/80 font-medium">
                    Que te réserve cette nouvelle année ? Tire une carte...
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 z-10 perspective-[1000px]">
                {CARDS.map((card, index) => {
                    const isSelected = selectedCard === card.id;
                    const isOtherSelected = selectedCard !== null && !isSelected;

                    return (
                        <motion.div
                            key={card.id}
                            className={`relative w-52 h-80 cursor-pointer transition-all duration-500 transform-style-3d ${isOtherSelected ? 'opacity-30 blur-sm scale-90 pointer-events-none' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ 
                                opacity: isOtherSelected ? 0.3 : 1, 
                                y: 0,
                                scale: isSelected ? 1.1 : 1
                            }}
                            transition={{ delay: index * 0.2 }}
                            onClick={() => setSelectedCard(card.id)}
                            whileHover={!selectedCard ? { y: -10, scale: 1.05 } : {}}
                        >
                            <motion.div
                                className="w-full h-full relative transition-transform duration-700 shadow-2xl rounded-xl"
                                style={{ transformStyle: 'preserve-3d' }}
                                animate={{ rotateY: isSelected ? 180 : 0 }}
                            >
                                {/* Dos de la carte */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4a192c] to-[#2d0f1b] rounded-xl border-2 border-valentine-gold p-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                                    <div className="w-full h-full border border-valentine-gold/50 rounded-lg flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                                        <Sparkles className="text-valentine-gold/60 w-12 h-12" />
                                    </div>
                                </div>

                                {/* Face de la carte */}
                                <div className="absolute inset-0 bg-[#fdfbf7] rounded-xl border-[3px] border-valentine-gold p-4 flex flex-col items-center justify-between text-center overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.6)]" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,transparent_40%,rgba(212,175,55,0.1)_50%,transparent_60%)] animate-pulse pointer-events-none" />
                                    <h3 className="font-playfair text-lg font-bold text-valentine-red uppercase tracking-widest mt-1">{card.title}</h3>
                                    <div className="w-12 h-[1px] bg-valentine-gold my-1" />
                                    <div className="flex-grow flex items-center justify-center w-full px-1">
                                        <p className="font-fira text-[11px] md:text-xs text-[#4a192c] leading-normal md:leading-relaxed whitespace-pre-wrap text-center w-full max-h-full overflow-hidden">
                                            {card.text}
                                        </p>
                                    </div>
                                    <div className="w-12 h-[1px] bg-valentine-gold my-1" />
                                    <span className="text-valentine-gold mb-1">✨</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-16 z-10"
                    >
                        <button
                            onClick={() => router.push('/anniversaire/constellation')}
                            className="group px-8 py-4 bg-valentine-gold text-[#1a0b12] font-bold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all flex items-center gap-3"
                        >
                            Poursuivre ce voyage astral
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
