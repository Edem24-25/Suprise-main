"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagicCursor() {
    const [isVisible, setIsVisible] = useState(false);
    
    // Position de base de la souris
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Mouvement avec ressort (spring) pour le cercle extérieur (le "trailing")
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (!isMounted) return;
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible, isMounted]);

    if (!isMounted) return null;

    return (
        <>
            {/* Petit point central rouge (curseur principal) */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-valentine-red rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0
                }}
            />
            {/* Grand cercle de traîne (trailing) rose poudré */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-valentine-pink/80 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 0.8 : 0
                }}
            />
        </>
    );
}
