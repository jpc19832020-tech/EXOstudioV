"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ExoHero() {
  const createClickEffect = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Crear partículas
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-white rounded-full pointer-events-none';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.transform = 'translate(-50%, -50%)';
      
      button.appendChild(particle);
      
      // Animar partícula
      const angle = (Math.PI * 2 * i) / 8;
      const velocity = 100 + Math.random() * 50;
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${Math.cos(angle) * velocity - 50}px, ${Math.sin(angle) * velocity - 50}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  };

  const handleWhatsAppClick = (e) => {
    console.log("🚀 WhatsApp button clicked!");
    createClickEffect(e);
    
    setTimeout(() => {
      const message = encodeURIComponent("Hola, estoy interesado en los productos de EXO digital studio. Vi su web y quiero saber más.");
      const whatsappUrl = `https://wa.me/51925475680?text=${message}`;
      console.log("📱 Opening WhatsApp:", whatsappUrl);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 200);
  };

  const handleProductsClick = (e) => {
    console.log("🎯 Products button clicked!");
    createClickEffect(e);
    
    setTimeout(() => {
      const productsElement = document.getElementById("productos");
      console.log("🔍 Products element found:", !!productsElement);
      
      if (productsElement) {
        console.log("✨ Scrolling to products section");
        productsElement.scrollIntoView({ 
          behavior: "smooth", 
          block: "start"
        });
      } else {
        console.log("❌ Element not found, using hash fallback");
        window.location.hash = "productos";
      }
    }, 200);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyan/5" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Isometric lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 15}%`}
            y1="0"
            x2={`${30 + i * 10}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            animate={{
              y2: [100, 110, 100],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo animation */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img
              src="/EXOstudioV/EXOlogo_oficial1.png"
              alt="EXO digital studio logo"
              width="80"
              height="80"
              className="mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-cyan/20 to-magenta/20 rounded-full blur-xl" />
            </motion.div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <span className="inline-block">
              Tecnología{" "}
              <motion.span
                className="inline-block text-primary"
                initial={{ letterSpacing: "0em" }}
                animate={{ letterSpacing: ["0em", "0.02em", "0em"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                que fluye
              </motion.span>
            </span>
            <br />
            <span className="inline-block">contigo.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            EXO digital studio — productos y experiencias digitales rápidas, elegantes y diferentes.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Ver Producto Button */}
            <motion.button
              onClick={handleProductsClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan to-magenta text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-cyan/25 transition-all duration-300 overflow-hidden min-w-[180px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Ver Producto
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsAppClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 overflow-hidden min-w-[220px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg 
                  className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Escríbenos por WhatsApp
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-0"
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}