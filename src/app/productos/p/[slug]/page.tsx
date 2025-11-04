import { ProductDetail as ProductDetailType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import ProductDetailClient from "./product-detail-client-innovador";

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
      { slug: "smart-card" }
    ];
  }
}

// Metadatos estáticos
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProductDetailClient slug={resolvedParams.slug} />;
}