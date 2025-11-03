// Smooth scrolling para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación del contador de cupos
function animateCounter() {
    const spotsElement = document.getElementById('spots-left');
    if (!spotsElement) return;
    
    const min = 15;
    const max = 35;
    
    setInterval(() => {
        const currentValue = parseInt(spotsElement.textContent);
        const newValue = Math.max(min, currentValue - Math.floor(Math.random() * 2));
        spotsElement.textContent = newValue;
    }, 30000); // Reduce cada 30 segundos
}

// Manejo del formulario
document.getElementById('tarot-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fechaNacimiento: document.getElementById('fecha-nacimiento').value,
        consulta: document.getElementById('consulta').value,
        pregunta: document.getElementById('pregunta').value,
        timestamp: new Date().toISOString()
    };
    
    // Cambiar estado del botón
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = '⏳ Enviando...';
    submitButton.disabled = true;
    
    try {
        // Enviar datos a la API
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Ocultar formulario y mostrar mensaje de éxito
            document.getElementById('tarot-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            
            // Scroll al mensaje de éxito
            document.getElementById('success-message').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Tracking para Facebook Pixel (agregar tu pixel ID)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Lectura de Tarot Gratuita',
                    content_category: 'Tarot',
                    value: 0,
                    currency: 'USD'
                });
            }
            
            // Google Analytics tracking (si lo usas)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'event_category': 'Form',
                    'event_label': 'Tarot Gratuito'
                });
            }
        } else {
            throw new Error(data.error || 'Error al enviar el formulario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las secciones
document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Inicializar contador
animateCounter();

// Validación mejorada del formulario
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#F56565';
        this.setCustomValidity('Por favor ingresa un correo válido');
    } else {
        this.style.borderColor = '#48BB78';
        this.setCustomValidity('');
    }
});

// Validación de teléfono (formato venezolano)
document.getElementById('telefono').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.startsWith('58')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+58' + value.substring(1);
        }
        this.value = value;
    }
});

// Añadir efecto de partículas en el hero (opcional, ligero)
function createStars() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        hero.appendChild(star);
    }
}

// CSS para el efecto de twinkle
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Crear estrellas decorativas
createStars();

// Prevenir spam del formulario
let formSubmitted = false;
document.getElementById('tarot-form').addEventListener('submit', function(e) {
    if (formSubmitted) {
        e.preventDefault();
        return false;
    }
    formSubmitted = true;
});

console.log('🔮 Landing Page de Tarot Venezuela cargada exitosamente');