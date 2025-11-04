"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface FloatingWhatsappBarProps {
  productName: string;
  onClick: () => void;
  isVisible: boolean;
}

export function FloatingWhatsappBar({ productName, onClick, isVisible }: FloatingWhatsappBarProps) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        <div 
          className="relative backdrop-blur-xl border-t"
          style={{
            backgroundColor: 'rgba(13, 15, 20, 0.95)',
            borderColor: 'rgba(255,255,255,.12)'
          }}
        >
          {/* Gradient top border */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(90deg, #35B6FF 0%, rgba(53, 182, 255, 0.3) 50%, #35B6FF 100%)',
              animation: 'shimmer 2s infinite'
            }}
          />

          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Product info */}
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm mb-1">
                  {productName}
                </h3>
                <p className="text-xs" style={{ color: '#A7B2C0' }}>
                  Logo profesional listo para usar
                </p>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={onClick}
                className="relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group"
                style={{
                  backgroundColor: '#35B6FF',
                  boxShadow: '0 0 20px rgba(53, 182, 255, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(53, 182, 255, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" style={{ color: '#0D0F14' }} />
                  <span style={{ color: '#0D0F14' }}>
                    Cotizar ahora
                  </span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Close hint */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(13, 15, 20, 0.8)',
                border: '1px solid rgba(255,255,255,.12)'
              }}
            >
              <X className="w-3 h-3 text-white" />
              <span className="text-xs text-white">Desliza para cerrar</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Add shimmer animation to global styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);
}