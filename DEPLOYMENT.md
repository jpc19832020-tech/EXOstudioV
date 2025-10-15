# Despliegue en GitHub Pages

Tu proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions con un pipeline de CI/CD completo.

## 🚀 Configuración realizada

1. **Next.js configurado para exportación estática**
   - Archivo `next.config.ts` modificado con `output: 'export'`
   - Imágenes configuradas como `unoptimized: true`
   - Base path configurado para `/EXOstudioV`

2. **Workflows de GitHub Actions implementados**
   - `.github/workflows/ci-cd.yml`: Pipeline principal de CI/CD con pruebas, linting, seguridad y despliegue
   - `.github/workflows/dependency-update.yml`: Actualización automática de dependencias
   - `.github/workflows/deploy-pages.yml`: Workflow legacy de despliegue

3. **Scripts de build agregados**
   - Script `build:static` agregado a `package.json`

4. **Configuración de calidad y seguridad**
   - Integración con ESLint y TypeScript
   - Pruebas automatizadas con cobertura de código
   - Auditoría de seguridad con Snyk
   - Análisis de rendimiento con Lighthouse CI
   - Notificaciones de despliegue en Slack

## 📋 Pasos para desplegar

### 1. Subir tu código a GitHub

Si aún no tienes un repositorio:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/EXOstudioV.git
git push -u origin main
```

### 2. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en `Settings` (Configuración)
3. En el menú izquierdo, haz clic en `Pages`
4. En `Source`, selecciona `GitHub Actions`

### 3. Activar GitHub Actions

1. Ve a la pestaña `Actions` en tu repositorio
2. Si es la primera vez, haz clic en `I understand my workflows, go ahead and enable them`

## 🔄 Flujo de despliegue automático

### Desarrollo (rama `develop`)
1. Al hacer push a `develop`, se ejecuta el pipeline de CI
2. Se verifican el código, se ejecutan pruebas y se construye la aplicación
3. Se despliega a un entorno de staging en GitHub Pages

### Producción (rama `main`)
1. Al hacer merge/push a `main`, se ejecuta el pipeline completo
2. Se verifican el código, se ejecutan pruebas y análisis de seguridad
3. Se construye la aplicación con optimizaciones
4. Se despliega a producción en GitHub Pages
5. Se ejecuta una auditoría de Lighthouse
6. Se envían notificaciones del resultado

## 🌐 Acceder a tu sitio

Una vez completado el despliegue, tu sitio estará disponible en:
```
https://tu-usuario.github.io/EXOstudioV
```

## ⚠️ Limitaciones importantes

### Funcionalidades no disponibles en GitHub Pages

1. **Socket.IO**: Las funcionalidades de websocket no funcionarán
2. **API Routes**: Las rutas de API que requieren servidor no funcionarán
3. **Base de datos (Prisma)**: No se puede conectar a una base de datos directamente
4. **Server-side rendering**: Solo funciona el contenido estático

### Alternativas recomendadas

Si necesitas estas funcionalidades, considera usar:

- **Vercel**: Perfecto para Next.js con todas las funcionalidades
- **Netlify**: Soporta funciones serverless
- **Railway**: Soporta bases de datos y backend completo

## 🔧 Personalización

### Cambiar el nombre del repositorio

Si cambias el nombre del repositorio, actualiza estas líneas en `next.config.ts`:

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/nuevo-nombre' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/nuevo-nombre' : '',
```

### Dominio personalizado

1. En `Settings > Pages`, configura tu dominio personalizado
2. Actualiza el `metadataBase` en `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'),
  // ... resto del metadata
};
```

## 🐛 Solución de problemas

### Error 404 en rutas

Asegúrate de que `trailingSlash: true` esté configurado en `next.config.ts`.

### Imágenes no cargan

Verifica que `images: { unoptimized: true }` esté configurado y que las rutas de las imágenes sean relativas.

### Build falla

Revisa los logs de GitHub Actions en la pestaña `Actions` de tu repositorio.

## 📊 Estado actual

✅ Configuración estática completada
✅ GitHub Actions configurado
✅ Build local exitoso
✅ Pipeline de CI/CD implementado
✅ Pruebas automatizadas configuradas
✅ Análisis de seguridad implementado
✅ Auditoría de rendimiento configurada
✅ Actualización automática de dependencias
✅ Listo para desplegar

Tu proyecto está listo para ser desplegado en GitHub Pages con un pipeline completo de CI/CD. Haz push a tu repositorio y el despliegue se realizará automáticamente con todas las verificaciones de calidad.

## 📖 Documentación adicional

Para más detalles sobre los workflows, consulta [`.github/workflows/README.md`](.github/workflows/README.md) donde encontrarás:

- Explicación detallada de cada workflow
- Configuración de secrets necesarios
- Guía de solución de problemas
- Personalización del pipeline