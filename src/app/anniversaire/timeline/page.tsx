"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarHeart } from "lucide-react";

const TIMELINE_EVENTS = [
    {
        id: 1,
        date: "Une rencontre",
        title: "Le Premier Sourire",
        description: "Le jour où nos regards se sont croisés et où l'histoire a commencé.",
    },
    {
        id: 2,
        date: "Des mois plus tard",
        title: "Notre Premier Rire Complice",
        description: "Ces moments simples qui ont transformé notre connexion en quelque chose d'unique.",
    },
    {
        id: 3,
        date: "Une amitié sincère",
        title: "Le Début d'une Belle Histoire",
        description: "Quand on a compris que notre lien était bien plus qu'une simple amitié passagère.",
    },
    {
        id: 4,
        date: "Aujourd'hui",
        title: "Ton Anniversaire",
        description: "Célébrer la personne magnifique que tu es, aujourd'hui et chaque autre jour.",
    }
];

export default function TimelinePage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-valentine-white text-valentine-red relative py-20 px-4 overflow-hidden">
            {/* Titre */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-24 relative z-10"
            >
                <h1 className="text-4xl md:text-6xl font-playfair font-bold text-valentine-red mb-4">
                    Notre Histoire
                </h1>
                <p className="text-xl italic text-valentine-red/70 font-medium">
                    Chaque chapitre avec toi est mon préféré.
                </p>
            </motion.div>

            {/* Timeline Ligne Centrale */}
            <div className="max-w-4xl mx-auto relative relative z-10">
                {/* Ligne verticale (cachée sur petit écran, visible au centre sur md) */}
                <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-valentine-pink/30 -translate-x-1/2 rounded-full" />

                <div className="space-y-16 md:space-y-32">
                    {TIMELINE_EVENTS.map((event, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className={`flex flex-col md:flex-row relative items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Puce Centrale */}
                                <div className="absolute left-[30px] md:left-1/2 w-6 h-6 bg-valentine-red rounded-full -translate-x-1/2 flex items-center justify-center shadow-lg border-4 border-valentine-white z-10">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                </div>

                                {/* Contenu (Moitié gauche ou droite selon isEven) */}
                                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-valentine-pink/20">
                                        <span className={`inline-block px-3 py-1 bg-valentine-pink/20 text-valentine-red font-bold text-xs uppercase tracking-widest rounded-full mb-3 flex items-center gap-2 w-max ${isEven ? 'md:ml-auto' : ''}`}>
                                            <CalendarHeart size={14} />
                                            {event.date}
                                        </span>
                                        <h3 className="text-2xl font-playfair font-bold mb-2 text-valentine-red">
                                            {event.title}
                                        </h3>
                                        <p className="text-valentine-red/80 leading-relaxed font-medium">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bouton pour la suite */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="mt-32 text-center"
            >
                <button
                    onClick={() => router.push('/anniversaire/lettre')}
                    className="group px-8 py-4 bg-valentine-red text-white font-bold rounded-full shadow-lg hover:bg-valentine-red/90 transition-all flex items-center gap-3 mx-auto"
                >
                    Continuer
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </motion.div>
            
        </main>
    );
}
