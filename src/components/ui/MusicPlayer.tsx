"use client";

import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
    src?: string;
}

// Singleton global hors React pour garantir une seule instance physique
let globalSound: Howl | null = null;
let currentSrc: string | null = null;

export default function MusicPlayer({ src = "/music/love-theme.mp3" }: MusicPlayerProps = {}) {
    const [playing, setPlaying] = useState(globalSound?.playing() || false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        // Synchronisation immédiate avec l'état réel du singleton
        if (globalSound) {
            setPlaying(globalSound.playing());
            
            // Écouteurs pour les changements d'état du singleton global
            const updatePlay = () => setPlaying(true);
            const updatePause = () => setPlaying(false);
            
            globalSound.on('play', updatePlay);
            globalSound.on('pause', updatePause);
            globalSound.on('stop', updatePause);
            globalSound.on('end', updatePause);

            return () => {
                globalSound?.off('play', updatePlay);
                globalSound?.off('pause', updatePause);
                globalSound?.off('stop', updatePause);
                globalSound?.off('end', updatePause);
                setIsMounted(false);
            };
        }
        
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!src || !isMounted) return;

        // Si la source est déjà chargée et identique, on ne fait rien
        if (globalSound && currentSrc === src) {
            setPlaying(globalSound.playing());
            return;
        }

        // Sinon, on nettoie l'ancien et on crée le nouveau
        if (globalSound) {
            globalSound.stop();
            globalSound.unload();
        }

        // Création du singleton
        globalSound = new Howl({
            src: [src],
            html5: false, // JAMAIS de tags HTML5 pour éviter l'épuisement du pool
            preload: true,
            loop: true,
            volume: 0.5,
            autoplay: true, // Tentative d'autoplay
            onplay: () => setPlaying(true),
            onpause: () => setPlaying(false),
            onstop: () => setPlaying(false),
            onplayerror: function() {
                globalSound?.once('unlock', function() {
                    globalSound?.play();
                });
            }
        });

        // Forcer la lecture après le montage si l'autoplay a été bloqué
        if (globalSound.state() === 'loaded' && !globalSound.playing()) {
            globalSound.play();
        }

        currentSrc = src;

    }, [src, isMounted]);

    const togglePlay = () => {
        if (!globalSound) return;
        
        if (globalSound.playing()) {
            globalSound.pause();
            setPlaying(false);
        } else {
            globalSound.play();
            setPlaying(true);
        }
    };

    if (!isMounted) return null;

    return (
        <button
            onClick={togglePlay}
            id="music-toggle-btn"
            aria-label={playing ? "Désactiver la musique" : "Activer la musique"}
            className="fixed bottom-4 right-4 z-[9999] p-3 rounded-full bg-white/20 backdrop-blur-md text-valentine-red hover:bg-white/40 transition-all shadow-lg border border-white/30 group"
        >
            {playing ? (
                <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
            ) : (
                <VolumeX size={24} className="group-hover:scale-110 transition-transform" />
            )}
            {/* Petit indicateur visuel quand ça joue */}
            {playing && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-valentine-pink opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-valentine-red"></span>
                </span>
            )}
        </button>
    );
}

export const pauseGlobalMusic = () => {
    if (globalSound && globalSound.playing()) {
        globalSound.pause();
    }
};

export const resumeGlobalMusic = () => {
    if (globalSound && !globalSound.playing()) {
        globalSound.play();
    }
};
