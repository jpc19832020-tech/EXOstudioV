"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProductDetail } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";

// Import all Blueprint components
import {
  LogoBlueprintLayout,
  HeroBlueprint,
  StickyInfoCard,
  PrimaryImageShowcase,
  ShowcaseGiantImages,
  MotionLogoCarousel,
  ProcessSteps,
  DeliverablesAccordion,
  BehindTheSymbol,
  MasonryGallery,
  FaqCompact,
  FinalCtaWhatsapp,
  FloatingWhatsappBar,
  LogoFooter
} from "./_components";

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFloatingBar, setShowFloatingBar] = useState<boolean>(false);

  // Refs for scroll detection
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false, margin: "-100px" });

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

  // Handle scroll to show/hide floating bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingBar(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    if (product) {
      const message = encodeURIComponent(product.cta_whatsapp);
      window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
    }
  };

  const scrollToProcess = () => {
    const element = document.getElementById('process-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <LogoBlueprintLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p>Cargando producto...</p>
          </div>
        </div>
      </LogoBlueprintLayout>
    );
  }

  if (!product) {
    return (
      <LogoBlueprintLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Producto no encontrado</h2>
            <p className="text-lg mb-6" style={{ color: '#A7B2C0' }}>
              El producto que buscas no existe o no está disponible.
            </p>
            <button
              onClick={() => router.push("/productos")}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#35B6FF',
                boxShadow: '0 0 20px rgba(53, 182, 255, 0.3)'
              }}
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </LogoBlueprintLayout>
    );
  }

  // Hero phrases for rotation
  const heroPhrases = [
    "Forma. Ritmo. Memoria.",
    "Simple hoy, icónico siempre.",
    "Diseño que construye confianza."
  ];

  return (
    <LogoBlueprintLayout>
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroBlueprint
          title="Logos que perduran"
          subtitle="Diseñamos identidades memorables con intención, claridad y propósito."
          phrases={heroPhrases}
          onPrimaryCta={handleWhatsAppClick}
        />
      </div>

      {/* Sticky Info Card - Desktop */}
      <StickyInfoCard
        name={product.nombre}
        category={product.categoria}
        shortDesc={product.descripcion_corta}
        price={product.precio}
        features={product.caracteristicas}
        image={product.imagenPrincipal}
        onWhatsapp={handleWhatsAppClick}
      />

      {/* Primary Image Showcase */}
      <PrimaryImageShowcase image={product.imagenPrincipal} />

      {/* Giant Images Showcase */}
      <ShowcaseGiantImages images={product.todasLasImagenes} />

      {/* Motion Logo Carousel */}
      <MotionLogoCarousel videos={[]} />

      {/* Process Steps */}
      <ProcessSteps />

      {/* Deliverables Accordion */}
      <DeliverablesAccordion />

      {/* Behind Symbol */}
      <BehindTheSymbol images={product.todasLasImagenes} />

      {/* Masonry Gallery */}
      <MasonryGallery images={product.todasLasImagenes} />

      {/* FAQ Compact */}
      <FaqCompact />

      {/* Final CTA */}
      <FinalCtaWhatsapp onClick={handleWhatsAppClick} />

      {/* Floating WhatsApp Bar - Mobile */}
      <FloatingWhatsappBar
        productName={product.nombre}
        onClick={handleWhatsAppClick}
        isVisible={showFloatingBar}
      />

      {/* Custom Footer */}
      <LogoFooter />
    </LogoBlueprintLayout>
  );
}