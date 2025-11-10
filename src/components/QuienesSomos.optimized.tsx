"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowRight, Sparkles, Phone, Target, Users, Lightbulb, Eye } from "lucide-react";
import Link from "next/link";

// Componente de logo de WhatsApp optimizado con mejor accesibilidad
const WhatsAppIcon = ({ className = "", size = 24, "aria-label": ariaLabel = "WhatsApp" }: { 
  className?: string; 
  size?: number;
  "aria-label"?: string;
}) => (
  <svg 
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={ariaLabel}
    role="img"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Constantes
const WHATSAPP_NUMBER = "51925475680";

// Animaciones optimizadas con mejor performance y accesibilidad
const optimizedAnimations = {
  // Animaciones de entrada más sutiles y performantes
  heroContainer: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  
  heroLogo: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  },
  
  heroTitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  
  heroSubtitle: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  
  sectionReveal: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  
  cardReveal: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
  
  textReveal: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  },
} as const;

// Componente de partículas minimalista y optimizado para móvil
const MinimalParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Solo 2 partículas principales para mejor performance en móvil */}
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary/20 rounded-full"
        style={{
          left: `${20 + i * 60}%`,
          top: `${30 + (i % 2) * 40}%`,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Componente de líneas de luz simplificado
const SubtleLightLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
      style={{ top: "40%", width: "100%" }}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "100%", opacity: [0, 0.3, 0] }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Hook para detectar preferencias de movimiento
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

export function QuienesSomosOptimized() {
  const heroRef = useRef<HTMLElement>(null);
  const essenceRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const differentiatorsRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Detectar preferencias de movimiento reducido
  const prefersReducedMotion = useReducedMotion();

  // Optimizar detección de viewport con mejor performance
  const heroInView = useInView(heroRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });
  const essenceInView = useInView(essenceRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });
  const missionInView = useInView(missionRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });
  const differentiatorsInView = useInView(differentiatorsRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });
  const historyInView = useInView(historyRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });
  const ctaInView = useInView(ctaRef, { 
    once: true, 
    margin: prefersReducedMotion ? "0px" : "-50px",
    amount: prefersReducedMotion ? 0.1 : 0.3
  });

  const handleWhatsAppClick = useCallback(() => {
    const message = encodeURIComponent("Hola, quiero conocer más sobre EXO digital studio");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  }, []);

  // Diferenciadores más concisos y accesibles
  const differentiators = [
    {
      title: "Diseño + IA + Ventas",
      description: "Equilibrio perfecto entre estética impactante y resultados medibles.",
      icon: <Target className="w-5 h-5" aria-hidden="true" />,
    },
    {
      title: "Aprendizaje Aplicado",
      description: "Te enseñamos a usar y optimizar todo lo que construimos para ti.",
      icon: <Lightbulb className="w-5 h-5" aria-hidden="true" />,
    },
    {
      title: "Velocidad Consciente",
      description: "Fluidez y agilidad sin sacrificar la calidad o la experiencia.",
      icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    },
    {
      title: "Resultados Medibles",
      description: "Cada detalle tiene un propósito y cada acción genera resultados.",
      icon: <Users className="w-5 h-5" aria-hidden="true" />,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" role="main">
      {/* Hero Section - Rediseñado */}
      <section
        ref={heroRef}
        aria-labelledby="hero-title"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        role="banner"
      >
        {/* Fondo minimalista */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/[0.02] to-accent/[0.02]" />
        <SubtleLightLines />
        <MinimalParticles />
        
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={optimizedAnimations.heroContainer}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Logo más refinado */}
          <motion.div
            variants={optimizedAnimations.heroLogo}
            className="flex justify-center mb-8 sm:mb-12"
            whileHover="hover"
          >
            <motion.img
              src="/EXOlogo_oficial1.png"
              alt="Logo de EXO digital studio"
              width={prefersReducedMotion ? 80 : 120}
              height={prefersReducedMotion ? 80 : 120}
              className="drop-shadow-lg transition-all duration-300"
              whileHover={{
                filter: "drop-shadow(0 0 20px rgba(var(--primary), 0.3))",
              }}
              loading="eager"
            />
          </motion.div>
          
          {/* Título más limpio y accesible */}
          <motion.h1
            id="hero-title"
            variants={optimizedAnimations.heroTitle}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            role="heading"
            aria-level="1"
          >
            ¿Quiénes Somos?
          </motion.h1>
          
          {/* Subtítulo simplificado */}
          <motion.h2
            variants={optimizedAnimations.heroSubtitle}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-6 sm:mb-8 text-muted-foreground"
            role="heading"
            aria-level={2}
          >
            Go Beyond Digital
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-primary to-accent mx-auto mt-4" />
          </motion.h2>
          
          {/* Descripción más directa y accesible */}
          <motion.p
            className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            role="article"
            aria-label="Descripción de EXO digital studio"
          >
            En EXO digital studio unimos conocimiento + IA para diseñar experiencias digitales 
            que fluyen rápido, venden más y van más allá de los límites convencionales.
          </motion.p>
        </motion.div>
      </section>

      {/* Bloque 1 - Nuestra Esencia - Rediseñado */}
      <section
        ref={essenceRef}
        aria-labelledby="essence-title"
        className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-background to-primary/[0.02]"
        role="region"
      >
        <motion.div
          initial="hidden"
          animate={essenceInView ? "visible" : "hidden"}
          variants={optimizedAnimations.sectionReveal}
          className="max-w-5xl mx-auto"
        >
          <motion.h3
            id="essence-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
            role="heading"
            aria-level={2}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Nuestra Esencia
            </span>
          </motion.h3>
          
          {/* Grid más limpio y responsive */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                variants={optimizedAnimations.cardReveal}
                whileHover={{ y: prefersReducedMotion ? 0 : -5 }}
                className="group"
                role="article"
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group-hover:shadow-primary/10">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="mb-4 sm:mb-6 flex justify-center">
                      <div className={`${
                        item.title === "PROPÓSITO"
                          ? "px-3 sm:px-4 py-2 min-w-[80px] sm:min-w-[100px]"
                          : "w-10 h-10 sm:w-12 sm:h-12"
                      } bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center ${
                        item.title === "PROPÓSITO"
                          ? "text-sm sm:text-lg font-bold"
                          : "text-xl sm:text-2xl font-bold"
                      } text-primary`}>
                        {item.title}
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{item.description}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bloque 2 - Misión y Visión - Rediseñado */}
      <section
        ref={missionRef}
        aria-labelledby="mission-vision-title"
        className="relative py-16 sm:py-20 px-4 bg-background"
        role="region"
      >
        <motion.div
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={optimizedAnimations.sectionReveal}
          className="max-w-5xl mx-auto"
        >
          <h3
            id="mission-vision-title"
            className="sr-only"
            role="heading"
            aria-level={2}
          >
            Nuestra Misión y Visión
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div 
              variants={optimizedAnimations.textReveal}
              className="space-y-4 sm:space-y-6"
              role="article"
            >
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary" role="heading" aria-level={3}>
                Nuestra Misión
              </h4>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Impulsar marcas y creadores con tecnología fluida, estética y funcional.
              </p>
            </motion.div>
            
            <motion.div
              variants={optimizedAnimations.textReveal}
              className="space-y-4 sm:space-y-6"
              role="article"
            >
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent" role="heading" aria-level={3}>
                Nuestra Visión
              </h4>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Ser el estudio que lleva a las marcas más allá del marketing tradicional, 
                hacia una exosfera digital donde la innovación y la rentabilidad se fusionan.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Bloque 3 - Diferenciadores - Rediseñado */}
      <section
        ref={differentiatorsRef}
        aria-labelledby="differentiators-title"
        className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-background to-primary/[0.02]"
        role="region"
      >
        <motion.div
          initial="hidden"
          animate={differentiatorsInView ? "visible" : "hidden"}
          variants={optimizedAnimations.sectionReveal}
          className="max-w-5xl mx-auto"
        >
          <motion.h3
            id="differentiators-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
            role="heading"
            aria-level={2}
          >
            Qué nos hace diferentes
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                variants={optimizedAnimations.cardReveal}
                whileHover={{ y: prefersReducedMotion ? 0 : -8, scale: prefersReducedMotion ? 1 : 1.02 }}
                className="group"
                role="article"
                aria-labelledby={`differentiator-${index}-title`}
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group-hover:shadow-primary/20 relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6 relative z-10">
                    <div className="text-primary mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                      {item.icon}
                    </div>
                    <h4 
                      id={`differentiator-${index}-title`}
                      className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors"
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bloque 4 - Nuestra Historia - Rediseñado */}
      <section
        ref={historyRef}
        aria-labelledby="history-title"
        className="relative py-16 sm:py-20 px-4 bg-background"
        role="region"
      >
        <motion.div
          initial="hidden"
          animate={historyInView ? "visible" : "hidden"}
          variants={optimizedAnimations.sectionReveal}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            id="history-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
            role="heading"
            aria-level={2}
          >
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              variants={optimizedAnimations.cardReveal}
              whileHover={{ y: prefersReducedMotion ? 0 : -5 }}
              role="article"
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-xl sm:text-2xl" aria-hidden="true">
                      💡
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-primary" role="heading" aria-level={3}>
                    El Origen
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    EXO nació de la idea de que la tecnología no debe ser complicada: 
                    debe impulsar, enseñar y multiplicar resultados.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={optimizedAnimations.cardReveal}
              whileHover={{ y: prefersReducedMotion ? 0 : -5 }}
              role="article"
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-accent/30 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-xl sm:text-2xl" aria-hidden="true">
                      🚀
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-accent" role="heading" aria-level={3}>
                    La Evolución
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Cuando las mentes se juntan hacen grandes cosas, y con EXO unimos IA, 
                    creatividad y ventas para que cada persona y negocio vaya más allá de lo digital.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Final - Rediseñado */}
      <section
        ref={ctaRef}
        aria-labelledby="cta-title"
        className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-primary/[0.05] via-background to-accent/[0.05]"
        role="region"
      >
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={optimizedAnimations.sectionReveal}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h3
            id="cta-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            role="heading"
            aria-level={2}
          >
            Tu próxima versión ocurre cuando decides ir más allá.
          </motion.h3>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            role="article"
          >
            El futuro no se espera, se crea.
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            role="navigation"
            aria-label="Acciones principales"
          >
            <motion.div variants={optimizedAnimations.cardReveal}>
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
                aria-label="Contactar por WhatsApp para conocer más sobre EXO digital studio"
              >
                <WhatsAppIcon size={20} className="mr-2" aria-label="" />
                Hablemos en WhatsApp
              </Button>
            </motion.div>
            
            <motion.div variants={optimizedAnimations.cardReveal}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link 
                  href="https://jpc19832020-tech.github.io/EXOstudioV/#productos"
                  aria-label="Ver los productos y servicios de EXO digital studio"
                >
                  <ArrowRight className="w-5 h-5 mr-2" aria-hidden="true" />
                  Ver productos
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 sm:mt-16"
          >
            <p className="text-xs sm:text-sm text-muted-foreground/60 font-light tracking-wider uppercase">
              EXO DIGITAL STUDIO • GO BEYOND DIGITAL
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}