"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface PrimaryImageShowcaseProps {
  image: string;
}

export function PrimaryImageShowcase({ image }: PrimaryImageShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main image container with gradient overlay */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
            {/* Gradient peripheral effect */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 60%, rgba(13, 15, 20, 0.8) 100%)'
              }}
            />
            
            {/* Blueprint grid overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(53, 182, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(53, 182, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}
            />
            
            {/* Image */}
            <Image
              src={image}
              alt="Logo Esencial - Vista principal"
              fill
              className="object-contain p-12 relative z-5 transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(53, 182, 255, 0.2) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(53, 182, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Corner indicators */}
          <motion.div
            className="absolute top-8 left-8 w-3 h-3 rounded-full z-20"
            style={{ backgroundColor: '#35B6FF' }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute top-8 right-8 w-3 h-3 rounded-full z-20"
            style={{ backgroundColor: '#35B6FF' }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          <motion.div
            className="absolute bottom-8 left-8 w-3 h-3 rounded-full z-20"
            style={{ backgroundColor: '#35B6FF' }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <motion.div
            className="absolute bottom-8 right-8 w-3 h-3 rounded-full z-20"
            style={{ backgroundColor: '#35B6FF' }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg" style={{ color: '#A7B2C0' }}>
            Legible, escalable, memorable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}