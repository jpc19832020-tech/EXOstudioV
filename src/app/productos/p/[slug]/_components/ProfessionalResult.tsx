"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, MessageCircle } from "lucide-react";

interface ProfessionalResultProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ProfessionalResult({ isVisible, onClose }: ProfessionalResultProps) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ backgroundColor: 'rgba(13, 15, 20, 0.98)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Success checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#35B6FF' }}
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: '#F5F7FA' }}
          >
            ¡Listo para empezar!
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-center mb-8 leading-relaxed"
            style={{ color: '#A7B2C0' }}
          >
            Tu solicitud ha sido enviada exitosamente. 
            Te contactaremos en menos de 2 horas con las propuestas iniciales.
          </motion.p>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#35B6FF' }} />
              <span className="text-sm" style={{ color: '#F5F7FA' }}>
                Propuestas en 48 horas
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#35B6FF' }} />
              <span className="text-sm" style={{ color: '#F5F7FA' }}>
                Revisiones ilimitadas
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#35B6FF' }} />
              <span className="text-sm" style={{ color: '#F5F7FA' }}>
                Archivos listos para usar
              </span>
            </div>
          </motion.div>

          {/* CTA to continue */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={onClose}
            className="w-full px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            style={{
              backgroundColor: '#35B6FF',
              boxShadow: '0 0 30px rgba(53, 182, 255, 0.3)'
            }}
          >
            <span>Continuar explorando</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'rgba(255,255,255,.06)',
            border: '1px solid rgba(255,255,255,.12)'
          }}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* WhatsApp button - only on desktop */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => window.open(`https://wa.me/51925475680?text=${encodeURIComponent('Hola EXO, quiero cotizar Logo Esencial')}`, '_blank')}
          className="hidden lg:flex absolute top-6 left-6 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: '#35B6FF',
            border: '1px solid rgba(255,255,255,.12)'
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}