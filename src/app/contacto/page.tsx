"use client";

import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ExoContact } from "@/components/exo-contact";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import { Sparkles, Target, Users, Zap, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ExoHeader />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Conversemos</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Hablemos de tu proyecto
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Estamos listos para transformar tus ideas en realidad digital. 
                    Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                  {[
                    { icon: Zap, label: "Respuesta", value: "Rápida" },
                    { icon: Target, label: "Enfoque", value: "Resultados" },
                    { icon: Users, label: "Experiencia", value: "+3 años" },
                    { icon: Sparkles, label: "Proyectos", value: "100%" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Content */}
          <ExoContact />

          {/* Additional Info Section */}
          <section className="py-24 bg-muted/10">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Why choose us */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl border border-primary/20"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">¿Por qué elegir EXO?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Combinamos creatividad, tecnología y experiencia para entregar 
                      soluciones digitales que真正 transforman tu negocio.
                    </p>
                  </motion.div>

                  {/* Process */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-gradient-to-br from-secondary/10 to-accent/10 backdrop-blur-sm rounded-2xl border border-secondary/20"
                  >
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Nuestro proceso</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Metodología probada: desde el análisis inicial hasta el 
                      lanzamiento y seguimiento post-proyecto.
                    </p>
                  </motion.div>

                  {/* Support */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl border border-accent/20"
                  >
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Soporte continuo</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      No solo entregamos tu proyecto y nos olvidamos. Te acompañamos 
                      para asegurar tu éxito a largo plazo.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Quick Section */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    Preguntas frecuentes
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {[
                      {
                        question: "¿Cuánto tiempo toma un proyecto?",
                        answer: "Depende del alcance. Proyectos simples en 1-2 semanas, complejos 1-3 meses."
                      },
                      {
                        question: "¿Trabajan con empresas de todos los tamaños?",
                        answer: "Sí, desde emprendedores hasta empresas medianas. Adaptamos nuestras soluciones."
                      },
                      {
                        question: "¿Ofrecen soporte post-lanzamiento?",
                        answer: "Por supuesto. Incluimos soporte y mantenimiento en todos nuestros proyectos."
                      },
                      {
                        question: "¿Cómo comienza el proceso?",
                        answer: "Con una consulta gratuita donde conocemos tu proyecto y necesidades."
                      }
                    ].map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/50"
                      >
                        <h4 className="font-semibold mb-3 text-primary">{faq.question}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <ExoFooter />
      </div>
    </ThemeProvider>
  );
}