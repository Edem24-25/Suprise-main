import type { Metadata } from "next";
import { Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joyeux anniversaire ! 🎉",
  description: "Une surprise d'anniversaire pour une amie spéciale.",
};

import PageTransition from "@/components/ui/PageTransition";
import FairyDust from "@/components/ui/FairyDust";
import MagicCursor from "@/components/ui/MagicCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${firaCode.variable} antialiased font-fira bg-valentine-white text-valentine-red cursor-heart`}
      >
        <MagicCursor />
        <FairyDust />
        <PageTransition>
          {children}
        </PageTransition>

      </body>
    </html>
  );
}
