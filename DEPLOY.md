# 🚀 Despliegue Rápido - Instrucciones

## ✅ Estado Actual

✓ Base de datos D1 creada: `tarot-database`
✓ ID: `b85548ef-048f-45eb-bd83-91d97a2ca21f`
✓ Schema ejecutado exitosamente
✓ Código subido a GitHub

## 🎯 Paso Final: Desplegar a Cloudflare Pages

### Opción 1: Desde Cloudflare Dashboard (RECOMENDADO)

1. **Ve a:** https://dash.cloudflare.com/
2. **Click en:** "Workers & Pages"
3. **Click en:** "Create Application" → "Pages" → "Connect to Git"
4. **Selecciona:** `Jorguitouy/tarot`
5. **Configura:**
   - Project name: `tarot-venezuela`
   - Production branch: `main`
   - Build command: (dejar vacío)
   - Build output directory: `/`
6. **Click:** "Save and Deploy"

### Después del despliegue:

#### A. Vincular la Base de Datos
1. En tu proyecto → **Settings** → **Functions**
2. **D1 database bindings** → "Add binding"
3. Variable name: `DB`
4. D1 database: `tarot-database`
5. Save

#### B. Configurar Variables de Entorno
1. **Settings** → **Environment variables**
2. **Production** → "Add variable":
   - Variable name: `ADMIN_USERNAME`
   - Value: `admin` (o el que prefieras)
3. "Add variable":
   - Variable name: `ADMIN_PASSWORD`
   - Value: `tarot2025` (CÁMBIALO por uno seguro)
4. Save

### Opción 2: Usando Wrangler CLI

```powershell
# En PowerShell, ejecuta:
wrangler pages deploy . --project-name tarot-venezuela
```

Luego sigue los pasos A y B de arriba para vincular DB y variables.

## 🔐 Credenciales por Defecto

**Panel Admin:**
- Usuario: `admin`
- Contraseña: `tarot2025`

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción

## 📱 URLs de tu Sitio

Una vez desplegado:
- **Landing Page:** `https://tarot-venezuela.pages.dev`
- **Panel Admin:** `https://tarot-venezuela.pages.dev/admin.html`

## 🧪 Probar el Sistema

### 1. Probar el Formulario
1. Abre: `https://tarot-venezuela.pages.dev`
2. Llena el formulario
3. Envía

### 2. Ver en el Panel Admin
1. Abre: `https://tarot-venezuela.pages.dev/admin.html`
2. Login con: `admin` / `tarot2025`
3. Verás la consulta en la tabla

## ✨ Características

### Landing Page
- ✅ Diseño optimizado para conversión
- ✅ Formulario completo
- ✅ Textos persuasivos
- ✅ Responsive
- ✅ Listo para Facebook Pixel

### Panel Admin
- ✅ Login seguro
- ✅ Ver todas las consultas
- ✅ Filtros y búsqueda
- ✅ Marcar como atendido
- ✅ Eliminar consultas
- ✅ Estadísticas en tiempo real
- ✅ Auto-refresh cada 30s

### Base de Datos
- ✅ D1 (SQLite) en Cloudflare
- ✅ Almacena: nombre, email, teléfono, fecha nacimiento, área consulta, pregunta
- ✅ Estados: pendiente/atendido
- ✅ Notas del admin

## 🔧 Comandos Útiles

### Ver consultas en la base de datos:
```powershell
wrangler d1 execute tarot-database --remote --command="SELECT * FROM consultas"
```

### Contar consultas:
```powershell
wrangler d1 execute tarot-database --remote --command="SELECT COUNT(*) as total FROM consultas"
```

### Ver solo pendientes:
```powershell
wrangler d1 execute tarot-database --remote --command="SELECT * FROM consultas WHERE atendido = 0"
```

## 📊 Monitoreo

En Cloudflare Dashboard:
1. Workers & Pages → `tarot-venezuela`
2. **Analytics:** Ver métricas de uso
3. **Logs:** Ver logs en tiempo real

## 🆘 Problemas Comunes

### "Database not found"
→ Verifica que vinculaste la DB en Pages Settings → Functions

### "No autorizado" en el admin
→ Verifica las variables de entorno en Pages Settings

### Los datos no se guardan
→ Revisa los logs en Cloudflare Dashboard
→ Verifica la consola del navegador (F12)

## 📝 Cambiar Credenciales

### En Cloudflare Dashboard:
1. Tu proyecto → Settings → Environment variables
2. Edit `ADMIN_USERNAME` y `ADMIN_PASSWORD`
3. Save
4. Redeploy (el sitio se redesplega automáticamente)

### Localmente (wrangler.toml):
Solo para testing local, NO uses esto en producción

## 🔄 Actualizar el Sistema

Cada vez que hagas cambios en el código:

```powershell
git add .
git commit -m "Descripción del cambio"
git push origin main
```

Cloudflare Pages se redesplega automáticamente.

## 📖 Documentación Completa

Ver: `SETUP.md` para instrucciones detalladas.

---

## ¡Todo Listo! 🎉

Tu sistema está completamente configurado y listo para:
1. ✅ Recibir consultas desde el formulario
2. ✅ Almacenarlas en la base de datos
3. ✅ Gestionarlas desde el panel admin

**Siguiente paso:** Desplegar a Cloudflare Pages siguiendo las instrucciones arriba.

¿Dudas? Revisa `SETUP.md` o los comentarios en el código.

¡Éxito con tus campañas de Facebook Ads! 🔮✨
