export interface Product {
  nombre: string;
  slug: string;
  categoria: string;
  descripcion_corta: string;
  caracteristicas: string[];
  precio: number | null;
  moneda: 'PEN' | 'USD' | '';
  imagenes: string[];
  estado: 'visible' | 'oculto';
  cta_whatsapp: string;
  // Nuevas propiedades:
  precio_desde?: boolean;   // default: false
  demo_url?: string | null; // default: null
  mostrar_ver_detalles?: boolean; // default: true
  mostrar_ver_demo?: boolean;     // default: false
}

export interface ProductCard {
  nombre: string;
  slug: string;
  categoria: string;
  descripcion_corta: string;
  caracteristicas: string[];
  precio: {
    amount: number | null;
    currency: string;
    formatted: string;
  };
  imagenPrincipal: string;
  imagenesAdicionales: string[];
  cta_whatsapp: string;
  // Nuevas propiedades:
  precio_desde?: boolean;
  demo_url?: string | null;
  mostrar_ver_detalles?: boolean; // default: true
  mostrar_ver_demo?: boolean;     // default: false
}

export interface ProductDetail extends ProductCard {
  caracteristicas: string[];
  todasLasImagenes: string[];
  // Nuevas propiedades ya incluidas en ProductCard
}

export type CurrencySymbol = {
  [key: string]: string;
};

export const CURRENCY_SYMBOLS: CurrencySymbol = {
  'PEN': 'S/',
  'USD': 'US$',
};