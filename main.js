res.cookie('my_cookie', 'value', { 
    sameSite: 'Lax', 
    secure: true 
});

// Detectar dispositivos móviles y manejar video del header
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.header-video');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // En móviles, intentar reproducir el video
        video.play().catch(function(error) {
            console.log('Autoplay bloqueado en móvil, mostrando imagen de respaldo');
            // Si falla, ocultar video y mostrar poster
            video.style.display = 'none';
            // Crear imagen de respaldo
            const header = document.querySelector('.header');
            header.style.backgroundImage = 'url(./img/imagenmain.png)';
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
        });
    }
});

// Funcionalidad para botones de comprar con WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de productos
    const productos = {
        1: {
            nombre: "Carbón Quebracho Colorado Bolsa Premium 2.5kg",
            telefono: "56988396185"
        },
        2: {
            nombre: "Saco de Carbón Quebracho Blanco Premium 20kg", 
            telefono: "56988396185"
        }
    };

    // Agregar event listeners a todos los botones de comprar
    const botonesComprar = document.querySelectorAll('.add-to-cart-btn');
    
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            
            if (productId && productos[productId]) {
                // Obtener la cantidad seleccionada
                const quantityInput = document.querySelector(`.quantity-input[data-product="${productId}"]`);
                const cantidad = quantityInput ? quantityInput.value : 1;
                
                // Obtener datos del producto
                const producto = productos[productId];
                
                // Crear el mensaje de WhatsApp
                const mensaje = `Hola, quiero comprar ${producto.nombre}

Cantidad: ${cantidad}

Gracias`;

                // Codificar el mensaje para URL
                const mensajeCodificado = encodeURIComponent(mensaje);
                
                // Crear la URL de WhatsApp
                const urlWhatsApp = `https://wa.me/${producto.telefono}?text=${mensajeCodificado}`;
                
                // Abrir WhatsApp en una nueva ventana/tab
                window.open(urlWhatsApp, '_blank');
            }
        });
    });
});