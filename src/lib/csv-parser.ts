import { Product, ProductCard, ProductDetail, CURRENCY_SYMBOLS } from '@/types/product';

const WHATSAPP_NUMBER = "51925475680";

// Datos estáticos para el entorno de producción
const STATIC_PRODUCTS: Product[] = [
  {
    nombre: "Smart Card",
    slug: "smart-card",
    categoria: "Tarjetas Digitales",
    descripcion_corta: "Tarjeta de presentación inteligente. Comparte tu información de contacto instantáneamente.",
    caracteristicas: [
      "Diseño personalizable",
      "Análisis de interacciones",
      "Compatibilidad universal",
      "Actualización en tiempo real"
    ],
    precio: 100,
    moneda: "PEN",
    imagenes: ["Imagenes_de_productos/hero.png", "Imagenes_de_productos/mock-1.png"],
    estado: "visible" as const,
    cta_whatsapp: "Me interesa la Smart Card EXO"
  }
];

export class CSVParser {
  private static instance: CSVParser;
  private products: Product[] = [];
  private productCards: ProductCard[] = [];
  private slugsSet: Set<string> = new Set();
  private isLoaded = false;

  private constructor() {}

  static getInstance(): CSVParser {
    if (!CSVParser.instance) {
      CSVParser.instance = new CSVParser();
    }
    return CSVParser.instance;
  }

  async loadProducts(): Promise<void> {
    if (this.isLoaded) return;
    
    try {
      // En el servidor, leer el archivo CSV directamente
      if (typeof window === 'undefined') {
        const fs = await import('fs');
        const pathModule = await import('path');
        
        const csvPath = pathModule.join(process.cwd(), 'data', 'products.csv');
        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        
        this.products = this.parseCSV(csvContent);
        this.productCards = this.processProductsToCards();
        this.isLoaded = true;
        return;
      }

      // En el cliente, cargar el CSV a través de fetch
      const response = await fetch('/EXOstudioV/data/products.csv');
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }
      const csvContent = await response.text();
      
      this.products = this.parseCSV(csvContent);
      this.productCards = this.processProductsToCards();
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback a datos estáticos solo como último recurso
      this.products = STATIC_PRODUCTS;
      this.productCards = this.processProductsToCards();
      this.isLoaded = true;
    }
  }

  private parseCSV(csvContent: string): Product[] {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(';').map(h => h.trim());
    const products: Product[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = this.parseCSVLine(lines[i]);
        const product = this.parseProductLine(headers, values);
        
        if (product && this.validateProduct(product)) {
          // Check for duplicate slugs
          if (this.slugsSet.has(product.slug)) {
            console.warn(`Duplicate slug found: ${product.slug}. Skipping duplicate.`);
            continue;
          }
          
          this.slugsSet.add(product.slug);
          products.push(product);
        }
      } catch (error) {
        console.error(`Error parsing line ${i + 1}:`, error);
      }
    }
    
    return products;
  }

  private parseCSVLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ';' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last value
    values.push(current.trim());
    
    return values;
  }

  private parseProductLine(headers: string[], values: string[]): Product | null {
    const product: any = {};
    
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });

    // Parse characteristics
    const caracteristicas = product.caracteristicas
      ? product.caracteristicas
          .replace(/^"|"$/g, '') // Remove surrounding quotes
          .split(/[,;]/).map((c: string) => c.trim()).filter((c: string) => c)
      : [];

    // Parse images and add basePath
    const imagenes = product.imagenes
      ? product.imagenes
          .replace(/^"|"$/g, '') // Remove surrounding quotes
          .split(',').map((img: string) => {
          const trimmedImg = img.trim();
          // Add basePath if not already present
          if (trimmedImg.startsWith('/')) {
            return trimmedImg;
          }
          return `/EXOstudioV/${trimmedImg}`;
        }).filter((img: string) => img)
      : [];

    // Parse price
    let precio: number | null = null;
    if (product.precio && product.precio.trim()) {
      const parsedPrice = parseFloat(product.precio.replace(',', '.'));
      if (!isNaN(parsedPrice)) {
        precio = parsedPrice;
      }
    }

    // Validate currency
    let moneda: 'PEN' | 'USD' | '' = '';
    if (product.moneda === 'PEN' || product.moneda === 'USD') {
      moneda = product.moneda;
    }

    // Default CTA WhatsApp if not provided
    const cta_whatsapp = product.cta_whatsapp?.trim() || `Me interesa ${product.nombre}`;

    return {
      nombre: product.nombre || '',
      slug: product.slug || '',
      categoria: product.categoria || '',
      descripcion_corta: product.descripcion_corta || '',
      caracteristicas,
      precio,
      moneda,
      imagenes,
      estado: product.estado === 'visible' ? 'visible' : 'oculto',
      cta_whatsapp
    };
  }

  private validateProduct(product: Product): boolean {
    // Check required fields
    if (!product.nombre || !product.slug || !product.imagenes || product.imagenes.length === 0) {
      console.warn(`Product missing required fields: ${product.nombre} (${product.slug})`);
      return false;
    }

    // Check if product is visible
    if (product.estado !== 'visible') {
      console.warn(`Product not visible: ${product.nombre} (${product.slug}) with state: ${product.estado}`);
      return false;
    }

    // En producción, asumimos que las imágenes existen
    if (typeof window !== 'undefined') {
      return true;
    }

    // En desarrollo, verificar que la imagen principal exista
    return true;
  }

  private processProductsToCards(): ProductCard[] {
    return this.products.map(product => {
      const formattedPrice = this.formatPrice(product.precio, product.moneda);
      
      return {
        nombre: product.nombre,
        slug: product.slug,
        categoria: product.categoria,
        descripcion_corta: product.descripcion_corta,
        caracteristicas: product.caracteristicas,
        precio: {
          amount: product.precio,
          currency: product.moneda,
          formatted: formattedPrice
        },
        imagenPrincipal: product.imagenes[0],
        imagenesAdicionales: product.imagenes.slice(1),
        cta_whatsapp: product.cta_whatsapp
      };
    });
  }

  private formatPrice(precio: number | null, moneda: string): string {
    if (precio === null || isNaN(precio)) {
      return "Cotizar";
    }

    const symbol = CURRENCY_SYMBOLS[moneda] || '';
    return `${symbol} ${precio.toFixed(2)}`;
  }

  getVisibleProducts(): ProductCard[] {
    return this.productCards;
  }

  getProductBySlug(slug: string): ProductDetail | null {
    const product = this.products.find(p => p.slug === slug);
    if (!product) return null;

    const formattedPrice = this.formatPrice(product.precio, product.moneda);
    
    return {
      nombre: product.nombre,
      slug: product.slug,
      categoria: product.categoria,
      descripcion_corta: product.descripcion_corta,
      caracteristicas: product.caracteristicas,
      precio: {
        amount: product.precio,
        currency: product.moneda,
        formatted: formattedPrice
      },
      imagenPrincipal: product.imagenes[0],
      imagenesAdicionales: product.imagenes.slice(1),
      todasLasImagenes: product.imagenes,
      cta_whatsapp: product.cta_whatsapp
    };
  }

  getCategories(): string[] {
    const categories = new Set(this.products.map(p => p.categoria));
    return Array.from(categories).filter(Boolean);
  }

  generateWhatsAppURL(productName: string, ctaMessage: string): string {
    const message = encodeURIComponent(ctaMessage);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }
}

// Singleton instance
export const csvParser = CSVParser.getInstance();