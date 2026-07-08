"use client";

import FloatingHearts from "@/components/ui/FloatingHearts";
import InputName from "@/components/ui/InputName";
import Envelope from "@/components/ui/Envelope";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(true);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-valentine-pink via-valentine-white to-purple-200 overflow-hidden relative">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {showEnvelope ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="z-20"
          >
            <Envelope onOpen={() => setShowEnvelope(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-10 text-center space-y-8 p-4"
          >
            <h1 className="text-4xl md:text-6xl font-fira font-bold text-valentine-red drop-shadow-white mb-8">
              Joyeux anniversaire <br /> ma chère amie !
            </h1>
            <p className="text-xl md:text-2xl text-valentine-red/80 max-w-2xl mx-auto">
              Ouvre l'enveloppe, puis entre ton prénom pour découvrir une surprise d'anniversaire spéciale.
            </p>

            <InputName />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
