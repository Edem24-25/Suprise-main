"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MusicPlayer from "@/components/ui/MusicPlayer";
import FloatingHearts from "@/components/ui/FloatingHearts";
import PhotoCollage from "@/components/ui/PhotoCollage";

const quotes = [
    "Un véritable ami est celui qui entre quand le reste du monde sort.",
    "L'amitié, ce n'est pas d'être inséparables. C'est d'être séparés et que rien ne change.",
    "Celui qui a un véritable ami peut dire qu’il a deux âmes.",
    "L'amitié est le seul ciment qui puisse tenir le monde ensemble.",
    "Une amitié est une âme en deux corps.",
    "Le plus beau cadeau de la vie est l'amitié.",
    "Les amis sont la famille que nous choisissons.",
    "Il n'y a rien sur cette terre qui soit plus précieux que la véritable amitié.",
    "Un ami est quelqu'un qui sait tout de toi et qui t'aime quand même.",
    "L'amitié est une main tendue qui ne nous lâche jamais.",
    "Le grand privilège de l’amitié est de ne pas avoir à s’expliquer.",
    "Les amis sont les étoiles qui nous guident dans la nuit.",
    "Avoir un ami, c'est avoir un refuge.",
    "L'amitié multiplie les joies et divise les peines.",
    "Tu es la personne qui rend mes journées meilleures.",
    "Rien n'est plus précieux que le temps passé avec une amie comme toi.",
    "L'amitié est un trésor que l'on garde précieusement au cœur.",
    "Merci pour tous ces rires et tous ces moments partagés.",
    "Dans le livre de ma vie, notre amitié est mon chapitre préféré.",
    "Une bonne amie comme toi est rare et inestimable.",
    "Merci d'être cette lumière constante dans ma vie.",
    "Derrière chaque grand souvenir, il y a souvent une très bonne amie.",
    "Le bonheur, c'est d'avoir quelqu'un avec qui on peut tout partager."
];

function MemoryContent() {
    const [name, setName] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(0);
    const searchParams = useSearchParams();
    const theme = searchParams.get("theme");

    // Choix de la musique en fonction du thème
    const musicSrc = theme === "birthday" 
        ? "/Adara/KS%20Bloom%20-%20Joyeux%20Anniversaire.mp3" 
        : "/music/love-theme.mp3";

    useEffect(() => {
        const storedName = localStorage.getItem("valentineName");
        const timeout = setTimeout(() => {
            if (storedName) {
                setName(storedName);
            }
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Pour ma Valentine 💖',
                text: 'Une surprise spéciale pour toi...',
                url: window.location.origin
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.origin);
            alert("Lien copié dans le presse-papier !");
        }
    }

    const nameLength = name.length || 9;
    const heartScale = nameLength > 10 ? Math.min(1.6, 1 + (nameLength - 10) * 0.05) : 1;
    const fontSizeStyle = nameLength > 15
        ? { fontSize: `${Math.max(16, 36 - (nameLength - 15) * 1.2)}px`, lineHeight: '1.2' }
        : {};

    if (!isLoaded) return null;

    return (
        <main className="min-h-screen flex flex-col items-center justify-start bg-valentine-white relative overflow-hidden text-valentine-red p-4 pb-24 pt-32">
            <MusicPlayer src={musicSrc} />
            <FloatingHearts />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-8 w-full text-center px-4"
            >
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentQuote}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg md:text-xl font-fira italic text-purple-600 dark:text-purple-400 font-semibold max-w-2xl mx-auto"
                    >
                        &quot;{quotes[currentQuote]}&quot;
                    </motion.p>
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: heartScale }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="relative flex items-center justify-center py-6"
            >
                <Heart fill="#C9184A" className="text-valentine-red w-48 h-48 md:w-64 md:h-64 animate-pulse" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold font-fira p-8">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={fontSizeStyle}
                        className="text-2xl md:text-4xl drop-shadow-md text-center break-words max-w-full"
                    >
                        Samson <br /> 💞 <br /> {name || "Mon Amour"}
                    </motion.span>
                </div>
            </motion.div>

            <div className="w-full max-w-4xl z-20">
                <PhotoCollage />
            </div>

            <div className="flex gap-4 mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="px-6 py-2 rounded-full border-2 border-valentine-red text-valentine-red hover:bg-valentine-red hover:text-white transition-colors flex items-center gap-2"
                >
                    <Share2 size={20} />
                    Partager l&apos;amour
                </motion.button>
            </div>
        </main>
    );
}

export default function MemoryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-valentine-white" />}>
            <MemoryContent />
        </Suspense>
    );
}
