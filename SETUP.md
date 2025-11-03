# 🚀 Guía de Configuración Completa - Sistema con Base de Datos

Esta guía te llevará paso a paso para configurar el sistema completo con base de datos D1 de Cloudflare.

## 📋 Prerequisitos

- Cuenta de Cloudflare (gratuita)
- Wrangler CLI instalado (ya lo tienes según veo `wrangler login`)
- Repositorio GitHub conectado

## 🗄️ Paso 1: Crear la Base de Datos D1

Ejecuta estos comandos en tu terminal (PowerShell):

```powershell
# Asegúrate de estar en el directorio del proyecto
cd "C:\Users\jorge\Desktop\Tarot Venezuela"

# Crear la base de datos D1
wrangler d1 create tarot-database
```

**Importante:** El comando anterior te devolverá un `database_id`. Copia ese ID.

### Actualizar wrangler.toml

Abre el archivo `wrangler.toml` y pega el `database_id` que obtuviste:

```toml
[[d1_databases]]
binding = "DB"
database_name = "tarot-database"
database_id = "TU_DATABASE_ID_AQUI"  # Reemplaza con el ID que obtuviste
```

## 📊 Paso 2: Inicializar el Schema de la Base de Datos

Ejecuta el schema SQL para crear las tablas:

```powershell
# Ejecutar el schema localmente
wrangler d1 execute tarot-database --local --file=schema.sql

# Ejecutar el schema en producción
wrangler d1 execute tarot-database --remote --file=schema.sql
```

## 🔐 Paso 3: Configurar Credenciales de Admin

Las credenciales por defecto son:
- **Usuario:** `admin`
- **Contraseña:** `tarot2025`

### Para cambiar las credenciales:

**Opción A: Editar wrangler.toml (local/testing)**
```toml
[vars]
ADMIN_USERNAME = "tu_usuario"
ADMIN_PASSWORD = "tu_contraseña_segura"
```

**Opción B: Usar Cloudflare Dashboard (producción - RECOMENDADO)**

1. Ve a tu Worker en Cloudflare Dashboard
2. Settings → Variables and Secrets
3. Agrega estas variables de entorno:
   - `ADMIN_USERNAME`: tu usuario
   - `ADMIN_PASSWORD`: tu contraseña

> ⚠️ **Importante:** Para producción, usa contraseñas seguras y considera usar Secrets en lugar de vars.

## 🚀 Paso 4: Desplegar a Cloudflare Pages

### Opción A: Usando Wrangler CLI

```powershell
# Publicar el Worker con la base de datos
wrangler pages deploy . --project-name tarot-venezuela
```

### Opción B: Desde Cloudflare Dashboard

1. Ve a https://dash.cloudflare.com/
2. Click en "Workers & Pages"
3. Click en "Create Application" → "Pages" → "Connect to Git"
4. Selecciona tu repositorio `Jorguitouy/tarot`
5. Configura:
   - **Project name:** `tarot-venezuela`
   - **Production branch:** `main`
   - **Build command:** (dejar vacío)
   - **Build output directory:** `/`
6. Click "Save and Deploy"

### Vincular la Base de Datos D1 con Pages

Después del despliegue:

1. Ve a tu proyecto en Cloudflare Pages
2. Settings → Functions → D1 database bindings
3. Add binding:
   - **Variable name:** `DB`
   - **D1 database:** Selecciona `tarot-database`
4. Save

### Agregar Variables de Entorno en Pages

1. Settings → Environment variables
2. Production → Add variable:
   - `ADMIN_USERNAME`: tu_usuario
   - `ADMIN_PASSWORD`: tu_contraseña
3. Save

## 📱 Paso 5: Probar el Sistema

### Probar el Formulario

1. Ve a tu sitio: `https://tarot-venezuela.pages.dev`
2. Llena el formulario de contacto
3. Envía el formulario

### Acceder al Panel de Administración

1. Ve a: `https://tarot-venezuela.pages.dev/admin.html`
2. Ingresa con tus credenciales
3. Verás las consultas en la tabla

## 🔧 Desarrollo Local (Opcional)

Para probar localmente antes de desplegar:

```powershell
# Iniciar servidor de desarrollo
wrangler pages dev . --d1 DB=tarot-database

# En otro terminal, puedes insertar datos de prueba
wrangler d1 execute tarot-database --local --command="INSERT INTO consultas (nombre, email, fecha_nacimiento, area_consulta, timestamp) VALUES ('Test User', 'test@example.com', '1990-01-01', 'amor', '2025-11-02T12:00:00Z')"
```

Luego abre: `http://localhost:8788`

## 📊 Estructura de la Base de Datos

La tabla `consultas` almacena:
- `id` - ID único autoincremental
- `nombre` - Nombre completo del consultante
- `email` - Email de contacto
- `telefono` - WhatsApp (opcional)
- `fecha_nacimiento` - Fecha de nacimiento
- `area_consulta` - Área (amor, dinero, salud, familia, futuro, otro)
- `pregunta` - Pregunta específica (opcional)
- `timestamp` - Marca de tiempo ISO
- `atendido` - 0=Pendiente, 1=Atendido
- `notas_admin` - Notas del administrador
- `created_at` - Fecha de creación automática

