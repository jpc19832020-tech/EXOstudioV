"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProcessSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Descubrimos tu visión",
      description: "Analizamos tu tono, referencias y público objetivo para entender la esencia de tu marca."
    },
    {
      number: "02",
      title: "Diseñamos magia",
      description: "Creamos múltiples rutas creativas y tú eliges la dirección que más resuena contigo."
    },
    {
      number: "03",
      title: "Perfeccionamos",
      description: "Ajustamos cada detalle hasta que sea excepcional, entregando archivos listos para usar."
    }
  ];

  return (
    <section id="process-section" ref={ref} className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proceso creativo
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Tú decides; nosotros lo volvemos inolvidable
          </p>
        </motion.div>

        <div className="space-y-24 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 1.2, 
                delay: 0.3 + index * 0.2,
                ease: "easeOut"
              }}
              className={`flex items-center gap-8 ${
                index % 2 === 1 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Step number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5 + index * 0.2,
                  ease: "easeOut"
                }}
                className="relative"
              >
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold relative"
                  style={{ 
                    backgroundColor: '#35B6FF',
                    boxShadow: '0 0 28px rgba(53, 182, 255, 0.25)'
                  }}
                >
                  {step.number}
                  
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: '#35B6FF' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Step content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.7 + index * 0.2,
                  ease: "easeOut"
                }}
                className="flex-1"
              >
                <div 
                  className="rounded-2xl p-8 backdrop-blur-xl border"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.06)',
                    borderColor: 'rgba(255,255,255,.12)'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#A7B2C0' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.9 + index * 0.2,
                    ease: "easeOut"
                  }}
                  className={`absolute top-24 w-0.5 h-24 origin-top ${
                    index % 2 === 0 ? 'left-24' : 'right-24'
                  }`}
                  style={{ 
                    backgroundColor: 'rgba(53, 182, 255, 0.3)',
                    transform: index % 2 === 0 ? 'translateX(48px)' : 'translateX(-48px)'
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="text-center mt-20"
        >
          <div 
            className="inline-block px-8 py-4 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(53, 182, 255, 0.1) 0%, rgba(53, 182, 255, 0.05) 100%)',
              border: '1px solid rgba(53, 182, 255, 0.2)'
            }}
          >
            <p className="text-sm font-medium">
              Proceso colaborativo de 48-72 horas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}