"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, Heart, Lock } from "lucide-react";

export default function BirthdayLogin() {
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const cleanAge = age.trim();
        
        if (cleanAge === "19" && birthDate) {
            setError("");
            setIsSuccess(true);
            // Sauvegarder la date d'anniversaire dans localStorage
            localStorage.setItem("birthdayDate", birthDate);
            // Redirection après l'animation de succès
            setTimeout(() => {
                router.push("/anniversaire/celebration");
            }, 2000);
        } else if (!birthDate) {
            setError("Veuillez entrer votre date d'anniversaire.");
        } else {
            setError("Ce n'est pas la bonne réponse...");
            // Retirer l'erreur visuelle après un moment
            setTimeout(() => setError(""), 2000);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-valentine-white relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white max-w-md w-full relative"
            >
                {/* Icône */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-valentine-pink p-4 rounded-full shadow-lg text-white">
                    {isSuccess ? <Heart size={32} className="animate-pulse" /> : <Lock size={32} />}
                </div>

                {!isSuccess ? (
                    <div className="text-center mt-6">
                        <h1 className="text-3xl font-playfair font-bold text-valentine-red mb-2">Accès Secret</h1>
                        <p className="text-valentine-red/70 italic mb-8">
                            Confirme tes informations pour débloquer la surprise...
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="block text-valentine-red font-semibold">
                                    Quel âge as-tu aujourd'hui ? 🎂
                                </label>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all focus:ring-4 bg-white/50 ${
                                            error && !age
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake" 
                                            : "border-valentine-pink focus:border-valentine-red focus:ring-valentine-pink/30"
                                        }`}
                                        placeholder="Ton âge..."
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="block text-valentine-red font-semibold">
                                    Quelle est ta date d'anniversaire ? 📅
                                </label>
                                <div className="space-y-1">
                                    <input
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all focus:ring-4 bg-white/50 ${
                                            error && !birthDate
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake" 
                                            : "border-valentine-pink focus:border-valentine-red focus:ring-valentine-pink/30"
                                        }`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {error}
                                </motion.p>
                            )}
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-valentine-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-valentine-red/90 transition-colors flex items-center justify-center gap-2 group"
                            >
                                Déverrouiller
                                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mt-6 py-8"
                    >
                        <h2 className="text-4xl font-playfair font-bold text-valentine-red mb-4">
                            Bienvenue. ✨
                        </h2>
                        <p className="text-valentine-red/80 italic text-lg animate-pulse">
                            Préparation de la magie...
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </main>
    );
}
