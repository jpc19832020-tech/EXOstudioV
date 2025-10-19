"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowRight, Sparkles, Phone } from "lucide-react";
import Link from "next/link";

// Componente de logo de WhatsApp
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Constantes
const WHATSAPP_NUMBER = "51925475680";

// Variantes de animación cinematográficas
const animationVariants = {
  heroContainer: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  heroLogo: {
    hidden: { opacity: 0, scale: 0.3, rotate: -180, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 1.5,
        delay: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  heroTitle: {
    hidden: { opacity: 0, y: 100, scale: 0.8, skewY: 5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      skewY: 0,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  heroSubtitle: {
    hidden: { opacity: 0, y: 80, x: -100, rotateZ: -3 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      transition: {
        duration: 0.9,
        delay: 0.9,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  heroDescription: {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  sectionBlock: {
    hidden: { opacity: 0, y: 120, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  textReveal: {
    hidden: { opacity: 0, x: -80, rotateY: -25, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  typewriterText: {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  glowText: {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  cardFloat: {
    hidden: { opacity: 0, y: 100, scale: 0.8, rotateX: 45, rotateZ: 5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateZ: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    hover: {
      y: -15,
      scale: 1.08,
      rotateX: 5,
      rotateZ: 2,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  finalCta: {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        staggerDirection: 1,
      },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  slideInFromLeft: {
    hidden: { opacity: 0, x: -150, rotateY: -30 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  slideInFromRight: {
    hidden: { opacity: 0, x: 150, rotateY: 30 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0, rotate: 180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
} as const;

// Componente de líneas de luz cinematográfico
const LightLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        style={{
          top: `${15 + i * 18}%`,
          background: `linear-gradient(90deg, transparent, rgba(var(--primary), ${0.3 + i * 0.1}), transparent)`
        }}
        initial={{ x: "-200%", opacity: 0 }}
        animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 6 + i * 0.8,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut",
          times: [0, 0.1, 0.9, 1],
        }}
      />
    ))}
    {/* Líneas verticales */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`v-${i}`}
        className="absolute w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        style={{
          left: `${25 + i * 25}%`,
          height: "100%",
        }}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "100%", opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          duration: 8 + i * 1,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeInOut",
          times: [0, 0.1, 0.9, 1],
        }}
      />
    ))}
  </div>
);

// Componente de partículas cinematográfico
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, rgba(var(--primary), ${0.3 + Math.random() * 0.4}), transparent)`,
        }}
        animate={{
          y: [0, -40 - Math.random() * 30, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0.1, 0.6 + Math.random() * 0.3, 0.1],
          scale: [1, 1.5 + Math.random() * 0.5, 1],
        }}
        transition={{
          duration: 8 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* Partículas con trail */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`trail-${i}`}
        className="absolute w-1 h-1 bg-primary/40 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, 100 + Math.random() * 100],
          y: [-20 - Math.random() * 40, 20 + Math.random() * 40],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

export function QuienesSomos() {
  const heroRef = useRef(null);
  const essenceRef = useRef(null);
  const missionRef = useRef(null);
  const differentiatorsRef = useRef(null);
  const historyRef = useRef(null);
  const ctaRef = useRef(null);

  
  const heroInView = useInView(heroRef, { once: true });
  const essenceInView = useInView(essenceRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const differentiatorsInView = useInView(differentiatorsRef, { once: true, margin: "-100px" });
  const historyInView = useInView(historyRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const handleWhatsAppClick = useCallback(() => {
    const message = encodeURIComponent("Hola, quiero conocer más sobre EXO digital studio");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }, []);

  const differentiators = [
    {
      title: "Diseño + IA + Ventas",
      description: "Equilibrio perfecto entre estética impactante y resultados medibles.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Aprendizaje Aplicado",
      description: "Te enseñamos a usar y optimizar todo lo que construimos para ti.",
      icon: <ArrowRight className="w-6 h-6" />,
    },
    {
      title: "Velocidad Consciente",
      description: "Fluidez y agilidad sin sacrificar la calidad o la experiencia.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Medible por Diseño",
      description: "Cada detalle tiene un propósito y cada acción genera resultados.",
      icon: <ArrowRight className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background/95 to-accent/10"
      >
        <LightLines />
        
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={animationVariants.heroContainer}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        >
          {/* Logo Cinematográfico */}
          <motion.div
            variants={animationVariants.heroLogo}
            className="flex justify-center mb-16"
          >
            <motion.img
              src="/EXOstudioV/EXOlogo_oficial1.png"
              alt="EXO digital studio logo"
              width="140"
              height="140"
              className="drop-shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{
                scale: 1.15,
                rotate: 8,
                filter: "drop-shadow(0 0 30px rgba(var(--primary), 0.6))",
                transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
              }}
            />
            {/* Aura animada alrededor del logo */}
            <motion.div
              className="absolute inset-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          {/* Título Cinematográfico */}
          <motion.div
            variants={animationVariants.heroTitle}
            className="relative inline-block mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative"
              initial={{ backgroundPosition: "300% center" }}
              animate={{ backgroundPosition: "-100% center" }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              style={{
                backgroundSize: "400% auto",
                textShadow: "0 0 40px rgba(var(--primary), 0.3)",
              }}
            >
              ¿Quiénes Somos?
              {/* Efecto de brillo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ mixBlendMode: "overlay" }}
              />
            </motion.h1>
            {/* Efecto de eco */}
            {[...Array(3)].map((_, i) => (
              <motion.h1
                key={i}
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-primary/20 to-transparent bg-clip-text text-transparent"
                animate={{ 
                  scale: [1, 1.02 + i * 0.01, 1],
                  opacity: [0.1 - i * 0.03, 0.2 - i * 0.05, 0.1 - i * 0.03],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                ¿Quiénes Somos?
              </motion.h1>
            ))}
          </motion.div>
          
          {/* Subtítulo Cinematográfico */}
          <motion.h2
            variants={animationVariants.heroSubtitle}
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-10 text-muted-foreground relative"
          >
            <motion.span
              className="inline-block"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Go Beyond Digital
            </motion.span>
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
            />
            {/* Partículas decorativas */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  bottom: "-10px",
                  left: `${50 + (i - 2.5) * 15}%`,
                }}
                animate={{
                  y: [0, -10 - Math.random() * 10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random(),
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.h2>
          
          {/* Descripción Cinematográfica */}
          <motion.div
            variants={animationVariants.heroDescription}
            className="max-w-5xl mx-auto"
          >
            <motion.p
              className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2, ease: [0.23, 1, 0.32, 1] }}
            >
              {["En EXO digital studio unimos conocimiento + IA para diseñar experiencias digitales que fluyen rápido, ", "venden más y van más allá de los límites convencionales."].map((phrase, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 2.2 + index * 0.4,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="inline-block"
                >
                  {phrase.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 2.4 + index * 0.4 + wordIndex * 0.08,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className="inline-block mr-2"
                      whileHover={{
                        scale: 1.1,
                        color: "hsl(var(--primary))",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bloque 1 - Nuestra Esencia */}
      <section
        ref={essenceRef}
        className="relative py-32 px-4 bg-gradient-to-br from-background via-primary/3 to-accent/3 overflow-hidden"
      >
        {/* Elegant background elements */}
        <div className="absolute inset-0">
          {/* Subtle gradient mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial="hidden"
          animate={essenceInView ? "visible" : "hidden"}
          variants={animationVariants.sectionBlock}
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Elegant title */}
          <motion.div
            variants={animationVariants.textReveal}
            className="text-center mb-20"
          >
            <h3 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Nuestra Esencia
              </span>
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </motion.div>
          
          {/* Elegant content cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "EX",
                description: "Experience / Expand / Expertise",
                detail: "La experiencia que expande tu conocimiento y pericia"
              },
              {
                title: "O",
                description: "Opportunity / Optimization / Orbit",
                detail: "La oportunidad de optimizar tu órbita digital"
              },
              {
                title: "PROPÓSITO",
                description: "Ir más allá",
                detail: "Combinando conocimiento, creatividad e inteligencia artificial"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={animationVariants.fadeInUp}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="h-full bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-xl">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      {item.title}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">{item.description}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bloque 2 - Misión y Visión */}
      <section
        ref={missionRef}
        className="relative py-24 px-4 bg-gradient-to-r from-background/95 to-accent/5"
      >
        <motion.div
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={animationVariants.sectionBlock}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={animationVariants.textReveal} 
              className="space-y-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold relative"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <span className="relative z-10">Nuestra Misión</span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </motion.h3>
              <motion.p 
                className="text-lg leading-relaxed text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                {"Impulsar marcas y creadores con tecnología fluida, estética y funcional.".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={animationVariants.textReveal}
              className="space-y-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold relative"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <span className="relative z-10">Nuestra Visión</span>
                <motion.div
                  className="absolute -bottom-2 right-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                />
              </motion.h3>
              <motion.p 
                className="text-lg leading-relaxed text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                {"Ser el estudio que lleva a las marcas más allá del marketing tradicional, hacia una exosfera digital donde la innovación y la rentabilidad se fusionan.".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05, ease: "easeOut" }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Bloque 3 - Diferenciadores */}
      <section
        ref={differentiatorsRef}
        className="relative py-24 px-4 bg-gradient-to-b from-background to-accent/20"
      >
        <motion.div
          initial="hidden"
          animate={differentiatorsInView ? "visible" : "hidden"}
          variants={animationVariants.sectionBlock}
          className="max-w-6xl mx-auto"
        >
          <motion.h3
            variants={animationVariants.textReveal}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Qué nos hace diferentes
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                variants={animationVariants.cardFloat}
                whileHover="hover"
                className="group"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-t-4 border-l-4 border-primary border-r-4 border-b-4 border-accent hover:border-t-accent hover:border-l-accent hover:border-r-primary hover:border-b-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 relative z-10">
                    <div className="text-primary mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-3 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bloque 4 - Nuestra Historia */}
      <section
        ref={historyRef}
        className="relative py-32 px-4 bg-gradient-to-br from-background via-accent/3 to-primary/3 overflow-hidden"
      >
        {/* Elegant background */}
        <div className="absolute inset-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5"></div>
          
          {/* Floating elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${i % 2 === 0 ? 'w-32 h-32' : 'w-24 h-24'} rounded-full ${i % 2 === 0 ? 'bg-primary/5' : 'bg-accent/5'} blur-2xl`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial="hidden"
          animate={historyInView ? "visible" : "hidden"}
          variants={animationVariants.sectionBlock}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Elegant title */}
          <motion.div
            variants={animationVariants.textReveal}
            className="text-center mb-20"
          >
            <h3 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Nuestra Historia
              </span>
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </motion.div>
          
          {/* Elegant story cards */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={animationVariants.slideInFromLeft}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl">
                    💡
                  </div>
                </div>
                <h4 className="text-2xl font-light mb-6 text-primary">El Origen</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  EXO nació de la idea de que la tecnología no debe ser complicada: debe impulsar, enseñar y multiplicar resultados.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={animationVariants.slideInFromRight}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-2xl">
                    🚀
                  </div>
                </div>
                <h4 className="text-2xl font-light mb-6 text-accent">La Evolución</h4>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Cuando las mentes se juntan hacen grandes cosas, y con EXO unimos IA, creatividad y ventas para que cada persona y negocio vaya más allá de lo digital.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cierre Cinematográfico */}
      <section
        ref={ctaRef}
        className="relative py-32 px-4 bg-gradient-to-br from-primary/20 via-black to-accent/20 overflow-hidden"
      >
        {/* Efectos de fondo cinematográficos */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
            animate={{ y: ["100%", "-100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={animationVariants.finalCta}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          {/* Título cinematográfico mejorado */}
          <motion.div
            variants={animationVariants.glowText}
            className="mb-12"
          >
            <motion.h3
              className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative z-50"
              style={{
                filter: "drop-shadow(0 0 30px rgba(var(--primary), 0.5))",
              }}
            >
              <span className="relative z-50">
                Tu próxima versión ocurre cuando decides ir más allá.
                {/* Efecto de brillo sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ mixBlendMode: "overlay" }}
                />
              </span>
              {/* Efecto de partículas alrededor del texto */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full z-10"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${-10 + Math.random() * 110}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.h3>
            
            {/* Subtítulo cinemático */}
            <motion.p
              className="text-xl md:text-2xl text-accent font-light mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {"El futuro no se espera, se crea.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          {/* Botones cinematográficos */}
          <motion.div
            variants={animationVariants.staggerContainer}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.div variants={animationVariants.scaleIn}>
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-10 py-6 text-xl rounded-full border-2 border-primary/30 transition-all duration-500 shadow-2xl shadow-primary/25"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Hablemos en WhatsApp</span>
                </span>
                {/* Efectos de brillo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Partículas flotantes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random(),
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </Button>
            </motion.div>
            
            <motion.div variants={animationVariants.scaleIn}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group relative overflow-hidden border-2 border-accent/50 hover:border-accent text-accent hover:bg-accent/10 font-bold px-10 py-6 text-xl rounded-full transition-all duration-500 shadow-xl shadow-accent/20"
              >
                <Link href="https://jpc19832020-tech.github.io/EXOstudioV/#productos" onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://jpc19832020-tech.github.io/EXOstudioV/#productos";
                }}>
                  <span className="relative z-10 flex items-center gap-3">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Ver productos</span>
                  </span>
                  {/* Efecto de neón */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-full opacity-0 group-hover:opacity-100 scale-110 transition-all duration-500"
                  />
                  {/* Efecto de pulso */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Texto final cinemático */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-16"
          >
            <motion.p
              className="text-sm text-muted-foreground/60 font-light tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              EXO DIGITAL STUDIO • GO BEYOND DIGITAL
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}