"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const handleContactClick = () => {
    if (product) {
      const message = encodeURIComponent(`Hola, estoy interesado en ${product.name}`);
      window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-card/95 backdrop-blur-md border-border/50 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  {/* Product Image */}
                  {product.image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-8"
                    >
                      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/50 shadow-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        
                        {/* Overlay gradient effect */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                              {product.name}
                            </h3>
                            <p className="text-white/90 text-sm md:text-base">
                              Innovación en cada conexión
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-3xl md:text-4xl font-bold"
                        >
                          {product.name}
                        </motion.h2>
                        <Badge variant={product.badgeVariant} className="text-sm">
                          {product.badge}
                        </Badge>
                      </div>
                      
                      <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                      >
                        {product.description}
                      </motion.p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={onClose}
                      className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Features Grid */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold mb-6">Características principales</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-cyan rounded-full mt-2 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-border/50">
                      <h4 className="text-lg font-semibold mb-3">¿Por qué elegir {product.name}?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Diseñado con las mejores prácticas de la industria, {product.name} ofrece una experiencia 
                        superior combinando rendimiento excepcional con una interfaz intuitiva. Perfecto para 
                        empresas que buscan optimizar sus procesos y tomar decisiones basadas en datos.
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      size="lg"
                      onClick={handleContactClick}
                      className="flex-1 bg-gradient-to-r from-cyan to-magenta text-white hover:from-cyan/90 hover:to-magenta/90"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Solicitar demostración
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onClose}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Volver a productos
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}