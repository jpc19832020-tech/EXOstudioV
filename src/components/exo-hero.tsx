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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient-shift" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'w-32 h-32' : 'w-24 h-24'} rounded-full ${i % 2 === 0 ? 'bg-primary/10' : 'bg-accent/10'} blur-xl`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo with enhanced animation */}
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="relative inline-block"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src="/EXOstudioV/EXOlogo_oficial1.png"
                alt="EXO digital studio logo"
                width="120"
                height="120"
                className="relative z-10"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px rgba(0, 191, 255, 0.3))",
                    "drop-shadow(0 0 30px rgba(142, 30, 252, 0.4))",
                    "drop-shadow(0 0 20px rgba(0, 191, 255, 0.3))"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated ring around logo */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced main title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Tecnología
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                que fluye
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                contigo.
              </motion.span>
            </h1>
          </motion.div>

          {/* Enhanced subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
          >
            <span className="text-foreground font-semibold">EXO digital studio</span> —
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
              {" "}productos y experiencias digitales rápidas, elegantes y diferentes.
            </span>
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            {/* Ver Producto Button */}
            <motion.button
              onClick={handleProductsClick}
              className="group relative px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-primary/40 transition-all duration-500 overflow-hidden min-w-[200px]"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 191, 255, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <ArrowRight className="mr-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                Ver Producto
              </span>
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsAppClick}
              className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/40 transition-all duration-500 overflow-hidden min-w-[250px]"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Escríbenos por WhatsApp
              </span>
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              />
            </motion.button>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-8 h-12 border-2 border-primary/40 rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">Desliza</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}