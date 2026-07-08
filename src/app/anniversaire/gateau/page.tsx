"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BirthdayCake from "@/components/ui/BirthdayCake";

export default function CakePage() {
    const router = useRouter();

    const handleCakeComplete = () => {
        router.push("/anniversaire/miroir");
    };

    return (
        <main className="min-h-screen bg-valentine-white flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-valentine-pink/30 via-valentine-white to-valentine-white pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-lg mt-12"
            >
                <BirthdayCake onComplete={handleCakeComplete} />
            </motion.div>
        </main>
    );
}
