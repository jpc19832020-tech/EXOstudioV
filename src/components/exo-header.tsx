"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navigation = [
  { 
    name: "Productos", 
    href: "/productos",
    description: "Descubre nuestros servicios digitales"
  },
  { 
    name: "Servicios", 
    href: "/servicios",
    description: "Soluciones personalizadas para tu negocio"
  },
  { 
    name: "Portafolio", 
    href: "/portafolio",
    description: "Casos de éxito y proyectos destacados"
  },
  { 
    name: "Blog", 
    href: "/blog",
    description: "Artículos sobre diseño y tecnología"
  },
  { 
    name: "Contacto", 
    href: "/contacto",
    description: "Conversemos sobre tu proyecto"
  }
];

const topNav = [
  { name: "Inicio", href: "/" },
  { name: "Quiénes Somos", href: "/quienes-somos" }
];

export function ExoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setIsScrolled(scrolled > 20);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href === '/productos') {
      const isProduction = process.env.NODE_ENV === 'production';
      const basePath = isProduction ? '/EXOstudioV' : '';
      window.location.href = `${basePath}${href}`;
      return;
    }
    
    const isProduction = process.env.NODE_ENV === 'production';
    const basePath = isProduction ? '/EXOstudioV' : '';
    
    if (window.location.pathname.includes('/quienes-somos')) {
      window.location.href = `${basePath}${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("¡Hola! Me interesa conocer más sobre sus servicios digitales.");
    window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/30 shadow-2xl" 
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-background/10 to-background/5" />
        
        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-16" : "h-20"
          }`}>
            
            {/* Logo y Navegación Superior */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center space-x-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    const isProduction = process.env.NODE_ENV === 'production';
                    const basePath = isProduction ? '/EXOstudioV' : '';
                    window.location.href = `${basePath}/`;
                  }}
                  className="group"
                >
                  <motion.div
                    className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30"
                    whileHover={{ 
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src="/EXOstudioV/EXOlogo_oficial1.png"
                      alt="EXO digital studio"
                      width="36"
                      height="36"
                      className="drop-shadow-sm"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Top Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {topNav.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const isProduction = process.env.NODE_ENV === 'production';
                        const basePath = isProduction ? '/EXOstudioV' : '';
                        window.location.href = `${basePath}${item.href}`;
                      }}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:shadow-md"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Navigation con Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="group flex items-center space-x-2 text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-primary bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 border border-border/50 hover:border-primary/30 px-4 py-2.5 rounded-xl hover:shadow-lg"
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Premium Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-6">
                          <motion.div
                            variants={itemVariants}
                            className="text-sm text-muted-foreground mb-4 leading-relaxed"
                          >
                            {item.description}
                          </motion.div>
                          <div className="space-y-3">
                            {[
                              { name: "Ver más detalles", icon: "→" },
                              { name: "Solicitar cotización", icon: "💰" },
                              { name: "Ver casos de uso", icon: "🎯" }
                            ].map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.name}
                                variants={itemVariants}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                                whileHover={{ x: 5 }}
                              >
                                <span className="text-primary text-sm">{subItem.icon}</span>
                                <span className="text-sm group-hover:text-primary transition-colors">
                                  {subItem.name}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button Premium */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={handleWhatsAppClick}
              className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.div>
              <span>Contactar</span>
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border/30"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Top Navigation Mobile */}
              <div className="mb-6 space-y-2">
                {topNav.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const isProduction = process.env.NODE_ENV === 'production';
                        const basePath = isProduction ? '/EXOstudioV' : '';
                        window.location.href = `${basePath}${item.href}`;
                      }}
                      className="block py-3 text-sm font-medium transition-colors duration-200 hover:text-primary text-muted-foreground"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Main Navigation Mobile */}
              <div className="space-y-3">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="block py-3 text-sm font-medium transition-colors duration-200 hover:text-primary text-muted-foreground border-l-2 border-transparent hover:border-primary pl-4"
                    >
                      {item.name}
                    </Link>
                    <div className="text-xs text-muted-foreground/70 pl-4 mt-1">
                      {item.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                onClick={handleWhatsAppClick}
                className="w-full mt-6 flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}