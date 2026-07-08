"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { useRouter } from "next/navigation";
import FloatingHearts from "@/components/ui/FloatingHearts";

export default function CelebrationPage() {
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedName = localStorage.getItem("valentineName");
        if (!storedName) {
            router.push("/");
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(storedName);

            // Trigger confetti
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
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
        }
    }, [router]);

    const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const x = e.clientX;
        const y = e.clientY;

        // Play interaction sound
        const sound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
        sound.volume = 0.2;
        sound.play().catch(() => { }); // Ignore autoplay blocks

        const heart = confetti.shapeFromPath({ path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' });

        confetti({
            particleCount: 30,
            spread: 100,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            shapes: [heart],
            colors: ['#FF0000', '#FF69B4', '#FFF0F3'],
            scalar: 2
        });
    };

    if (!name) return null;

    return (
        <main
            onClick={handleRipple}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-valentine-red via-valentine-pink to-valentine-white overflow-hidden relative text-white animate-heartbeat cursor-pointer pb-20"
        >
            <MusicPlayer />
            <FloatingHearts />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="z-10 text-center space-y-8 p-6 max-w-4xl"
            >
                <h1 className="text-3xl md:text-5xl font-fira font-bold drop-shadow-lg leading-tight">
                    Si je pouvais t&apos;offrir quelque chose pour cette Saint-Valentin, ce serait la capacité de te voir à travers mes yeux, afin que tu comprennes à quel point tu es spéciale et à quel point tu illumines mon monde 🌟🌹❤️🌹, <br />
                    <span className="text-valentine-gold">{name}</span> 💖
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-xl md:text-2xl font-semibold italic"
                    style={{ color: '#a855f7' }}
                >
                    J&apos;ai tellement de chance de t&apos;avoir.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push("/memory");
                    }}
                    className="mt-12 px-8 py-3 rounded-full bg-white text-valentine-red font-bold hover:bg-gray-100 transition-colors shadow-xl"
                >
                    Un dernier souvenir... 😍
                </motion.button>
            </motion.div>
        </main>
    );
}
