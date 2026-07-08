"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Disc3, Mic, Sparkles } from "lucide-react";
import { pauseGlobalMusic, resumeGlobalMusic } from "@/components/ui/MusicPlayer";

export default function RecordPlayerPage() {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasListened, setHasListened] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        if (isPlaying) return; // Empêcher le multi-clic
        
        setIsPlaying(true);
        pauseGlobalMusic(); // Couper la musique de fond
        
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // Si le fichier audio n'existe pas encore, on simule 5 secondes
                console.log("Fichier audio non trouvé, lecture simulée.");
                setTimeout(() => {
                    setIsPlaying(false);
                    setHasListened(true);
                    resumeGlobalMusic(); // Rallumer la musique
                }, 5000);
            });
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setHasListened(true);
        resumeGlobalMusic(); // Rallumer la musique
    };

    // Nettoyage au démontage
    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#2c181f] text-valentine-white flex flex-col items-center justify-center p-4 py-12 lg:py-4 relative overflow-x-hidden overflow-y-auto">
            
            {/* Spotlight sur le tourne-disque */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_rgba(255,192,203,0.15)_0%,_rgba(44,24,31,0)_70%)] pointer-events-none z-0 fixed" />

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 md:mb-16 relative z-10"
            >
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-valentine-gold mb-4 drop-shadow-md flex items-center justify-center gap-3">
                    <Mic className="text-valentine-gold" size={32} />
                    Le Tourne-Disque Secret
                </h1>
                <p className="text-xl italic text-valentine-pink/80 font-medium">
                    Une petite voix voudrait te dire quelque chose...
                </p>
            </motion.div>

            {/* Le Tourne-Disque */}
            <div className="relative z-10 w-72 h-72 md:w-96 md:h-96">
                
                {/* Boîtier */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5a2b] to-[#5c3a18] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#3e230e]">
                    
                    {/* Grille Haut-Parleur (pure déco) */}
                    <div className="absolute bottom-4 left-4 right-4 h-16 bg-[#1a0f07] rounded-md opacity-20" style={{ backgroundImage: 'radial-gradient(#3e230e 20%, transparent 20%)', backgroundSize: '10px 10px' }} />

                    {/* Centre (Platine) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-56 h-56 md:w-72 md:h-72 bg-[#111] rounded-full shadow-inner border border-[#333]">
                        
                        {/* Le Vinyle En Lui-Même */}
                        <motion.div 
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full rounded-full border-8 border-[#0a0a0a] flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                            style={{ background: 'repeating-radial-gradient(#222, #222 2px, #111 3px, #111 4px)' }}
                        >
                            {/* Étiquette centrale */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-valentine-red rounded-full flex flex-col items-center justify-center border-2 border-valentine-gold">
                                <span className="text-xs font-bold text-valentine-gold uppercase">Track 1</span>
                                <span className="text-[10px] text-white">Pour Adara</span>
                            </div>
                            
                            {/* Reflet sur le vinyle */}
                            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.1)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.1)_225deg,transparent_270deg)] pointer-events-none mix-blend-screen" />
                        </motion.div>

                    </div>

                    {/* Le Bras de Lecture */}
                    <motion.div 
                        initial={{ rotate: -20 }}
                        animate={{ rotate: isPlaying ? 15 : -20 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="absolute top-8 right-6 origin-top-right w-4 h-48 md:h-56 z-20"
                    >
                        {/* Base pivot du bras */}
                        <div className="absolute top-0 right-0 w-8 h-8 -mt-2 -mr-2 bg-gray-400 rounded-full border-2 border-gray-600 shadow-md" />
                        
                        {/* Tige métallique */}
                        <div className="absolute top-4 right-[10px] w-2 h-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-sm" />
                        
                        {/* Tête de lecture */}
                        <div className="absolute bottom-0 right-[4px] w-6 h-10 bg-[#333] rounded-sm transform rotate-45 border border-gray-500 shadow-lg">
                            <div className="absolute bottom-1 right-2 w-1 h-2 bg-silver rounded-full" />
                        </div>
                    </motion.div>

                </div>

            </div>

            {/* Poussière magique émanant du tourne-disque quand il joue */}
            {isPlaying && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center -mt-20 z-0">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`note-${i}`}
                            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                            animate={{ 
                                opacity: [0, 1, 0], 
                                y: -200 - Math.random() * 100, 
                                x: (Math.random() - 0.5) * 200,
                                scale: [0, 1.5, 0.5] 
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                            className="absolute"
                        >
                            <Sparkles className="text-valentine-gold opacity-60" size={20 + Math.random() * 20} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Contrôles */}
            <div className="mt-8 md:mt-16 z-20 flex flex-col items-center gap-4 md:gap-6 pb-16">
                <button
                    onClick={handlePlay}
                    className={`px-8 py-4 rounded-full font-bold shadow-xl transition-all flex items-center gap-3 border-2 ${isPlaying ? 'bg-transparent border-valentine-gold text-valentine-gold' : 'bg-valentine-gold border-valentine-gold text-[#2c181f] hover:bg-yellow-600 hover:border-yellow-600'}`}
                >
                    {isPlaying ? (
                        <>Écoute en cours... <Disc3 className="animate-spin" size={20} /></>
                    ) : (
                        <>Écouter le message <Play size={20} /></>
                    )}
                </button>

                <AnimatePresence>
                    {(hasListened || !isPlaying) && ( // Option de passer même si on n'écoute pas tout
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4"
                        >
                            <button
                                onClick={() => router.push('/anniversaire/gateau')}
                                className="group px-6 py-2 bg-transparent text-valentine-pink border border-valentine-pink/30 hover:bg-valentine-pink/10 font-medium rounded-full transition-all flex items-center gap-2 text-sm"
                            >
                                Passer à la Surprise Suivante
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Élément Audio invisible */}
            <audio 
                ref={audioRef} 
                src="/Adara/message_vocal.mp3" 
                onEnded={handleAudioEnd}
                preload="auto"
                style={{ display: 'none' }} 
            />
        </main>
    );
}
