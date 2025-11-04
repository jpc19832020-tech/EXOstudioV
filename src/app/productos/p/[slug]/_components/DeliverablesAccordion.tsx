"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileImage, Palette, Layout, Download, Monitor, Smartphone } from "lucide-react";

export function DeliverablesAccordion() {
  const [openSection, setOpenSection] = useState<string | null>("files");

  const sections = [
    {
      id: "files",
      title: "Archivos entregables",
      icon: <FileImage className="w-5 h-5" />,
      items: [
        "SVG vectorial (escalable infinitamente)",
        "PDF de alta resolución para impresión",
        "PNG con fondo transparente para web",
        "JPG para uso general"
      ]
    },
    {
      id: "variants",
      title: "Variantes del logo",
      icon: <Palette className="w-5 h-5" />,
      items: [
        "Versión a color principal",
        "Versión monocromática (blanco/negro)",
        "Variante horizontal",
        "Variante vertical",
        "Versión simplificada para tamaños pequeños"
      ]
    },
    {
      id: "usage",
      title: "Guía de uso",
      icon: <Layout className="w-5 h-5" />,
      items: [
        "Zonas de seguridad y espaciado mínimo",
        "Guía de colorimetría (CMYK, RGB, HEX)",
        "Tipografías complementarias",
        "Ejemplos de aplicación incorrecta",
        "Guía en formato A4 lista para imprimir"
      ]
    },
    {
      id: "optional",
      title: "Opcionales",
      icon: <Download className="w-5 h-5" />,
      items: [
        "Favicon para navegadores",
        "Cabeceras para redes sociales",
        "Tarjeta de presentación digital",
        "Variaciones animadas del logo",
        "Kit de marca completo (solicitud especial)"
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entregables + características
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Todo lo que necesitas para usar tu logo inmediatamente
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  borderColor: 'rgba(255,255,255,.12)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#35B6FF' }}
                    >
                      <div style={{ color: '#0D0F14' }}>
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-left">
                      {section.title}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: '#A7B2C0' }}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openSection === section.id && (
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
                      <ul className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div 
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: '#35B6FF' }}
                            />
                            <span className="text-lg leading-relaxed" style={{ color: '#F5F7FA' }}>
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="flex items-center gap-3">
              <Monitor className="w-6 h-6" style={{ color: '#35B6FF' }} />
              <span className="text-lg">Listo para web</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6" style={{ color: '#35B6FF' }} />
              <span className="text-lg">Optimizado para móvil</span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6" style={{ color: '#35B6FF' }} />
              <span className="text-lg">Descarga inmediata</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}