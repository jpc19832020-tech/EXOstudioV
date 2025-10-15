# GitHub Actions Workflows

Este proyecto incluye varios workflows automatizados para garantizar la calidad del código, el despliegue continuo y el mantenimiento de dependencias.

## 📁 Archivos de Workflow

### 1. `ci-cd.yml` - Pipeline Principal de CI/CD

Este es el workflow principal que maneja todo el proceso de integración continua y despliegue continuo.

#### 🔄 Eventos que lo activan:
- Push a las ramas `main` y `develop`
- Pull Requests hacia la rama `main`
- Ejecución manual desde la pestaña Actions

#### 🏗️ Jobs incluidos:

1. **lint**: Verificación del código con ESLint y TypeScript
2. **test**: Ejecución de pruebas y generación de reportes de cobertura
3. **build**: Construcción de la aplicación y análisis de bundle
4. **security**: Análisis de seguridad y auditoría de dependencias
5. **deploy-staging**: Despliegue a entorno de staging (rama develop)
6. **deploy-production**: Despliegue a producción (rama main)
7. **lighthouse**: Auditoría de rendimiento y accesibilidad
8. **notify**: Notificaciones de estado del despliegue

#### ⚡ Características clave:
- **Caché inteligente**: Acelera las construcciones con caché de Node.js y Next.js
- **Análisis de bundle**: Identifica oportunidades de optimización
- **Pruebas automatizadas**: Ejecuta pruebas en cada commit
- **Despliegue multi-entorno**: Staging para develop, producción para main
- **Auditoría de rendimiento**: Lighthouse CI para garantizar la calidad
- **Notificaciones**: Alertas en Slack sobre el estado de los despliegues

### 2. `dependency-update.yml` - Actualización Automática de Dependencias

Este workflow se encarga de mantener las dependencias del proyecto actualizadas.

#### 🔄 Eventos que lo activan:
- Programación: Todos los lunes a las 9:00 AM UTC
- Ejecución manual

#### 🏗️ Jobs incluidos:

1. **update-dependencies**: Actualiza paquetes y crea Pull Requests

#### ⚡ Características clave:
- **Actualización semanal**: Mantiene las dependencias al día
- **Pruebas automáticas**: Verifica que las actualizaciones no rompan nada
- **Pull Requests automatizados**: Crea PRs con los cambios propuestos
- **Seguridad primero**: Solo actualiza a versiones compatibles y seguras

### 3. `deploy-pages.yml` - Despliegue a GitHub Pages (Legacy)

Este es el workflow original de despliegue que ha sido reemplazado por `ci-cd.yml`.

## 🔧 Configuración Requerida

### Secrets del Repositorio

Para un funcionamiento completo, configura estos secrets en tu repositorio:

1. **`CODECOV_TOKEN`**: Para subir reportes de cobertura de código a Codecov
2. **`SNYK_TOKEN`**: Para análisis de seguridad con Snyk
3. **`SLACK_WEBHOOK_URL`**: Para notificaciones en Slack

### Configuración de Entornos

#### Entorno de Producción (GitHub Pages)
1. Ve a `Settings > Pages`
2. Selecciona `GitHub Actions` como fuente

#### Entorno de Staging (Opcional)
Si necesitas un entorno de staging separado:
1. Ve a `Settings > Environments`
2. Crea un nuevo entorno llamado `staging-environment`
3. Configura las reglas de protección necesarias

## 🚀 Flujo de Trabajo

### Desarrollo en la rama `develop`
1. Los cambios se despliegan automáticamente al entorno de staging
2. Se ejecutan todas las pruebas y verificaciones
3. Se genera un reporte de cobertura de código

### Despliegue a Producción
1. Al hacer merge a `main`, se activa el pipeline completo
2. Se ejecutan pruebas de seguridad adicionales
3. Se despliega a GitHub Pages
4. Se realiza una auditoría de Lighthouse
5. Se notifica el resultado del despliegue

## 📊 Métricas y Reportes

### Reportes Generados
- **Cobertura de código**: Subido a Codecov
- **Análisis de seguridad**: Auditoría con Snyk
- **Auditoría de rendimiento**: Reportes de Lighthouse
- **Análisis de bundle**: Identificación de optimizaciones

### Notificaciones
- **Éxito**: Notificación en Slack con detalles del despliegue
- **Fallo**: Alerta inmediata con información del error

## 🛠️ Personalización

### Modificar el Workflow Principal

Para ajustar el workflow principal:

1. Edita `.github/workflows/ci-cd.yml`
2. Modifica los jobs según necesites
3. Ajusta las condiciones de despliegue

### Cambiar Horario de Actualización

Para modificar cuándo se ejecuta la actualización de dependencias:

1. Edita el campo `cron` en `.github/workflows/dependency-update.yml`
2. Usa [crontab.guru](https://crontab.guru) para generar la expresión correcta

### Agregar Nuevas Verificaciones

Para agregar nuevos pasos al pipeline:

1. Añade un nuevo job en `ci-cd.yml`
2. Configura las dependencias con `needs`
3. Define las condiciones de ejecución con `if`

## 🐛 Solución de Problemas

### Build Falla
1. Revisa los logs en la pestaña Actions
2. Verifica que todas las dependencias estén instaladas
3. Comprueba que no haya errores de TypeScript

### Tests Fallan
1. Ejecuta los tests localmente con `npm test`
2. Verifica que el entorno de prueba esté configurado correctamente
3. Revisa los mocks y fixtures

### Despliegue Falla
1. Verifica la configuración de GitHub Pages
2. Comprueba que los permisos del workflow sean correctos
3. Revisa que el build genere los archivos en `./out`

### Lighthouse Falla
1. Verifica que el sitio esté accesible públicamente
2. Revisa la configuración en `.lighthouserc.json`
3. Ajusta los umbrales de rendimiento según sea necesario

## 📚 Recursos Adicionales

- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Guía de Next.js para GitHub Pages](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Documentación de Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Guía de Codecov](https://docs.codecov.com/docs)

---

Para cualquier pregunta o problema con los workflows, abre un issue en el repositorio o contacta al equipo de desarrollo.