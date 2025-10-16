import { ProductCard, ProductDetail } from '@/types/product';

export class StaticDataClient {
  private static instance: StaticDataClient;
  private productsCache: ProductCard[] | null = null;
  private productDetailsCache: Map<string, ProductDetail> = new Map();

  private constructor() {}

  static getInstance(): StaticDataClient {
    if (!StaticDataClient.instance) {
      StaticDataClient.instance = new StaticDataClient();
    }
    return StaticDataClient.instance;
  }

  async getProducts(): Promise<ProductCard[]> {
    if (this.productsCache) {
      return this.productsCache;
    }

    try {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      this.productsCache = data;
      return data;
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
      const response = await fetch('/data/product-details.json');
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      const productDetail = data[slug];
      
      if (productDetail) {
        this.productDetailsCache.set(slug, productDetail);
        return productDetail;
      }
      
      return null;
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

  clearCache(): void {
    this.productsCache = null;
    this.productDetailsCache.clear();
  }
}

export const staticDataClient = StaticDataClient.getInstance();