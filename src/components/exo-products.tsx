"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MessageCircle, Eye } from "lucide-react";
import { ProductDetail } from "./product-detail";

// Componente de logo de WhatsApp
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Tipos para mejor TypeScript
interface Product {
  id: number;
  name: string;
  description: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  features: string[];
  comingSoon: boolean;
  image?: string;
}

interface EmbedConfig {
  url: string;
  title: string;
  height: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  maxWidth: string;
}

// Constantes y configuración
const WHATSAPP_NUMBER = "51925475680";
const PROJECT_URL = "https://jpc19832020-tech.github.io/Jperez/";
const PRODUCTS_URL = "https://jpc19832020-tech.github.io/EXOstudioV/productos/";

// Función de efecto de clic para partículas
const createClickEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
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

const products: Product[] = [
  {
    id: 1,
    name: "SmartCard",
    description: "Tarjeta de presentación inteligente. Comparte tu información de contacto instantáneamente con un solo toque.",
    badge: "Nuevo",
    badgeVariant: "default",
    image: "/smartcard-image.png",
    features: [
      "Disponible en cualquier momento",
      "Diseño personalizable",
      "Análisis de interacciones",
      "Compatibilidad universal",
      "Actualización en tiempo real"
    ],
    comingSoon: false,
  },
];

// Configuración del embed
const embedConfig: EmbedConfig = {
  url: PROJECT_URL,
  title: "Proyecto ejemplo - J Perez",
  height: {
    mobile: "h-96",
    tablet: "md:h-[500px]",
    desktop: "lg:h-[600px]"
  },
  maxWidth: "max-w-4xl"
};

// Variantes de animación
const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  },
  feature: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
} as const;

export function ExoProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Manejadores de eventos con useCallback
  const handleContactClick = useCallback((productName: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en ${productName}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }, []);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  const handleOpenProject = useCallback(() => {
    window.open(PROJECT_URL, "_blank");
  }, []);

  const handleContactForProject = useCallback(() => {
    const message = encodeURIComponent("Hola, estoy interesado en un proyecto como el ejemplo que vi en su web.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  }, []);

  const handleContactCustom = useCallback(() => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  }, []);

  const handleViewAllProducts = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    createClickEffect(e);
    setTimeout(() => {
      window.open(PRODUCTS_URL, "_blank", "noopener,noreferrer");
    }, 200);
  }, []);

  // Componente de embed optimizado
  const WebsiteEmbed = useMemo(() => {
    return () => (
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm rounded-2xl p-8 border-4 border-primary">
        <motion.h3 
          className="text-2xl font-bold mb-6 text-center"
          variants={animationVariants.item}
        >
          Te mostramos nuestro trabajo
        </motion.h3>
        <motion.p 
          className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto"
          variants={animationVariants.item}
        >
          Explora este proyecto desarrollado por nuestro equipo. 
          Un ejemplo de la calidad y diseño que ofrecemos.
        </motion.p>
        
        <motion.div variants={animationVariants.item}>
          <div className={`w-full ${embedConfig.maxWidth} mx-auto`}>
            <iframe
              src={embedConfig.url}
              className={`w-full ${embedConfig.height.mobile} ${embedConfig.height.tablet} ${embedConfig.height.desktop} rounded-lg border-2 border-border shadow-xl bg-white`}
              style={{ zoom: 0.7 }}
              title={embedConfig.title}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          variants={animationVariants.item}
        >
          <Button
            variant="outline"
            onClick={handleOpenProject}
            className="flex items-center gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en nueva pestaña
          </Button>
          
          <Button
            onClick={handleContactForProject}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Quiero un proyecto así
          </Button>
        </motion.div>
      </div>
    );
  }, [handleOpenProject, handleContactForProject]);

  return (
    <section id="productos" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animationVariants.container}
            className="text-center mb-16"
          >
            <motion.h2
              variants={animationVariants.item}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Nuestros productos
            </motion.h2>
            <motion.p
              variants={animationVariants.item}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Soluciones digitales diseñadas para transformar tu negocio y acelerar tu crecimiento.
            </motion.p>
          </motion.div>

          {/* Products grid */}
          <motion.div
            variants={animationVariants.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-2xl mx-auto"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={animationVariants.item}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`h-full bg-primary/10 backdrop-blur-sm border-4 border-primary hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 ${
                  product.comingSoon ? "opacity-75" : ""
                }`}>
                  <CardHeader className="space-y-4">
                    {/* Product Image */}
                    {product.image && (
                      <motion.div
                        className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Badge variant={product.badgeVariant} className="text-xs bg-accent text-primary-foreground">
                        {product.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Características:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-sm text-muted-foreground"
                            variants={animationVariants.feature}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 * index }}
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      {!product.comingSoon ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleContactClick(product.name)}
                          >
                            <WhatsAppIcon className="w-4 h-4 mr-2" />
                            Contactar
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-accent hover:bg-accent/90 text-white"
                            onClick={() => handleViewDetails(product)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled
                        >
                          Próximamente
                        </Button>
                      )}
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

          {/* Website Embed */}
          <motion.div
            variants={animationVariants.item}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-16"
          >
            <WebsiteEmbed />
          </motion.div>

          {/* CTA for custom products */}
          <motion.div
            variants={animationVariants.item}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-4 border-accent">
              <h3 className="text-2xl font-bold mb-4">
                ¿Necesitas algo personalizado?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Creamos soluciones a medida para necesidades específicas. 
                Hablemos de tu proyecto y desarrollemos algo único juntos.
              </p>
              <Button
                size="lg"
                onClick={handleContactCustom}
                className="bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Consultar proyecto personalizado
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetail 
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </section>
  );
}