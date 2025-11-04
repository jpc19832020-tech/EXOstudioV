import { ProductDetail as ProductDetailType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import { Metadata } from "next";

// Generar parámetros estáticos para el build
export async function generateStaticParams() {
  try {
    await csvParser.loadProducts();
    const products = csvParser.getVisibleProducts();
    
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback a producto por defecto
    return [
      { slug: "logo-esencial" }
    ];
  }
}

// Metadatos estáticos
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    await csvParser.loadProducts();
    const product = csvParser.getProductBySlug(resolvedParams.slug);
    
    if (!product) {
      return {
        title: "Producto no encontrado | EXOstudioV",
        description: "El producto que buscas no existe o no está disponible."
      };
    }

    // Special metadata for logo-esencial
    if (resolvedParams.slug === "logo-esencial") {
      return {
        title: "Logo Esencial | EXOstudioV",
        description: "Logo profesional listo para web e impresión. Propuestas, revisiones y archivos listos para usar.",
        openGraph: {
          title: "Logo Esencial - Diseño Profesional",
          description: "Logo profesional listo para web e impresión. Propuestas, revisiones y archivos listos para usar.",
          images: product.todasLasImagenes.map(img => ({
            url: img,
            alt: `Logo Esencial - EXOstudioV`
          }))
        },
        twitter: {
          card: "summary_large_image"
        }
      };
    }

    // Default metadata for other products
    return {
      title: `${product.nombre} | EXOstudioV`,
      description: product.descripcion_corta,
      openGraph: {
        title: product.nombre,
        description: product.descripcion_corta,
        images: product.todasLasImagenes.map(img => ({
          url: img,
          alt: `${product.nombre} - EXOstudioV`
        }))
      }
    };
  } catch (error) {
    return {
      title: "Producto | EXOstudioV",
      description: "Producto de EXOstudioV"
    };
  }
}

// Componente principal - usa client-innovador para logo-esencial, default para otros
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Si es logo-esencial, usar el nuevo componente
  if (resolvedParams.slug === "logo-esencial") {
    const LogoEsencialClient = (await import('./product-detail-client-innovador')).default;
    return <LogoEsencialClient slug={resolvedParams.slug} />;
  }
  
  // Para otros productos, usar el componente existente
  const ProductDetailClient = (await import('./product-detail-client')).default;
  return <ProductDetailClient slug={resolvedParams.slug} />;
}