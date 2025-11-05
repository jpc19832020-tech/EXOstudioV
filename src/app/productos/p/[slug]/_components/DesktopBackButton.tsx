"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function DesktopBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <motion.button
      onClick={handleGoBack}
      className="hidden lg:flex fixed bottom-8 left-8 z-40 items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(255,255,255,.12)',
        color: '#F5F7FA',
        backdropFilter: 'blur(10px)'
      }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'rgba(255,255,255,.1)',
        x: -5
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Regresar</span>
    </motion.button>
  );
}