"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Mail, ArrowUp } from "lucide-react";

// Componente SVG para TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.05A6.27 6.27 0 0 0 2.81 15.66a6.27 6.27 0 0 0 10.69 4.46 5.94 5.94 0 0 0 1.83-4.31V8.82a8.16 8.16 0 0 0 4.77 1.52v-3.65Z" 
      fill="currentColor"
    />
  </svg>
);

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/exo_digitalstudio/",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@exodigital_studio?_t=ZS-90UlvsZVMMm&_r=1",
    icon: <TikTokIcon className="w-5 h-5" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61581476738289",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    name: "Email",
    href: "mailto:exo.digitalstudio@gmail.com",
    icon: <Mail className="w-5 h-5" />,
  },
];

const footerLinks = [
  { name: "Todos los productos", href: "/productos" },
  { name: "Sobre nosotros", href: "/quienes-somos" },
  { name: "Contacto", href: "https://wa.me/51925475680" },
];

export function LogoFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="relative border-t"
      style={{
        background: 'linear-gradient(135deg, #0D0F14 0%, #1B2636 45%, #243447 100%)',
        borderTopColor: 'rgba(53, 182, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(13, 15, 20, 0.8)'
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(53, 182, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(53, 182, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3">
                <motion.img
                  src="/EXOstudioV/EXOlogo_oficial1.png"
                  alt="EXO digital studio logo"
                  width="32"
                  height="32"
                  className="filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(53, 182, 255, 0.5))'
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <span 
                  className="text-xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #35B6FF 0%, #1E90FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  EXO digital studio
                </span>
              </div>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#A7B2C0' }}
              >
                Diseño que construye confianza. 
                <br />
                Tecnología que fluye contigo.
              </p>
            </motion.div>

            {/* Column 2: Navigation */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 
                className="font-semibold text-lg"
                style={{ color: '#F5F7FA' }}
              >
                Explorar
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm transition-all duration-200 text-left"
                      style={{ color: '#A7B2C0' }}
                      whileHover={{ 
                        x: 4,
                        color: '#35B6FF'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Social Media */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 
                className="font-semibold text-lg"
                style={{ color: '#F5F7FA' }}
              >
                Conecta
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleNavClick(social.href)}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: 'rgba(255,255,255,.06)',
                      border: '1px solid rgba(255,255,255,.12)',
                      color: '#A7B2C0'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: '#35B6FF',
                      color: '#ffffff',
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 0.3 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            style={{
              borderTop: '1px solid rgba(53, 182, 255, 0.1)'
            }}
          >
            <p 
              className="text-sm"
              style={{ color: '#A7B2C0' }}
            >
              © {new Date().getFullYear()} EXO digital studio. Todos los derechos reservados.
            </p>
            
            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: 'rgba(53, 182, 255, 0.1)',
                border: '1px solid rgba(53, 182, 255, 0.2)',
                color: '#35B6FF'
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: '#35B6FF',
                color: '#ffffff'
              }}
              transition={{ duration: 0.3 }}
              title="Volver arriba"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}