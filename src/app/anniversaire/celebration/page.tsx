"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { ArrowRight, Cake } from "lucide-react";

function CelebrationContent() {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Récupérer les données de localStorage
        const storedName = localStorage.getItem("valentineName");
        const storedBirthDate = localStorage.getItem("birthdayDate");

        if (storedName && storedBirthDate) {
            setName(storedName);
            setBirthDate(storedBirthDate);
            
            // Lancer les confettis
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
                setIsLoading(false);
            }, 1500);
        } else {
            router.push("/anniversaire/login");
        }
    }, [router]);

    const formatDate = (dateString: string) => {
        try {
            const [year, month, day] = dateString.split("-");
            const options: Intl.DateTimeFormatOptions = { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
            };
            const date = new Date(`${year}-${month}-${day}`);
            return date.toLocaleDateString("fr-FR", options);
        } catch {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-valentine-white flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-6xl"
                >
                    🎉
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-valentine-pink via-valentine-white to-purple-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Ballons animés en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "100vh", opacity: 0 }}
                        animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: 4 + i * 0.5,
                            delay: i * 0.3,
                            repeat: Infinity,
                        }}
                        className="absolute text-4xl"
                        style={{
                            left: `${20 + i * 15}%`,
                        }}
                    >
                        🎈
                    </motion.div>
                ))}
            </div>

            {/* Contenu principal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 text-center max-w-2xl"
            >
                {/* Gâteau animé */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-12 text-8xl"
                >
                    🎂
                </motion.div>

                {/* Titre principal */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-6xl md:text-7xl font-playfair font-bold text-valentine-red mb-2 drop-shadow-lg"
                >
                    Joyeux Anniversaire !
                </motion.h1>

                {/* Nom personnalisé */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-8"
                >
                    <p className="text-3xl md:text-4xl font-playfair font-bold text-valentine-gold drop-shadow-sm">
                        {name} ✨
                    </p>
                </motion.div>

                {/* Date d'anniversaire */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 mb-12 border-2 border-valentine-pink/30 shadow-lg inline-block"
                >
                    <div className="flex items-center gap-2 text-valentine-red justify-center mb-2">
                        <Cake size={24} />
                        <p className="font-semibold text-lg">Date de naissance</p>
                    </div>
                    <p className="text-xl font-playfair text-valentine-red/80 capitalize">
                        {formatDate(birthDate)}
                    </p>
                </motion.div>

                {/* Message personnalisé */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-12"
                >
                    <p className="text-2xl md:text-3xl text-valentine-red/80 font-medium leading-relaxed italic">
                        Une année de plus, une année remplie de <span className="text-valentine-gold font-bold">joie</span>, 
                        de <span className="text-valentine-gold font-bold">rires</span> et de <span className="text-valentine-gold font-bold">belles surprises</span> ! 🌟
                    </p>
                </motion.div>

                {/* Bouton pour retourner à l'accueil */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/")}
                    className="group px-10 py-4 bg-valentine-red text-white font-bold text-lg rounded-full shadow-xl hover:bg-valentine-red/90 transition-all flex items-center gap-3 mx-auto"
                >
                    Retour à l'accueil
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </motion.button>
            </motion.div>

            {/* Cœurs flottants */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        initial={{ 
                            x: Math.random() * 100 + "%",
                            y: "100vh",
                            opacity: 0,
                            rotate: 0
                        }}
                        animate={{
                            y: "-100vh",
                            opacity: [0, 1, 1, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            delay: i * 0.4,
                            repeat: Infinity,
                        }}
                        className="absolute text-3xl"
                    >
                        💖
                    </motion.div>
                ))}
            </div>
        </main>
    );
}

export default function CelebrationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-valentine-white" />}>
            <CelebrationContent />
        </Suspense>
    );
}
