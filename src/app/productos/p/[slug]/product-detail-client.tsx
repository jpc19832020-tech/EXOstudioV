"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Check, Image as ImageIcon } from "lucide-react";
import { ProductDetail as ProductDetailType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import Image from "next/image";

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const router = useRouter();
  
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await csvParser.loadProducts();
        const productData = csvParser.getProductBySlug(slug);
        
        if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const handleWhatsAppClick = () => {
    if (product) {
      const message = encodeURIComponent(product.cta_whatsapp);
      window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
    }
  };

  const handleBackToCatalog = () => {
    router.push("/productos");
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <ExoHeader />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Cargando producto...</p>
            </div>
          </main>
          <ExoFooter />
        </div>
      </ThemeProvider>
    );
  }

  if (!product) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <ExoHeader />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
              <p className="text-muted-foreground mb-6">
                El producto que buscas no existe o no está disponible.
              </p>
              <Button onClick={handleBackToCatalog}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
              </Button>
            </div>
          </main>
          <ExoFooter />
        </div>
      </ThemeProvider>
    );
  }

  const currentImage = product.todasLasImagenes[currentImageIndex];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ExoHeader />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={handleBackToCatalog}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Image
                    src={currentImage}
                    alt={`${product.nombre} - vista principal`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Image Gallery */}
                {product.todasLasImagenes.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.todasLasImagenes.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`relative w-full aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.nombre} - imagen ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 12.5vw"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold">{product.nombre}</h1>
                    <Badge variant="secondary">{product.categoria}</Badge>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.descripcion_corta}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-border/50">
                  <span className="text-2xl font-bold">{product.precio.formatted}</span>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Cotizar por WhatsApp
                  </Button>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Características principales</h3>
                  <div className="grid gap-3">
                    {product.caracteristicas.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
                      >
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Gallery */}
                {product.imagenesAdicionales.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Galería adicional</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {product.imagenesAdicionales.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
                        >
                          <Image
                            src={image}
                            alt={`${product.nombre} - galería ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-6"
                >
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-border/50">
                    <h4 className="text-lg font-semibold mb-3">¿Interesado en este producto?</h4>
                    <p className="text-muted-foreground mb-4">
                      Contáctanos por WhatsApp para obtener más información, cotización personalizada o demostración.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleWhatsAppClick}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contactar ahora
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleBackToCatalog}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Ver más productos
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
        
        <ExoFooter />
      </div>

      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.0,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={handleBackToCatalog}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg rounded-full px-6 py-3 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </Button>
      </motion.div>
    </ThemeProvider>
  );
}