"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Grid, Maximize2 } from "lucide-react";
import Image from "next/image";

interface BehindTheSymbolProps {
  images: string[];
}

export function BehindTheSymbol({ images }: BehindTheSymbolProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock detail images if none provided
  const detailImages = images.length > 0 ? images : [
    "/EXOstudioV/Imagenes_de_productos/logos/hero.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-1.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-2.png"
  ];

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
            Detrás del símbolo
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Lo simple lleva trabajo. Ese es nuestro trabajo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {detailImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                {/* Blueprint grid overlay - shown on hover */}
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(53, 182, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(53, 182, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    opacity: hoveredImage === index ? 1 : 0
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredImage === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Node points overlay - shown on hover */}
                {hoveredImage === index && (
                  <motion.div
                    className="absolute inset-0 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Simulated node points */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-500" />
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-cyan-500" />
                    <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-cyan-500" />
                    <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-cyan-500" />
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <motion.line
                        x1="25%"
                        y1="25%"
                        x2="33%"
                        y2="33%"
                        stroke="rgba(53, 182, 255, 0.5)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      <motion.line
                        x1="66%"
                        y1="33%"
                        x2="50%"
                        y2="66%"
                        stroke="rgba(53, 182, 255, 0.5)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                      <motion.line
                        x1="50%"
                        y1="66%"
                        x2="75%"
                        y2="25%"
                        stroke="rgba(53, 182, 255, 0.5)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Image */}
                <Image
                  src={image}
                  alt={`Detalle del logo - Vista ${index + 1}`}
                  fill
                  className="object-contain p-8 relative z-5 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Image info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="mt-6 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Grid className="w-5 h-5" style={{ color: '#35B6FF' }} />
                  <span className="font-semibold">Estructura vectorial</span>
                </div>
                <p className="text-sm" style={{ color: '#A7B2C0' }}>
                  Cada curva y nodo optimizado para máxima escalabilidad
                </p>
              </motion.div>

              {/* Hover indicator */}
              <motion.div
                className="absolute top-4 right-4 z-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredImage === index ? 1 : 0,
                  scale: hoveredImage === index ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-2">
                  <Eye className="w-4 h-4 text-white" />
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-center mt-16 max-w-4xl mx-auto"
        >
          <div 
            className="rounded-2xl p-8 backdrop-blur-xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,.06)',
              borderColor: 'rgba(255,255,255,.12)'
            }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Precisión en cada píxel
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: '#A7B2C0' }}>
              Nuestros logos están construidos con una precisión matemática. 
              Cada ancla, curva y punto está estratégicamente posicionado 
              para garantizar legibilidad en cualquier tamaño, desde favicon hasta valla publicitaria.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#35B6FF' }}>
                  100%
                </div>
                <p className="text-sm">Vectorial</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#35B6FF' }}>
                  ∞
                </div>
                <p className="text-sm">Escalable</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#35B6FF' }}>
                  0.01
                </div>
                <p className="text-sm">Tolerancia px</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}