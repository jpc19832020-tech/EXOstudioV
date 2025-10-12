"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Diseño",
    description: "Estética minimalista con atención al detalle y experiencia de usuario excepcional.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Rendimiento",
    description: "Optimización extrema para cargas sub-1 segundo y animaciones fluidas a 60fps.",
  },
];

export function ExoPresentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="presentacion" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Text content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-balance"
            >
              Quiénes somos
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance"
            >
              En EXO digital studio creamos productos digitales con foco en rendimiento y estética. 
              Diseñamos experiencias que se sienten rápidas y pulidas en cualquier dispositivo.
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance"
            >
              En EXO digital studio diseñamos y desarrollamos experiencias que combinan estética, 
              rendimiento y escalabilidad. Tu producto, listo para brillar.
            </motion.p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}