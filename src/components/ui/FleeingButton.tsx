"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FleeingButton() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [text, setText] = useState("Non 😈");

    const texts = [
        "Non 😈",
        "Essaye encore 😜",
        "Pas si vite…",
        "Ton cœur hésite ? ❤️",
        "Tu es sûr ? 😏",
        "Impossible ! 🚫",
        "Attrape-moi ! 🏃‍♂️",
    ];

    const moveButton = () => {
        const maxX = window.innerWidth * 0.4; // Limit movement to 40% of screen width
        const maxY = window.innerHeight * 0.4; // Limit movement to 40% of screen height

        const newX = (Math.random() - 0.5) * 2 * maxX;
        const newY = (Math.random() - 0.5) * 2 * maxY;

        setPosition({ x: newX, y: newY });

        // Change text randomly
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        setText(randomText);

        // Play explicit sound effect if possible, simplified here
        // const audio = new Audio('/sounds/woosh.mp3');
        // audio.play().catch(() => {});
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton} // For mobile
            onClick={moveButton} // Just in case they catch it
            className="px-8 py-3 rounded-full bg-gray-400 text-white font-semibold text-lg hover:bg-gray-500 transition-colors shadow-lg z-20 absolute"
            style={{ top: "auto", left: "auto", position: "relative" }} // Relative position initially, but moved by translate
        >
            {text}
        </motion.button>
    );
}
