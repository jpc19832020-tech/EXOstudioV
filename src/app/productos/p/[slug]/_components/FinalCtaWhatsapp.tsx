"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

interface FinalCtaWhatsappProps {
  onClick: () => void;
}

export function FinalCtaWhatsapp({ onClick }: FinalCtaWhatsappProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(53, 182, 255, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(53, 182, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <div 
            className="relative rounded-3xl p-12 md:p-20 backdrop-blur-xl border max-w-4xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.04) 100%)',
              borderColor: 'rgba(255,255,255,.12)',
              boxShadow: '0 0 40px rgba(53, 182, 255, 0.15)'
            }}
          >
            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-6 h-6 rounded-full"
              style={{ backgroundColor: '#35B6FF' }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -top-6 -right-8 w-4 h-4 rounded-full"
              style={{ backgroundColor: '#35B6FF' }}
              animate={{
                y: [0, -15, 0],
                x: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            <motion.div
              className="absolute -bottom-8 left-1/4 w-3 h-3 rounded-full"
              style={{ backgroundColor: '#35B6FF' }}
              animate={{
                y: [0, 12, 0],
                x: [0, 6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            <motion.h2 
              className="text-4xl md:text-5xl font-black mb-6 relative z-10"
              style={{
                textShadow: '0 0 30px rgba(53, 182, 255, 0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              ¿Lista para transformar tu marca?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto relative z-10"
              style={{ color: '#A7B2C0' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              El diseño no es solo un logo, es el inicio de una historia. 
              Cada línea, cada color, cada forma cuenta una narrativa visual 
              que conecta emocionalmente con tu audiencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="relative z-10"
            >
              <motion.button
                onClick={onClick}
                className="group relative px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 overflow-hidden"
                style={{
                  backgroundColor: '#35B6FF',
                  boxShadow: '0 0 40px rgba(53, 182, 255, 0.4)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 50px rgba(53, 182, 255, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-6 h-6" style={{ color: '#0D0F14' }} />
                  <span style={{ color: '#0D0F14' }}>
                    Cotizar por WhatsApp
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#0D0F14' }} />
                </div>
              </motion.button>

              {/* Subtext */}
              <motion.p
                className="text-sm mt-6"
                style={{ color: '#A7B2C0' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.9 }}
              >
                Respuesta en menos de 2 horas • Sin compromiso de compra
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}