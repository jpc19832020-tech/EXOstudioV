"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Check, ExternalLink } from "lucide-react";
import { ProductDetail as ProductDetailType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import { CategorySkin } from "@/components/CategorySkin";
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
  
  // Check if it's a Logo product for special treatment
  const isLogoProduct = product.categoria === "Branding" || product.nombre.toLowerCase().includes("logo");
  
  // Formatear precio con "Desde" si es necesario
  const formatPrice = () => {
    if (!product.precio.amount) return "Cotizar";
    const prefix = product.precio_desde ? "Desde " : "";
    return `${prefix}${product.precio.formatted}`;
  };

  if (isLogoProduct) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-white text-black flex flex-col">
          <ExoHeader />
          
          <CategorySkin categoria={product.categoria}>
            <main className="flex-1 pt-20">
              <div className="container mx-auto px-6 py-12 max-w-6xl">
                
                {/* Minimalist Logo Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-16"
                >
                  <motion.div
                    className="inline-block mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="inline-block px-6 py-2 bg-gray-100 border border-gray-300">
                      <span className="text-sm font-serif text-gray-700 tracking-wide uppercase">
                        {product.categoria}
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.h1
                    className="text-5xl md:text-7xl font-serif mb-6 text-black tracking-tight"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.6 }}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {product.nombre}
                  </motion.h1>
                  
                  <motion.div
                    className="w-24 h-px bg-gray-300 mb-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                  
                  <motion.p
                    className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-serif"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {product.descripcion_corta}
                  </motion.p>
                </motion.div>

                {/* Logo Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                  
                  {/* Main Logo Display */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0, delay: 1.2 }}
                    className="flex justify-center"
                  >
                    <div className="relative w-full max-w-2xl">
                      <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="relative w-full pb-[100%]">
                          <Image
                            src={currentImage}
                            alt={`${product.nombre} - diseño profesional`}
                            fill
                            className="object-contain p-12"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gallery */}
                    {product.todasLasImagenes.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="mt-12"
                      >
                        <h3 className="text-xl font-serif mb-8 text-black text-center">Variaciones</h3>
                        <div className="grid grid-cols-4 gap-4">
                          {product.todasLasImagenes.map((image, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleImageChange(index)}
                              className={`relative w-full aspect-square bg-white border-2 transition-all ${
                                currentImageIndex === index
                                  ? "border-black shadow-md"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="relative w-full h-full">
                                <Image
                                  src={image}
                                  alt={`${product.nombre} - variación ${index + 1}`}
                                  fill
                                  className="object-contain p-3"
                                  sizes="(max-width: 768px) 25vw, 12.5vw"
                                />
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Information Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0, delay: 1.3 }}
                    className="space-y-12"
                  >
                    {/* Price Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-black">{formatPrice()}</span>
                        {product.demo_url && (
                          <Button
                            asChild
                            className="bg-gray-800 text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-gray-400"
                          >
                            <a
                              href={product.demo_url}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
                      <h3 className="text-2xl font-serif mb-8 text-black">Características del servicio</h3>
                      <div className="space-y-6">
                        {product.caracteristicas.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + index * 0.1 }}
                            className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-700 leading-relaxed font-serif">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
                      <h3 className="text-2xl font-serif mb-6 text-black">¿Listo para empezar?</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleWhatsAppClick}
                          className="bg-black text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-400"
                        >
                          <MessageCircle className="w-5 h-5 mr-3" />
                          Consultar por WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleBackToCatalog}
                          className="border-gray-300 text-black hover:bg-gray-50"
                        >
                          <ArrowLeft className="w-5 h-5 mr-3" />
                          Ver otros servicios
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </main>
          </CategorySkin>
          
          <ExoFooter />
        </div>

        {/* Floating Back Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.8,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Button
            onClick={handleBackToCatalog}
            className="bg-black text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>
        </motion.div>
      </ThemeProvider>
    );
  }

  // Regular product display for non-logo items
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ExoHeader />
        
        <CategorySkin categoria={product.categoria}>
          <main className="flex-1 pt-20">
            <div className="container mx-auto px-4 py-8">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* Main Image */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--c-primary)]/10">
                    <div className="relative w-full pb-[56.25%]">
                      <Image
                        src={currentImage}
                        alt={`${product.nombre} - vista principal`}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Image Gallery */}
                  {product.todasLasImagenes.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.todasLasImagenes.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageChange(index)}
                          className={`relative w-full rounded-lg overflow-hidden border-2 transition-all ${
                            currentImageIndex === index
                              ? "border-[var(--c-primary)]"
                              : "border-[var(--c-border)] hover:border-[var(--c-primary)]/50"
                          }`}
                        >
                          <div className="relative w-full pb-[56.25%]">
                            <Image
                              src={image}
                              alt={`${product.nombre} - imagen ${index + 1}`}
                              fill
                              className="object-contain p-1"
                              sizes="(max-width: 768px) 25vw, 12.5vw"
                            />
                          </div>
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
                      <h1 className="text-3xl md:text-4xl font-bold text-[var(--c-text)]">{product.nombre}</h1>
                      <Badge 
                        variant="secondary" 
                        className="border-[var(--c-border)] bg-[color:color-mix(in srgb,var(--c-primary) 20%,transparent)] text-[var(--c-text)]"
                      >
                        {product.categoria}
                      </Badge>
                    </div>
                    
                    <p className="text-lg text-[var(--c-text)]/80 leading-relaxed">
                      {product.descripcion_corta}
                    </p>
                  </div>

                  {/* Price and Demo */}
                  <div className="flex items-center justify-between p-6 bg-[var(--c-primary)]/10 rounded-xl border border-[var(--c-border)]">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-[var(--c-text)]">{formatPrice()}</span>
                      {product.demo_url && (
                        <Button
                          asChild
                          className="bg-[var(--c-secondary)] text-[var(--c-bg)] hover:bg-[var(--c-primary)] focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                        >
                          <a
                            href={product.demo_url}
                            target="_blank"
                            rel="noopener"
                            className="flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver demo
                          </a>
                        </Button>
                      )}
                    </div>
                    <Button
                      onClick={handleWhatsAppClick}
                      className="bg-[var(--c-primary)] text-[var(--c-bg)] hover:shadow-[0_0_24px_var(--c-accent)] focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Cotizar por WhatsApp
                    </Button>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--c-text)]">Características principales</h3>
                    <div className="grid gap-3">
                      {product.caracteristicas.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-[var(--c-bg)]/50 rounded-lg border border-[var(--c-border)]"
                        >
                          <Check className="w-5 h-5 text-[var(--c-primary)] mt-0.5 flex-shrink-0" />
                          <span className="text-[var(--c-text)]">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Gallery */}
                  {product.imagenesAdicionales.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[var(--c-text)]">Galería adicional</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {product.imagenesAdicionales.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-full rounded-lg overflow-hidden bg-[var(--c-primary)]/10 border border-[var(--c-border)]"
                          >
                            <div className="relative w-full pb-[56.25%]">
                              <Image
                                src={image}
                                alt={`${product.nombre} - galería ${index + 1}`}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            </div>
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
                    <div className="bg-[var(--c-primary)]/10 rounded-xl p-6 border border-[var(--c-border)]">
                      <h4 className="text-lg font-semibold mb-3 text-[var(--c-text)]">¿Interesado en este producto?</h4>
                      <p className="text-[var(--c-text)]/80 mb-4">
                        Contáctanos por WhatsApp para obtener más información, cotización personalizada o demostración.
                      </p>
                      <div className="flex gap-4">
                        <Button
                          onClick={handleWhatsAppClick}
                          className="w-full bg-[var(--c-primary)] text-[var(--c-bg)] hover:shadow-[0_0_24px_var(--c-accent)] focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Contactar ahora
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </main>
        </CategorySkin>
        
        <ExoFooter />

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
            className="bg-[var(--c-primary)] text-[var(--c-bg)] hover:shadow-[0_0_24px_var(--c-accent)] shadow-lg rounded-full px-6 py-3 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al catálogo
          </Button>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}