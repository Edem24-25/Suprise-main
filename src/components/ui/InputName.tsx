"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function InputName() {
    const [name, setName] = useState("");
    const [showSelection, setShowSelection] = useState(false);
    const router = useRouter();

    const handleSaveName = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            localStorage.setItem("valentineName", name.trim());
            setShowSelection(true);
        }
    };

    return (
        <div className="relative z-10 flex flex-col items-center gap-8">
            <AnimatePresence mode="wait">
                {!showSelection ? (
                    <motion.form
                        key="name-form"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onSubmit={handleSaveName}
                        className="flex flex-col items-center gap-6"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entre ton prénom..."
                            className="px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm border-2 border-valentine-pink text-valentine-red placeholder:text-valentine-pink/70 text-xl outline-none focus:border-valentine-red focus:ring-4 focus:ring-valentine-pink/20 transition-all w-80 text-center font-fira shadow-lg"
                            autoFocus
                        />
                        {name.trim() && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="group px-8 py-3 rounded-full bg-valentine-red text-white font-semibold text-lg hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2"
                            >
                                Préparer la surprise 🎂
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        )}
                    </motion.form>
                ) : (
                    <motion.div
                        key="selection-hub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-valentine-red text-center drop-shadow-white">
                            Bonjour <span className="text-valentine-gold">{name}</span> ! ✨ <br />
                            Prête à découvrir ta surprise d'anniversaire ?
                        </h2>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/anniversaire/login")}
                            className="group p-6 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-valentine-gold shadow-xl flex flex-col items-center gap-4 w-72 hover:border-valentine-gold transition-all"
                        >
                            <span className="text-6xl">🎂</span>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-valentine-gold uppercase tracking-wider">Surprise d'anniversaire</h3>
                                <p className="text-sm text-yellow-700/80 font-medium">Un voyage magique rien que pour toi.</p>
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
