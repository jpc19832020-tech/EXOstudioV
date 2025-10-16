import { Product, ProductCard, ProductDetail, CURRENCY_SYMBOLS } from '@/types/product';
import fs from 'fs';
import path from 'path';

const WHATSAPP_NUMBER = "51925475680";

export class CSVParser {
  private static instance: CSVParser;
  private products: Product[] = [];
  private productCards: ProductCard[] = [];
  private slugsSet: Set<string> = new Set();

  private constructor() {}

  static getInstance(): CSVParser {
    if (!CSVParser.instance) {
      CSVParser.instance = new CSVParser();
    }
    return CSVParser.instance;
  }

  async loadProducts(): Promise<void> {
    try {
      const csvPath = path.join(process.cwd(), 'data', 'products.csv');
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      
      this.products = this.parseCSV(csvContent);
      this.productCards = this.processProductsToCards();
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
      this.productCards = [];
    }
  }

  private parseCSV(csvContent: string): Product[] {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(';').map(h => h.trim());
    const products: Product[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(';').map(v => v.trim());
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

  private parseProductLine(headers: string[], values: string[]): Product | null {
    const product: any = {};
    
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });

    // Parse characteristics
    const caracteristicas = product.caracteristicas 
      ? product.caracteristicas.split(/[,;]/).map((c: string) => c.trim()).filter((c: string) => c)
      : [];

    // Parse images
    const imagenes = product.imagenes 
      ? product.imagenes.split(',').map((img: string) => img.trim()).filter((img: string) => img)
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
      return false;
    }

    // Check if main image exists
    const mainImagePath = path.join(process.cwd(), product.imagenes[0]);
    if (!fs.existsSync(mainImagePath)) {
      console.warn(`Main image not found: ${product.imagenes[0]} for product ${product.nombre}`);
      return false;
    }

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