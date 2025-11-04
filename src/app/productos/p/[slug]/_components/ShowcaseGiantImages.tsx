"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ShowcaseGiantImagesProps {
  images: string[];
}

export function ShowcaseGiantImages({ images }: ShowcaseGiantImagesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const showcaseData = [
    {
      image: images[0] || "/EXOstudioV/Imagenes_de_productos/logos/hero.png",
      title: "Versatilidad Visual",
      description: "Adaptable a cualquier contexto sin perder identidad"
    },
    {
      image: images[1] || "/EXOstudioV/Imagenes_de_productos/logos/mock-1.png",
      title: "Escalabilidad Perfecta",
      description: "Desde favicon hasta valla publicitaria, nítido en cada tamaño"
    },
    {
      image: images[2] || "/EXOstudioV/Imagenes_de_productos/logos/mock-2.png",
      title: "Memoria Inmediata",
      description: "Diseño que permanece en la mente de tu audiencia"
    },
    {
      image: images[0] || "/EXOstudioV/Imagenes_de_productos/logos/hero.png",
      title: "Atemporalidad",
      description: "Relevante hoy, icónico mañana"
    }
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
            Explora las posibilidades
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Cada aplicación, una historia de impacto visual
          </p>
        </motion.div>

        <div className="space-y-32">
          {showcaseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1.2, 
                delay: 0.3 + index * 0.2,
                ease: "easeOut"
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden">
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 z-10"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, rgba(13, 15, 20, 0.4) 0%, rgba(13, 15, 20, 0.8) 100%)'
                        : 'linear-gradient(225deg, rgba(13, 15, 20, 0.4) 0%, rgba(13, 15, 20, 0.8) 100%)'
                    }}
                  />
                  
                  {/* Blueprint grid */}
                  <div 
                    className="absolute inset-0 z-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(53, 182, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(53, 182, 255, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-8 relative z-5"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-10 right-10 w-6 h-6 rounded-full z-20"
                  style={{ backgroundColor: '#35B6FF' }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 w-4 h-4 rounded-full z-20"
                  style={{ backgroundColor: '#35B6FF' }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <motion.h3
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + index * 0.2 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  {item.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.7 + index * 0.2 }}
                  className="text-lg leading-relaxed"
                  style={{ color: '#A7B2C0' }}
                >
                  {item.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.9 + index * 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#35B6FF' }}
                  />
                  <span className="text-sm" style={{ color: '#35B6FF' }}>
                    Aplicación {index + 1}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}