"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroBlueprintProps {
  title: string;
  subtitle: string;
  phrases: string[];
  onPrimaryCta: () => void;
}

export function HeroBlueprint({ title, subtitle, phrases, onPrimaryCta }: HeroBlueprintProps) {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => {
        const currentIndex = phrases.indexOf(prev);
        return phrases[(currentIndex + 1) % phrases.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  const scrollToProcess = () => {
    const element = document.getElementById('process-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0D0F14 0%, #1B2636 45%, #243447 100%)'
        }}
      />
      
      {/* Blueprint grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(53, 182, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(53, 182, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.h1 
          className="text-6xl md:text-8xl font-black mb-8 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            textShadow: '0 0 40px rgba(53, 182, 255, 0.3)',
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ color: '#A7B2C0' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        {/* Rotating phrases */}
        <motion.div 
          className="h-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <motion.p
            key={currentPhrase}
            className="text-lg md:text-xl font-light tracking-wide"
            style={{ color: '#35B6FF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentPhrase}
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <Button
            onClick={onPrimaryCta}
            size="lg"
            className="px-12 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#35B6FF',
              boxShadow: '0 0 28px rgba(53, 182, 255, 0.25)'
            }}
          >
            Cotizar por WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToProcess}
            className="px-12 py-6 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.12)',
              color: '#F5F7FA'
            }}
          >
            Ver proceso
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm" style={{ color: '#A7B2C0' }}>Desliza</span>
          <ChevronDown className="w-6 h-6" style={{ color: '#35B6FF' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}