## 🔍 Comandos Útiles

### Ver datos en la base de datos:
```powershell
# Ver todas las consultas (local)
wrangler d1 execute tarot-database --local --command="SELECT * FROM consultas"

# Ver todas las consultas (producción)
wrangler d1 execute tarot-database --remote --command="SELECT * FROM consultas"

# Contar consultas
wrangler d1 execute tarot-database --remote --command="SELECT COUNT(*) as total FROM consultas"

# Ver solo pendientes
wrangler d1 execute tarot-database --remote --command="SELECT * FROM consultas WHERE atendido = 0"
```

### Limpiar datos de prueba:
```powershell
# ⚠️ CUIDADO: Esto elimina TODAS las consultas
wrangler d1 execute tarot-database --local --command="DELETE FROM consultas"
```

## 🎨 Personalización del Panel Admin

El panel admin (`admin.html`) incluye:

✅ **Login seguro** con credenciales configurables
✅ **Tabla responsiva** con todas las consultas
✅ **Filtros** por nombre, email, estado y área
✅ **Estadísticas** en tiempo real
✅ **Acciones:**
   - Ver detalles completos
   - Marcar como atendido
   - Eliminar consulta
✅ **Auto-refresh** cada 30 segundos

## 🔒 Seguridad

### Recomendaciones:

1. **Cambiar credenciales por defecto** inmediatamente
2. **Usar contraseñas fuertes** (mínimo 12 caracteres)
3. **Considerar implementar:**
   - JWT tokens en lugar de Basic Auth
   - Rate limiting en el API
   - CAPTCHA en el formulario
   - 2FA para admin

### Para mejorar seguridad con Secrets:

```powershell
# Crear secrets (más seguro que vars)
wrangler pages secret put ADMIN_USERNAME
# Ingresa el valor cuando te lo pida

wrangler pages secret put ADMIN_PASSWORD
# Ingresa el valor cuando te lo pida
```

## 📈 Monitoreo

### En Cloudflare Dashboard:

1. Workers & Pages → Tu proyecto
2. Analytics → Métricas de uso
3. Logs → Ver logs en tiempo real

### Habilitar logs detallados:

En `functions/api.js`, los errores ya se registran con `console.error()`.

## 🆘 Solución de Problemas

### Error: "Database not found"
- Verifica que el `database_id` en `wrangler.toml` sea correcto
- Asegúrate de haber vinculado la DB en Pages Settings

### Error: "No autorizado" al acceder al admin
- Verifica que las variables de entorno estén configuradas
- Revisa que el token se esté guardando en localStorage

### Los datos no se guardan
- Revisa la consola del navegador (F12)
- Verifica los logs en Cloudflare Dashboard
- Confirma que el schema SQL se ejecutó correctamente

### CORS errors
- El API ya tiene CORS configurado para `*`
- Si usas un dominio custom, actualiza en `functions/api.js`

## 🎯 Próximos Pasos

Después de configurar todo:

1. ✅ Prueba el formulario desde diferentes dispositivos
2. ✅ Verifica que los datos lleguen al panel admin
3. ✅ Configura Facebook Pixel en `index.html`
4. ✅ Crea tu campaña de Facebook Ads
5. ✅ Monitorea las conversiones

## 📞 URLs Importantes

- **Landing Page:** `https://tarot-venezuela.pages.dev`
- **Panel Admin:** `https://tarot-venezuela.pages.dev/admin.html`
- **API Base:** `https://tarot-venezuela.pages.dev/api`
- **Cloudflare Dashboard:** https://dash.cloudflare.com/

## 🔄 Actualizar el Sistema

Cuando hagas cambios:

```powershell
# 1. Hacer cambios en el código
# 2. Commit y push a GitHub
git add .
git commit -m "Descripción de los cambios"
git push origin main

# 3. Cloudflare Pages se desplegará automáticamente
```

Si cambiaste el schema de la base de datos:
```powershell
wrangler d1 execute tarot-database --remote --file=schema.sql
```

---

## ✨ Características del Sistema

### Landing Page (`index.html`)
- ✅ Diseño persuasivo optimizado para conversión
- ✅ Formulario de contacto completo
- ✅ Integración con Facebook Pixel
- ✅ Responsive y rápido

### API Backend (`functions/api.js`)
- ✅ Guardar consultas en D1
- ✅ Login de administrador
- ✅ CRUD completo de consultas
- ✅ Autenticación con tokens

### Panel Admin (`admin.html`)
- ✅ Login seguro
- ✅ Dashboard con estadísticas
- ✅ Tabla con filtros y búsqueda
- ✅ Ver detalles, editar y eliminar
- ✅ Auto-refresh

¡Todo listo para recibir y gestionar tus consultas de tarot! 🔮✨
