"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Camera, Heart } from "lucide-react";

export default function PhotoCollage() {
    const [userPhoto, setUserPhoto] = useState<string | null>("/Adara/1776343384369.jpg");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Using the user's provided photo for Samson
    const samsonPhoto = "/samson.png";

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8 w-full">
            <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-[#ff4d6d]">
                {/* Decorative Pink Waves (mimicking image.png) */}
                <div className="absolute inset-0 bg-[#ff758f] rounded-[2rem]" style={{ clipPath: 'polygon(0 60%, 100% 40%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute inset-0 bg-[#ffb3c1] opacity-50 rounded-[2rem]" style={{ clipPath: 'polygon(0 80%, 100% 70%, 100% 100%, 0% 100%)' }}></div>

                {/* Friendship Title */}
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-6 w-full text-center text-white font-fira text-5xl md:text-6xl italic drop-shadow-lg z-20"
                >
                    Besties!
                </motion.h2>

                {/* Floating Hearts */}
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-5 left-10 text-white opacity-80"><Heart fill="white" size={24} /></motion.div>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute top-20 right-10 text-white opacity-80"><Heart fill="white" size={32} /></motion.div>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-10 left-5 text-white opacity-80"><Heart fill="white" size={40} /></motion.div>

                <div className="absolute inset-0 flex items-center justify-center pt-12">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Samson's Photo (Left Polaroid) */}
                        <motion.div
                            initial={{ rotate: -30, x: -120, scale: 0.8 }}
                            animate={{ rotate: -20, x: -88, scale: 0.95, opacity: 1 }}
                            whileHover={{ rotate: -10, scale: 1, zIndex: 40 }}
                            className="absolute bg-white p-2 pb-12 shadow-2xl w-44 h-64 z-10 border-[10px] border-white origin-bottom-right"
                        >
                            <div className="w-full h-full bg-gray-200 overflow-hidden shadow-inner border border-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={samsonPhoto}
                                    alt="Samson"
                                    className="w-full h-full object-cover object-[center_10%]"
                                />
                            </div>
                        </motion.div>

                        {/* User's Photo (Right Polaroid) */}
                        <motion.div
                            initial={{ rotate: 30, x: 120, scale: 0.8 }}
                            animate={{ rotate: 20, x: 88, scale: 0.95, opacity: 1 }}
                            whileHover={{ rotate: 10, scale: 1, zIndex: 40 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bg-white p-2 pb-12 shadow-2xl w-44 h-64 z-10 border-[10px] border-white cursor-pointer group origin-bottom-left"
                        >
                            <div className="w-full h-full bg-pink-50 flex items-center justify-center overflow-hidden relative shadow-inner border border-gray-100">
                                {userPhoto ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={userPhoto}
                                        alt="Adara"
                                        className="w-full h-full object-cover object-[center_10%]"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-pink-300 group-hover:text-valentine-red transition-colors">
                                        <Camera size={40} />
                                        <span className="text-[10px] mt-2 font-bold uppercase text-center px-4">Ta photo</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </motion.div>

                        {/* Central Large Heart - Exactly at the bottom vertex of the V, 3D folded look */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute bottom-2 z-30 pointer-events-none"
                        >
                            <div className="relative group overflow-visible">
                                {/* Shadow/Glow */}
                                <Heart className="absolute inset-0 text-[#ff4d6d]/40 blur-xl scale-125" size={140} />

                                {/* Folded 3D Heart Effect using layered SVGs */}
                                <div className="relative transform transition-transform duration-500 hover:scale-110">
                                    <Heart className="text-[#ff4d6d] fill-[#ff4d6d] drop-shadow-2xl" size={140} />
                                    {/* Vertical line to simulate fold */}
                                    <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-black/10 -ml-[1px]"></div>
                                    {/* Highlights for 3D feel */}
                                    <Heart className="absolute inset-0 text-white/20 fill-none scale-[0.85] translate-x-1" size={140} />
                                    <Heart className="absolute inset-0 text-black/10 fill-none scale-[0.85] -translate-x-1" size={140} />
                                </div>

                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute -top-4 -right-2 bg-white rounded-full p-1 shadow-md"
                                >
                                    <Heart className="text-[#ff4d6d] fill-[#ff4d6d]" size={20} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <p className="font-fira text-valentine-red/60 text-sm animate-pulse italic">Touche le cadre de droite pour ajouter ton portrait ✨</p>
        </div>
    );
}
