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
  
  // Check if it's a Logo product for special treatment
  const isLogoProduct = product.categoria === "Branding" || product.nombre.toLowerCase().includes("logo");
  
  // Innovative logo design messages
  const logoMessages = [
    "Transformamos ideas en iconos poderosos",
    "Donde la creatividad encuentra propósito",
    "El primer paso hacia la grandeza",
    "Tu identidad visual hecha arte",
    "Diseño que trasciende el tiempo"
  ];

  const selectedMessage = logoMessages[Math.floor(Math.random() * logoMessages.length)];

  if (isLogoProduct) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 z-0">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-magenta/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-tr from-cyan/10 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{
                backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px), linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
          </div>
          
          <ExoHeader />
          
          <main className="flex-1 pt-20 relative z-10">
            <div className="container mx-auto px-6 py-12 max-w-7xl">
              
              {/* Innovative Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-center mb-20 relative"
              >
                {/* Floating elements */}
                <motion.div
                  className="absolute top-0 left-1/2 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-10 left-10 w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-20 w-3 h-3 bg-magenta rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-cyan/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-magenta/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </motion.div>
                
                <motion.h1 
                  className="text-6xl md:text-8xl font-black mb-8 tracking-tight relative z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 0 20px rgba(0, 191, 255, 0.3)'
                  }}
                >
                  {/* Animated text background */}
                  <div className="absolute inset-0 -z-10">
                    <div className="h-full w-full bg-gradient-to-r from-cyan via-magenta to-cyan bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}></div>
                  </div>
                  {product.nombre}
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed relative z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {selectedMessage}
                </motion.p>
              </motion.div>

              {/* Interactive Logo Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                
                {/* Main Logo Display with Parallax */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.5, delay: 1.0 }}
                  className="flex justify-center"
                  whileInView={{ y: [0, -20, 0] }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <div className="relative w-full max-w-2xl">
                    {/* Glass morphism container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-cyan/10 to-white/20 backdrop-blur-xl rounded-3xl border border-cyan/30 shadow-2xl">
                      <div className="relative w-full pb-[100%]">
                        <Image
                          src={currentImage}
                          alt={`${product.nombre} - diseño innovador`}
                          fill
                          className="object-contain p-12 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      
                      {/* Interactive corner indicators */}
                      <motion.div
                        className="absolute top-4 right-4 w-6 h-6 bg-cyan rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-6 h-6 bg-magenta rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ animationDelay: '0.5s' }}
                      />
                      <motion.div
                        className="absolute top-4 left-4 w-6 h-6 bg-cyan rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ animationDelay: '1s' }}
                      />
                      <motion.div
                        className="absolute bottom-4 right-4 w-6 h-6 bg-magenta rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ animationDelay: '1.5s' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Interactive Gallery */}
              {product.todasLasImagenes.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="mt-16"
                >
                  <h3 className="text-2xl font-bold mb-8 text-gray-300 text-center">Explora las posibilidades</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {product.todasLasImagenes.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="relative aspect-square bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer border-2 border-gray-200 transition-all hover:border-cyan/40"
                        onClick={() => handleImageChange(index)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95, rotate: -5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="relative w-full h-full">
                          <Image
                            src={image}
                            alt={`${product.nombre} - variación ${index + 1}`}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 25vw, 12.5vw"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              </div>

              {/* Floating Information Panel */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="space-y-12"
              >
                {/* Glass morphism features */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200 p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">Características revolucionarias</h3>
                  <div className="space-y-6">
                    {product.caracteristicas.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        className="flex items-start gap-4 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200"
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-cyan to-magenta rounded-full flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <span className="text-white font-bold text-sm">✓</span>
                        </motion.div>
                        <span className="text-gray-800 leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Interactive Process */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200 p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-magenta to-cyan bg-clip-text text-transparent">Proceso creativo</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-cyan to-magenta rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span className="text-white font-bold text-xl">1</span>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">Descubrimos tu visión</h4>
                        <p className="text-gray-600">Analizamos tus necesidades y objetivos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-magenta to-cyan rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ animationDelay: '1s' }}
                      >
                        <span className="text-white font-bold text-xl">2</span>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">Diseñamos magia</h4>
                        <p className="text-gray-600">Creamos conceptos únicos y sorprendentes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-cyan to-magenta rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ animationDelay: '2s' }}
                      >
                        <span className="text-white font-bold text-xl">3</span>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">Perfeccionamos cada detalle</h4>
                        <p className="text-gray-600">Ajustamos hasta que sea excepcional</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* Interactive CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.6 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200 p-12 shadow-2xl relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-magenta/10 to-cyan/10 opacity-30">
                    <div className="h-full w-full" style={{
                      backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 191, 255, 0.1) 0%, transparent 70%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)`,
                      backgroundSize: '100% 100%'
                    }}></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-center relative z-10">¿Lista para transformar tu marca?</h3>
                  <p className="text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                    El diseño no es solo un logo, es el inicio de una historia. 
                    Cada línea, cada color, cada forma cuenta una narrativa visual 
                    que conecta emocionalmente con tu audiencia.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Button
                      onClick={handleWhatsAppClick}
                      size="lg"
                      className="relative bg-gradient-to-r from-cyan to-magenta hover:from-cyan/90 hover:to-magenta/90 text-white font-bold px-12 py-6 text-lg shadow-2xl overflow-hidden group"
                      onMouseEnter={(e) => {
                        const button = e.currentTarget;
                        const rect = button.getBoundingClientRect();
                        const ripple = document.createElement('div');
                        ripple.className = 'absolute bg-white rounded-full animate-ping';
                        ripple.style.width = ripple.style.height = '20px';
                        ripple.style.left = `${e.clientX - rect.left - 10}px`;
                        ripple.style.top = `${e.clientY - rect.top - 10}px`;
                        button.appendChild(ripple);
                        
                        setTimeout(() => {
                          ripple.remove();
                        }, 600);
                      }}
                      onMouseLeave={(e) => {
                        const ripples = e.currentTarget.querySelectorAll('.animate-ping');
                        ripples.forEach(ripple => ripple.remove());
                      }}
                    >
                      <span className="relative z-10">Transformar mi marca ahora</span>
                      
                      {/* Particle effect on click */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                          />
                        ))}
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleBackToCatalog}
                      className="border-white/50 text-white font-bold px-12 py-6 text-lg hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 mr-3" />
                      Explorar más diseños
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
          
          <ExoFooter />
        </div>

        {/* Interactive Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={handleBackToCatalog}
            className="relative bg-gradient-to-r from-cyan to-magenta hover:from-cyan/90 hover:to-magenta/90 text-white font-bold px-6 py-3 rounded-full shadow-2xl overflow-hidden group"
            onMouseEnter={(e) => {
              const button = e.currentTarget;
              const glow = document.createElement('div');
              glow.className = 'absolute inset-0 bg-gradient-to-r from-cyan to-magenta rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10';
              button.appendChild(glow);
              
              setTimeout(() => {
                glow.remove();
              }, 300);
            }}
            onMouseLeave={(e) => {
              const glows = e.currentTarget.querySelectorAll('.group-hover .opacity-100');
              glows.forEach(glow => glow.remove());
            }}
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
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="relative w-full pb-[56.25%]">
                    <Image
                      src={currentImage}
                      alt={`${product.nombre} - vista principal`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
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
                          className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
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
                      </div>
                    ))}
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
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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