"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";

export function CustomProjectBanner() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "¡Hola! Me interesa un proyecto personalizado. Me encantaría conocer más sobre sus servicios a medida."
    );
    const url = `https://wa.me/51925475680?text=${message}&utm_source=web&utm_medium=hero&utm_campaign=custom_project`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full mb-8"
    >
      <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 border-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-600/90" />
        
        <CardContent className="relative z-10 p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes algo único en mente?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Diseñamos soluciones a medida: web, branding, experiencias interactivas.
          </p>
          
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Hablemos hoy
          </Button>
        </CardContent>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
      </Card>
    </motion.div>
  );
}