"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, HelpCircle, Clock, FileText, Users } from "lucide-react";

export function FaqCompact() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      id: "includes",
      question: "¿Qué incluye el Logo Esencial?",
      answer: "Incluye propuestas iniciales, revisiones ilimitadas, archivos en formatos SVG, PDF, PNG y JPG, versiones en color y monocromáticas, variantes horizontal y vertical, y una guía rápida de uso en formato A4.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "revisions",
      question: "¿Cuántas revisiones incluye?",
      answer: "Incluye revisiones ilimitadas hasta que estés 100% satisfecho con el resultado. Trabajamos contigo hasta que el logo sea perfecto para tu marca.",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "timing",
      question: "¿Cuáles son los tiempos de entrega?",
      answer: "La primera propuesta la recibirás en 48 horas. El proceso completo suele tardar entre 48-72 horas dependiendo de las revisiones solicitadas.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: "delivery",
      question: "¿Cómo recibo los archivos?",
      answer: "Entregamos todos los archivos organizados en una carpeta digital lista para usar. Recibirás un enlace de descarga seguro con acceso permanente.",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section ref={ref} className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Todo lo que necesitas saber sobre nuestro proceso
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] text-left"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  borderColor: 'rgba(255,255,255,.12)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#35B6FF' }}
                    >
                      <div style={{ color: '#0D0F14' }}>
                        {faq.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openItem === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: '#A7B2C0' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openItem === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="rounded-2xl p-6 mt-2 backdrop-blur-xl border"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.03)',
                        borderColor: 'rgba(255,255,255,.08)'
                      }}
                    >
                      <p className="text-lg leading-relaxed" style={{ color: '#F5F7FA' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <div 
            className="inline-block rounded-2xl p-8 backdrop-blur-xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,.06)',
              borderColor: 'rgba(255,255,255,.12)'
            }}
          >
            <h3 className="text-2xl font-bold mb-4">
              ¿Otra pregunta?
            </h3>
            <p className="text-lg mb-6" style={{ color: '#A7B2C0' }}>
              Estamos aquí para resolver cualquier duda sobre tu proyecto
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`https://wa.me/51925475680?text=${encodeURIComponent('Hola EXO, tengo una pregunta sobre el Logo Esencial')}`, '_blank')}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#35B6FF',
                boxShadow: '0 0 28px rgba(53, 182, 255, 0.25)'
              }}
            >
              Chatear con un experto
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}