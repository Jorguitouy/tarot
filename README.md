# 🔮 Landing Page - Tarot Venezuela

Landing page profesional para promoción de tiradas de tarot gratuitas, optimizada para Facebook Ads y Cloudflare Pages.

## 🌟 Características

- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Textos Persuasivos**: Copywriting optimizado para conversión
- **Formulario de Contacto**: Captura información de leads interesados
- **Animaciones Suaves**: Experiencia de usuario moderna y atractiva
- **Optimizado para SEO**: Meta tags y estructura semántica
- **Listo para Facebook Pixel**: Integración preparada para tracking

## 📁 Estructura del Proyecto

```
Tarot Venezuela/
│
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Funcionalidad e interactividad
└── README.md           # Este archivo
```

## 🚀 Despliegue en Cloudflare Pages

### Opción 1: Usando Git

1. Crea un repositorio en GitHub/GitLab
2. Sube estos archivos al repositorio
3. Ve a [Cloudflare Pages](https://pages.cloudflare.com/)
4. Conecta tu repositorio
5. Configura el despliegue:
   - **Build command**: (dejar vacío)
   - **Build output directory**: `/`
6. ¡Despliega!

### Opción 2: Despliegue Directo

1. Ve a [Cloudflare Pages](https://pages.cloudflare.com/)
2. Haz clic en "Create a project" → "Upload assets"
3. Arrastra los archivos `index.html`, `styles.css` y `script.js`
4. Haz clic en "Deploy site"

## 🎯 Integración con Facebook Ads

### 1. Añadir Facebook Pixel

Agrega este código antes del cierre de `</head>` en `index.html`:

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TU_PIXEL_ID_AQUI');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=TU_PIXEL_ID_AQUI&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
```

### 2. Configurar Eventos de Conversión

El formulario ya está configurado para enviar el evento `Lead` cuando se completa.

### 3. Crear tu Campaña en Facebook Ads

- **Objetivo**: Generación de Clientes Potenciales
- **Público objetivo**: Personas interesadas en:
  - Espiritualidad
  - Tarot
  - Astrología
  - Crecimiento personal
- **Ubicaciones**: Feed de Facebook e Instagram
- **Edad**: 25-55 años
- **URL de destino**: Tu URL de Cloudflare Pages

## 📊 Integración con Backend

Para conectar el formulario con un backend real, puedes usar:

### Opción 1: Cloudflare Workers + KV

### Opción 2: Google Forms (Rápido)

1. Crea un Google Form con los mismos campos
2. Usa [Google Apps Script](https://developers.google.com/apps-script) como webhook

### Opción 3: Servicios de Email

- **Formspree**: https://formspree.io/
- **EmailJS**: https://www.emailjs.com/
- **SendGrid**: https://sendgrid.com/

Ejemplo con EmailJS en `script.js`:

```javascript
// En el submit del formulario
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
```

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #6B46C1;      /* Color principal */
    --secondary-color: #9F7AEA;     /* Color secundario */
    --accent-color: #F6AD55;        /* Color de acento */
}
```

### Textos

Todos los textos están en `index.html` y son fáciles de modificar según tu marca.

### Imágenes

Para agregar imágenes de fondo o logos:
1. Sube las imágenes a tu proyecto
2. Reemplaza en CSS: `background-image: url('ruta/a/imagen.jpg')`

## 📈 Optimización para Conversión

### Tips Implementados:

✅ **Escasez**: Contador de cupos limitados
✅ **Urgencia**: "Oferta por tiempo limitado"
✅ **Prueba Social**: Testimonios de clientes
✅ **Propuesta de Valor Clara**: Beneficios específicos
✅ **CTA Visible**: Botones de llamada a la acción prominentes
✅ **Sin Fricción**: Formulario simple y directo
✅ **Confianza**: Badges de seguridad y privacidad

## 🔧 Mejoras Futuras Sugeridas

- [ ] Integrar con CRM (HubSpot, Mailchimp)
- [ ] Añadir chat en vivo (Tidio, Tawk.to)
- [ ] Sistema de reserva de horarios
- [ ] Blog de contenido sobre tarot
- [ ] Página de términos y condiciones
- [ ] Política de privacidad

## 📞 Soporte

Para soporte o consultas sobre la landing page, contáctame.

## 📄 Licencia

Este proyecto es para uso personal/comercial de Tarot Venezuela.

---

**¡Éxito con tus campañas! 🌟✨🔮**