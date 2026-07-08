"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FloatingHearts from "@/components/ui/FloatingHearts";
import FleeingButton from "@/components/ui/FleeingButton";
import { Heart } from "lucide-react";

export default function QuestionPage() {
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Wrap in timeout or verify execution context to avoid synchronous set state warning if strictly enforced
        // However, for localstorage check, a common pattern is to just suppress if it causes no visual issues.
        // Better yet, lets just ensuring name is set only if different.
        const storedName = localStorage.getItem("valentineName");
        if (!storedName) {
            router.push("/");
        } else {
            setName(storedName);
        }
    }, [router]);

    const [text, setText] = useState("");
    const fullText = "accepterais-tu de rester ma précieuse amie ?";

    useEffect(() => {
        if (name) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < fullText.length) {
                    setText((prev) => prev + fullText.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
            return () => clearInterval(typingInterval);
        }
    }, [name]);

    if (!name) return null;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-valentine-pink via-valentine-white to-purple-200 overflow-hidden relative p-4">
            <FloatingHearts />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center space-y-12 max-w-2xl w-full"
            >
                <h1 className="text-4xl md:text-6xl font-fira font-bold text-valentine-red drop-shadow-white leading-tight min-h-[160px]">
                    <span className="block text-5xl md:text-7xl mb-4">{name},</span>
                    {text}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-1 h-8 bg-valentine-red ml-1 align-middle"
                    />
                </h1>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center h-40">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/celebration")}
                        className="px-10 py-4 rounded-full bg-valentine-red text-white font-bold text-2xl shadow-xl hover:bg-red-600 transition-all flex items-center gap-3 z-30"
                    >
                        <Heart fill="currentColor" />
                        OUI 💖
                    </motion.button>

                    <div className="relative w-40 h-20 flex items-center justify-center">
                        <FleeingButton />
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
