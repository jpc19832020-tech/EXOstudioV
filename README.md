# EXO digital studio

Tecnología que fluye contigo.

## 🚀 Descripción

EXO digital studio es una web moderna y ultrarrápida construida con Next.js 15, diseñada para ofrecer una experiencia excepcional con animaciones fluidas a 60fps y un rendimiento optimizado.

## ✨ Características

### 🎨 Diseño y UX
- **Estilo minimalista tech** con fondos oscuros y alto contraste
- **Animaciones fluidas** a 60fps con Framer Motion
- **Micro-interacciones sutiles** en todos los elementos interactivos
- **Diseño responsive** optimizado para todos los dispositivos
- **Modo dark/light** con transiciones suaves

### ⚡ Rendimiento
- **Carga sub-1s** en conexiones decentes
- **Optimización extrema** con code-splitting y lazy loading
- **Imágenes optimizadas** en formatos WebP/AVIF
- **Cache agresivo** para assets estáticos
- **SEO optimizado** con metadatos y JSON-LD

### 🛠️ Tecnología
- **Next.js 15** con App Router
- **TypeScript** para type safety
- **Tailwind CSS 4** con diseño personalizado
- **Framer Motion** para animaciones
- **shadcn/ui** components
- **next-themes** para modo dark/light

### 🛍️ Sistema de Productos
- **CSV-based**: Gestión de productos mediante archivo CSV
- **Build automático**: GitHub Actions para despliegue
- **Validaciones**: Verificación automática de datos e imágenes
- **WhatsApp integration**: Contacto directo con clientes
- **Responsive design**: Tarjetas y páginas de detalle optimizadas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal con SEO
│   ├── page.tsx            # Página home
│   └── globals.css         # Estilos globales y tema
├── components/
│   ├── exo-header.tsx      # Header fijo con navegación
│   ├── exo-hero.tsx        # Hero con animaciones
│   ├── exo-presentation.tsx # Sección quiénes somos
│   ├── exo-products.tsx    # Catálogo de productos
│   ├── exo-contact.tsx     # Formulario de contacto
│   ├── exo-footer.tsx      # Footer con redes sociales
│   ├── whatsapp-float.tsx  # Botón flotante WhatsApp
│   └── seo-json-ld.tsx     # JSON-LD para SEO
└── ui/                     # Componentes shadcn/ui
```

## 🎨 Paleta de Colores

### Dark Theme (Default)
- **Background**: `oklch(0.07 0.01 240)` - Azul petróleo oscuro
- **Foreground**: `oklch(0.95 0.01 240)` - Texto claro
- **Primary**: `oklch(0.75 0.15 200)` - Cian brillante
- **Muted**: `oklch(0.12 0.01 240)` - Gris oscuro sutil

### Light Theme
- **Background**: `oklch(0.98 0.01 240)` - Blanco casi puro
- **Foreground**: `oklch(0.07 0.01 240)` - Texto oscuro
- **Primary**: `oklch(0.55 0.20 200)` - Cian más intenso

## 🚀 Animaciones

### Hero Section (1.2s total)
- **Logo**: Stroke-reveal animation con glow
- **Título**: Fade-up (40px → 0) con tracking animation
- **Botones**: Pop-in escalonado (100ms delay)
- **Partículas**: Movimiento parallax sutil

### Micro-interacciones
- **Hover**: Transform scale 1.05 con shadow suave
- **Click**: Scale 0.95 con feedback táctil
- **Navigation**: Underline slide (200ms)
- **Cards**: Levitación 4px al hover

## 📱 Contacto y Redes Sociales

- **WhatsApp**: https://wa.me/51925475680
- **Email**: hola@exo.digital
- **Instagram**: https://www.instagram.com/exo_digitalstudio/
- **TikTok**: https://www.tiktok.com/@exodigital_studio?_t=ZS-90UlvsZVMMm&_r=1
- **Facebook**: https://www.facebook.com/profile.php?id=61581476738289

## 🎯 SEO y Metadatos

### Open Graph
- **Título**: EXO digital studio | Tecnología que fluye
- **Descripción**: Creamos productos digitales elegantes y veloces para diferenciar tu marca.
- **Imagen**: /og-image.jpg (1440x720)

### JSON-LD Schema
- Organization schema con datos de contacto
- Enlaces a redes sociales
- Información de ubicación

## ⚡ Optimizaciones de Rendimiento

### Imágenes
- **Formatos**: WebP/AVIF con fallback
- **Lazy loading**: Todas las imágenes no críticas
- **Responsive**: srcset y sizes optimizados
- **Compression**: Balance calidad/tamaño

### Código
- **Code splitting**: Automático por ruta
- **Tree shaking**: Eliminación de código muerto
- **Minificación**: CSS y JS
- **Preload**: Fuentes críticas WOFF2

### Cache
- **Static assets**: 1 año (immutable)
- **Fonts**: 1 año (immutable)
- **API responses**: Configurable por endpoint

## 🌐 Deployment

### Variables de Entorno
```bash
NEXT_PUBLIC_SITE_URL=https://exo.digital
NEXT_PUBLIC_WHATSAPP_NUMBER=51925475680
NEXT_PUBLIC_EMAIL=hola@exo.digital
```

### Build Commands
```bash
# Development
npm run dev

# Build para producción
npm run build

# Start producción
npm start

# Lint
npm run lint
```

## 📊 Métricas Objetivo

### Lighthouse
- **Performance**: 95+
- **Best Practices**: 95+
- **SEO**: 95+
- **Accessibility**: 95+

### Core Web Vitals
- **LCP**: < 1.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🔄 Flujo de Usuario

1. **Impacto inicial**: Hero con animaciones fluidas
2. **Navegación**: Header sticky con smooth scroll
3. **Descubrimiento**: Secciones con scroll animations
4. **Conversión**: Múltiples puntos de contacto (WhatsApp, email, formulario)
5. **Retención**: Botón WhatsApp flotante siempre visible

## 🛍️ Gestión de Productos

### Cómo Agregar Productos
1. **Editar CSV**: Modifica [`data/products.csv`](data/products.csv) con la información del producto
2. **Agregar imágenes**: Coloca las imágenes en [`Imagenes_de_productos/`](Imagenes_de_productos/)
3. **Push automático**: El build se activa automáticamente y publica los cambios

### Estructura del CSV
```csv
nombre;slug;categoria;descripcion_corta;caracteristicas;precio;moneda;imagenes;estado;cta_whatsapp
```

### URLs Generadas
- **Listado**: `/productos/`
- **Detalle**: `/productos/p/{slug}/`

📖 **Documentación completa**: [README_PRODUCTS.md](README_PRODUCTS.md)

## �️ Seguridad

- **Headers**: XSS Protection, Frame Options, Content Type nosniff
- **HTTPS**: Forzado en producción
- **CSP**: Política de contenido segura
- **Input validation**: Sanitización en formularios

## 📈 Roadmap Futuro

### Próximas Features
- [ ] Blog/updates para SEO
- [ ] Testimonios de clientes
- [ ] Métricas de rendimiento (+99 Lighthouse)
- [ ] Comparador de planes para productos
- [ ] Subdominios para productos (nombre.exo.digital)

### Mejoras Técnicas
- [ ] PWA con service worker
- [ ] Analytics con privacy-first
- [ ] A/B testing framework
- [ ] CDN global

---

**EXO digital studio** - Tecnología que fluye contigo.

Construido con ❤️ y mucha tecnología.