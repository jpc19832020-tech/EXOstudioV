import { ProductDetail } from '@/types/product';

export const validateProduct = (product: any): product is ProductDetail => {
  if (!product || typeof product !== 'object') {
    return false;
  }

  // Validar campos requeridos
  const requiredFields = [
    'nombre',
    'slug',
    'categoria',
    'descripcion_corta',
    'caracteristicas',
    'precio',
    'imagenPrincipal',
    'todasLasImagenes',
    'cta_whatsapp'
  ];

  for (const field of requiredFields) {
    if (!(field in product)) {
      console.warn(`Producto inválido: falta campo requerido '${field}'`);
      return false;
    }
  }

  // Validar tipos de datos
  if (typeof product.nombre !== 'string' || product.nombre.trim() === '') {
    console.warn('Producto inválido: nombre debe ser string no vacío');
    return false;
  }

  if (typeof product.slug !== 'string' || product.slug.trim() === '') {
    console.warn('Producto inválido: slug debe ser string no vacío');
    return false;
  }

  if (typeof product.categoria !== 'string' || product.categoria.trim() === '') {
    console.warn('Producto inválido: categoria debe ser string no vacío');
    return false;
  }

  if (typeof product.descripcion_corta !== 'string') {
    console.warn('Producto inválido: descripcion_corta debe ser string');
    return false;
  }

  if (!Array.isArray(product.caracteristicas)) {
    console.warn('Producto inválido: caracteristicas debe ser array');
    return false;
  }

  if (typeof product.precio !== 'object' || product.precio === null) {
    console.warn('Producto inválido: precio debe ser objeto');
    return false;
  }

  if (typeof product.imagenPrincipal !== 'string' || product.imagenPrincipal.trim() === '') {
    console.warn('Producto inválido: imagenPrincipal debe ser string no vacío');
    return false;
  }

  if (!Array.isArray(product.todasLasImagenes)) {
    console.warn('Producto inválido: todasLasImagenes debe ser array');
    return false;
  }

  if (typeof product.cta_whatsapp !== 'string') {
    console.warn('Producto inválido: cta_whatsapp debe ser string');
    return false;
  }

  return true;
};

export const sanitizeProductData = (product: any): Partial<ProductDetail> => {
  if (!product) return {};

  return {
    nombre: typeof product.nombre === 'string' ? product.nombre.trim() : '',
    slug: typeof product.slug === 'string' ? product.slug.trim() : '',
    categoria: typeof product.categoria === 'string' ? product.categoria.trim() : '',
    descripcion_corta: typeof product.descripcion_corta === 'string' ? product.descripcion_corta : '',
    caracteristicas: Array.isArray(product.caracteristicas) ? product.caracteristicas : [],
    precio: product.precio || { amount: null, currency: '', formatted: '' },
    imagenPrincipal: typeof product.imagenPrincipal === 'string' ? product.imagenPrincipal : '',
    todasLasImagenes: Array.isArray(product.todasLasImagenes) ? product.todasLasImagenes : [],
    cta_whatsapp: typeof product.cta_whatsapp === 'string' ? product.cta_whatsapp : ''
  };
};