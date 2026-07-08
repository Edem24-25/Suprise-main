"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QUALITIES = [
    {
        id: 1,
        title: "Ton sourire radieux",
        description: "Celui qui illumine mes journées et rend chaque instant précieux.",
        src: "/Adara/1776338190115.jpg", 
    },
    {
        id: 2,
        title: "Ton regard captivant",
        description: "Une étincelle unique qui reflète toute la beauté de ton âme.",
        src: "/Adara/1776338979566.jpg", 
    },
    {
        id: 3,
        title: "Ta douceur infinie",
        description: "Un réconfort constant, une tendresse absolue qui me touche au cœur.",
        src: "/Adara/5392c62f8f3f4e319b2be3645eeba11e.jpg", 
    },
    {
        id: 4,
        title: "Ton énergie solaire",
        description: "Débordante et communicative, tu inspires tout le monde autour de toi.",
        src: "/Adara/1776343343728.jpg", 
    },
    {
        id: 5,
        title: "Ton élégance naturelle",
        description: "Une grâce innée qui sublime chaque moment que nous passons ensemble.",
        src: "/Adara/1776343354831.jpg", 
    },
    {
        id: 6,
        title: "Ta joie de vivre",
        description: "Un souffle de bonheur pur qui rend le monde plus beau.",
        src: "/Adara/1776343358453.jpg", 
    },
    {
        id: 7,
        title: "Ta présence unique",
        description: "Comme un cadeau précieux que je chéris chaque jour un peu plus.",
        src: "/Adara/1776343363855.jpg", 
    },
    {
        id: 8,
        title: "Ton éclat",
        description: "Brillante et authentique, tu es ma source d'inspiration.",
        src: "/Adara/1776343384369.jpg", 
    },
    {
        id: 9,
        title: "À cette année",
        description: "Qu'elle soit aussi magnifique que toi, remplie de succès et d'amour.",
        src: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=800&auto=format&fit=crop", 
    }
];


function GalleryItem({ 
    quality, 
    index, 
    total, 
    scrollYProgress 
}: { 
    quality: typeof QUALITIES[0], 
    index: number, 
    total: number, 
    scrollYProgress: any 
}) {
    // On répartit les photos entre 5% et 95% du scroll pour laisser de l'espace en haut et en bas
    const step = 0.9 / (total > 1 ? total - 1 : 1);
    const ci = 0.05 + (index * step);
    
    // On définit des points de passage serrés basés sur l'espacement réel
    const fadeIn = Math.max(0, ci - step * 0.5);
    const pStart = Math.max(fadeIn + 0.001, ci - step * 0.15);
    const pEnd = Math.min(1, ci + step * 0.15);
    const fadeOut = Math.min(1, pEnd + step * 0.35);
    
    const offsets = [fadeIn, pStart, pEnd, fadeOut];

    const opacityMain = useTransform(
        scrollYProgress,
        offsets,
        [0, 1, 1, 0]
    );

    // Synchronisation du point mort pour désactiver les interactions
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        return opacityMain.on("change", (v) => setIsVisible(v > 0.1));
    }, [opacityMain]);

    const scaleMain = useTransform(
        scrollYProgress,
        [fadeIn, fadeOut],
        [0.95, 1.05]
    );

    const textY = useTransform(
        scrollYProgress,
        offsets,
        [40, 0, 0, -40]
    );

    const isEven = index % 2 === 0;

    return (
        <motion.div 
            className={`absolute inset-0 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center p-4 md:p-12 gap-8 md:gap-24 ${!isVisible ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ 
                opacity: opacityMain,
                visibility: isVisible ? "visible" : "hidden" // Optimisation performance
            }}
        >
            {/* Polaroid Photo */}
            <motion.div 
                style={{ scale: scaleMain }}
                className={`relative bg-white p-4 pb-16 md:pb-20 shadow-2xl rounded-sm w-full max-w-[280px] md:max-w-md ${isEven ? 'rotate-[-2deg]' : 'rotate-[2deg]'} z-10`}
            >
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={quality.src} 
                        alt={quality.title}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                    <p className="font-playfair text-xl md:text-3xl text-valentine-red/80 italic drop-shadow-sm">
                        {quality.title}
                    </p>
                </div>
            </motion.div>

            {/* Text Description */}
            <motion.div 
                style={{ y: textY }}
                className={`max-w-lg text-center ${isEven ? 'md:text-left' : 'md:text-right'} drop-shadow-md z-20 bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 rounded-2xl md:p-0`}
            >
                <h2 className="text-3xl md:text-6xl font-playfair font-bold text-valentine-red mb-4 md:mb-6">
                    {quality.title}
                </h2>
                <p className="text-lg md:text-2xl text-valentine-red/80 font-medium leading-relaxed">
                    {quality.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function BirthdayGallery() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    if (!isMounted) return <div className="min-h-screen w-full" />;

    return (
        <div ref={containerRef} className="relative h-[1000vh] w-full bg-valentine-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-b from-valentine-white via-valentine-pink/20 to-valentine-white pointer-events-none" />

                {QUALITIES.map((quality, index) => (
                    <GalleryItem 
                        key={quality.id} 
                        quality={quality} 
                        index={index} 
                        total={QUALITIES.length} 
                        scrollYProgress={scrollYProgress} 
                    />
                ))}
            </div>
        </div>
    );
}

