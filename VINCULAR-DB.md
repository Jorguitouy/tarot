# 🔧 CONFIGURACIÓN URGENTE - Vincular Base de Datos

## ⚠️ IMPORTANTE: El sitio está desplegado pero falta vincular la base de datos

**URL del sitio:** https://b4d76e0a.tarot-venezuela.pages.dev
**Panel Dashboard:** Ya está abierto en el navegador

## 📝 CREDENCIALES ACTUALIZADAS:
- **Usuario:** venezuela
- **Contraseña:** venezuela

## 🎯 PASO A PASO - Vincular Base de Datos:

### 1. En el Dashboard de Cloudflare (ya abierto):
   - Estás en: Workers & Pages → tarot-venezuela

### 2. Click en la pestaña "Settings" (Configuración)

### 3. Scroll hacia abajo hasta "Functions"

### 4. Busca la sección "D1 database bindings"

### 5. Click en "Add binding" (Agregar binding)

### 6. Configura:
   ```
   Variable name: DB
   D1 database: tarot-database
   ```

### 7. Click en "Save" (Guardar)

### 8. Scroll más abajo hasta "Environment variables"

### 9. En la pestaña "Production", click "Add variable"

### 10. Agrega la primera variable:
   ```
   Variable name: ADMIN_USERNAME
   Value: venezuela
   ```

### 11. Click "Add variable" de nuevo para la segunda:
   ```
   Variable name: ADMIN_PASSWORD
   Value: venezuela
   ```

### 12. Click "Save" (Guardar)

### 13. El sitio se redesplega automáticamente (toma ~30 segundos)

## ✅ PROBAR EL SISTEMA:

### Después de que termine el redespliegue:

1. **Ir a la landing page:**
   https://tarot-venezuela.pages.dev
   
2. **Llenar el formulario y enviarlo**

3. **Ir al panel admin:**
   https://tarot-venezuela.pages.dev/admin.html
   
4. **Login con:**
   - Usuario: `venezuela`
   - Contraseña: `venezuela`

5. **Verificar que aparece la consulta en la tabla**

## 🐛 Si aún da error:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Intenta enviar el formulario
4. Copia el error que aparece
5. Ve a la pestaña "Network"
6. Busca la petición a `/api/submit`
7. Click en ella y copia la respuesta

## 📊 Ver logs en tiempo real:

1. En el Dashboard → tarot-venezuela
2. Click en "Real-time logs"
3. Intenta enviar el formulario
4. Los logs mostrarán qué está pasando

---

## 🚨 ALTERNATIVA RÁPIDA (si lo anterior no funciona):

Puedo crear una versión del formulario que guarde en un servicio externo temporal mientras solucionamos la base de datos.

¿Quieres que haga eso o prefieres seguir con la configuración de Cloudflare?
