"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileFloatingButtonsProps {
  productName: string;
  onWhatsappClick: () => void;
}

export function MobileFloatingButtons({ productName, onWhatsappClick }: MobileFloatingButtonsProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden">
      {/* WhatsApp button */}
      <motion.button
        onClick={onWhatsappClick}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 6px 25px rgba(37, 211, 102, 0.6)'
        }}
        whileTap={{ scale: 0.95 }}
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Back button */}
      <motion.button
        onClick={handleGoBack}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          backgroundColor: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.2)',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: 'rgba(255,255,255,.15)'
        }}
        whileTap={{ scale: 0.95 }}
        title="Regresar"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}