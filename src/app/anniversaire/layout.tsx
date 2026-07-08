"use client";

import { usePathname } from "next/navigation";
import MusicPlayer from "@/components/ui/MusicPlayer";
import FairyDust from "@/components/ui/FairyDust";

export default function AnniversaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    
    // On ne veut pas de musique ni de poussière sur la page de login
    const isLoginPage = pathname === "/anniversaire/login";

    return (
        <>
            {!isLoginPage && (
                <MusicPlayer src="/Adara/KS%20Bloom%20-%20Joyeux%20Anniversaire.mp3" />
            )}
            {!isLoginPage && <FairyDust />}
            {children}
        </>
    );
}
