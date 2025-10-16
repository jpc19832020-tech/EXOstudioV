import { ProductCard, ProductDetail, CURRENCY_SYMBOLS } from '@/types/product';

export class ApiClient {
  private static instance: ApiClient;
  private productsCache: ProductCard[] | null = null;
  private productDetailsCache: Map<string, ProductDetail> = new Map();

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async getProducts(): Promise<ProductCard[]> {
    if (this.productsCache) {
      return this.productsCache;
    }

    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      this.productsCache = this.processProductsToCards(data.products);
      return this.productsCache;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    if (this.productDetailsCache.has(slug)) {
      return this.productDetailsCache.get(slug)!;
    }

    try {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      const productDetail = this.processProductToDetail(data.product);
      this.productDetailsCache.set(slug, productDetail);
      return productDetail;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  getCategories(): string[] {
    if (!this.productsCache) {
      return [];
    }
    const categories = new Set(this.productsCache.map(p => p.categoria));
    return Array.from(categories).filter(Boolean);
  }

  generateWhatsAppURL(productName: string, ctaMessage: string): string {
    const message = encodeURIComponent(ctaMessage);
    return `https://wa.me/51925475680?text=${message}`;
  }

  private processProductsToCards(products: any[]): ProductCard[] {
    return products.map(product => {
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

  private processProductToDetail(product: any): ProductDetail {
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

  private formatPrice(precio: number | null, moneda: string): string {
    if (precio === null || isNaN(precio)) {
      return "Cotizar";
    }

    const symbol = CURRENCY_SYMBOLS[moneda] || '';
    return `${symbol} ${precio.toFixed(2)}`;
  }

  clearCache(): void {
    this.productsCache = null;
    this.productDetailsCache.clear();
  }
}

export const apiClient = ApiClient.getInstance();