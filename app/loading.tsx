'use client';

import { motion } from 'motion/react';
import { storeConfig } from '@/config/store';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full mx-auto mb-8 shadow-lg"
        />
        <h2 className="text-xl font-black uppercase tracking-tighter">Carregando {storeConfig.name}...</h2>
      </div>
    </div>
  );
}
