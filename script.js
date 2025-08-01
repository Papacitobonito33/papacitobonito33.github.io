// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Cerrar menú al cambiar orientación o redimensionar ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Cerrar menú al cambiar orientación en móviles
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }, 100);
        });
    }
});

// Efecto de scroll en el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Mejora para el botón de WhatsApp en móviles
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        // Añadir efecto táctil en móviles
        whatsappButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        whatsappButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1.1)';
        });
    }
});

// Función para optimizar el rendimiento en móviles
function optimizeForMobile() {
    // Detectar si es un dispositivo móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reducir animaciones en dispositivos móviles para mejor rendimiento
        const animatedElements = document.querySelectorAll('.service-card, .contact-card, .social-link');
        animatedElements.forEach(element => {
            element.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        
        // Optimizar el scroll en móviles
        let ticking = false;
        function updateHeader() {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                } else {
                    header.style.backgroundColor = '#ffffff';
                }
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }
}

// Ejecutar optimizaciones al cargar y al redimensionar
document.addEventListener('DOMContentLoaded', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Prevenir zoom accidental en inputs en iOS
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Asegurar que el font-size sea al menos 16px para evitar zoom en iOS
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
    });
});

// Mejorar la experiencia táctil en elementos interactivos
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.nav-link, .cta-button, .social-link, button');
    
    interactiveElements.forEach(element => {
        // Añadir feedback táctil
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.opacity = '1';
        });
    });
});

// Función para manejar la orientación de la pantalla
function handleOrientationChange() {
    // Cerrar menú móvil si está abierto
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Recalcular alturas si es necesario
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
    }, 500);
}

// Escuchar cambios de orientación
window.addEventListener('orientationchange', handleOrientationChange);

// Lazy loading para imágenes (si las hay)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
});