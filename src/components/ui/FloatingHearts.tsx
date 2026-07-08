"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
    const [elements, setElements] = useState<{ id: number; x: number; delay: number; scale: number; duration: number; type: string }[]>([]);

    useEffect(() => {
        const types = ["heart", "🌸", "🌹", "💐", "💖", "💕"];
        const newElements = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.5,
            duration: 10 + Math.random() * 10,
            type: types[Math.floor(Math.random() * types.length)],
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear",
                    }}
                    className="absolute text-valentine-pink/30 flex items-center justify-center font-emoji"
                    style={{ left: `${el.x}%`, scale: el.scale, fontSize: "2rem" }}
                >
                    {el.type === "heart" ? <Heart fill="currentColor" size={48} /> : el.type}
                </motion.div>
            ))}
        </div>
    );
}
