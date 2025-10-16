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
}

export interface ProductDetail extends ProductCard {
  caracteristicas: string[];
  todasLasImagenes: string[];
}

export type CurrencySymbol = {
  [key: string]: string;
};

export const CURRENCY_SYMBOLS: CurrencySymbol = {
  'PEN': 'S/',
  'USD': 'US$',
};