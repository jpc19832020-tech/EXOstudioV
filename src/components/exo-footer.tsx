"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

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
    href: "mailto:hola@exo.digital",
    icon: <Mail className="w-5 h-5" />,
  },
];

const footerLinks = [
  { name: "Presentación", href: "#presentacion" },
  { name: "Productos", href: "#productos" },
  { name: "Contacto", href: "#contacto" },
];

export function ExoFooter() {
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
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <footer className="border-t-4 border-gradient-to-r from-primary to-accent bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-2">
                <motion.img
                  src="/EXOstudioV/EXOlogo_oficial1.png"
                  alt="EXO digital studio logo"
                  width="24"
                  height="24"
                  className="text-primary filter drop-shadow-lg drop-shadow-primary/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EXO digital studio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tecnología que fluye contigo.
              </p>
            </motion.div>

            {/* Column 2: Navigation */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-semibold">Navegación</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      whileHover={{ x: 4 }}
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
              <h3 className="font-semibold">Redes sociales</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleNavClick(social.href)}
                    className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    whileHover={{ 
                      scale: 1.1,
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
            className="mt-12 pt-8 border-t-2 border-gradient-to-r from-primary/50 to-accent/50 text-center"
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EXO digital studio. Todos los derechos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}