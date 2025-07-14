// Esperar a que la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script principal cargado correctamente');
    
    // ========================================
    // FUNCIONALIDAD PARA BOTONES DE TAMAÑO
    // ========================================
    console.log('🔧 Configurando botones de tamaño...');
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('📏 Size button clicked:', this.textContent, 'Product:', this.getAttribute('data-product'));
            
            // Obtener el número de producto de este botón
            const productNumber = this.getAttribute('data-product');
            const buttonValue = this.textContent; // "10" o "20"
            
            // Remover clase active de todos los botones DE LA MISMA SECCIÓN
            document.querySelectorAll(`.size-btn[data-product="${productNumber}"]`).forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Cambiar la cantidad automáticamente
            const quantityInput = document.querySelector(`.quantity-input[data-product="${productNumber}"]`);
            if (quantityInput) {
                quantityInput.value = buttonValue;
                console.log('🔢 Quantity changed to:', buttonValue, 'for product:', productNumber);
            } else {
                console.error('❌ Quantity input not found for product:', productNumber);
            }
        });
    });

    // ========================================
    // FUNCIONALIDAD PARA MINIATURAS DE IMAGEN
    // ========================================
    console.log('🖼️ Configurando miniaturas...');
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            console.log('🖼️ Thumbnail clicked:', this.src, 'Product:', this.getAttribute('data-product'));
            
            // Obtener el número de producto de esta miniatura
            const productNumber = this.getAttribute('data-product');
            
            // Obtener la imagen principal de la MISMA sección
            const mainImage = document.querySelector(`.product-main-image[data-product="${productNumber}"]`);
            console.log('🖼️ Main image found:', mainImage);
            
            if (mainImage) {
                // Cambiar la imagen principal con la fuente de la miniatura
                mainImage.src = this.src;
                console.log('✅ Image changed to:', this.src);
                
                // Remover clase active de todas las miniaturas DE LA MISMA SECCIÓN
                document.querySelectorAll(`.thumbnail[data-product="${productNumber}"]`).forEach(t => t.classList.remove('active-thumb'));
                
                // Agregar clase active a la miniatura clickeada
                this.classList.add('active-thumb');
                console.log('✅ Active thumb set');
            } else {
                console.error('❌ Main image not found for product:', productNumber);
            }
        });
    });
    
    // ========================================
    // FUNCIONALIDAD PARA INPUTS DE CANTIDAD
    // ========================================
    console.log('📊 Configurando inputs de cantidad...');
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', function() {
            console.log('📊 Quantity input changed manually:', this.value, 'Product:', this.getAttribute('data-product'));
            
            // Obtener el número de producto de este input
            const productNumber = this.getAttribute('data-product');
            
            // Remover clase active de todos los botones de tamaño DE LA MISMA SECCIÓN
            document.querySelectorAll(`.size-btn[data-product="${productNumber}"]`).forEach(btn => {
                btn.classList.remove('active');
            });
            
            console.log('📊 Size buttons deactivated for product:', productNumber);
        });
    });

    // ========================================
    // FUNCIONALIDAD PARA BOTONES DE COMPRAR CON WHATSAPP
    // ========================================
    console.log('🛒 Configurando botones de comprar...');
    
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

    console.log('📦 Productos configurados:', productos);

    // Agregar event listeners a todos los botones de comprar
    const botonesComprar = document.querySelectorAll('.add-to-cart-btn');
    console.log('🔘 Botones de comprar encontrados:', botonesComprar.length);
    
    if (botonesComprar.length === 0) {
        console.error('❌ No se encontraron botones de comprar');
    } else {
        botonesComprar.forEach((boton, index) => {
            console.log(`🔘 Configurando botón de comprar ${index + 1}:`, boton);
            
            boton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('🖱️ ¡CLICK EN BOTÓN DE COMPRAR!');
                
                const productId = this.getAttribute('data-product');
                console.log('🆔 Product ID:', productId);
                
                if (productId && productos[productId]) {
                    // Obtener la cantidad seleccionada
                    const quantityInput = document.querySelector(`.quantity-input[data-product="${productId}"]`);
                    console.log('📊 Input encontrado:', quantityInput);
                    
                    const cantidad = quantityInput ? quantityInput.value : 1;
                    console.log('🔢 Cantidad:', cantidad);
                    
                    // Obtener datos del producto
                    const producto = productos[productId];
                    console.log('📦 Producto seleccionado:', producto);
                    
                    // Crear el mensaje de WhatsApp
                    const mensaje = `Hola, quiero comprar ${producto.nombre}

Cantidad: ${cantidad}

Gracias`;

                    console.log('💬 Mensaje creado:', mensaje);

                    // Codificar el mensaje para URL
                    const mensajeCodificado = encodeURIComponent(mensaje);
                    
                    // Crear la URL de WhatsApp
                    const urlWhatsApp = `https://wa.me/${producto.telefono}?text=${mensajeCodificado}`;
                    
                    console.log('🔗 URL de WhatsApp:', urlWhatsApp);
                    
                    // Abrir WhatsApp en una nueva ventana/tab
                    window.open(urlWhatsApp, '_blank');
                    console.log('✅ ¡WhatsApp abierto!');
                } else {
                    console.error('❌ Producto no encontrado para ID:', productId);
                }
            });
        });
    }

    // ========================================
    // DETECTAR DISPOSITIVOS MÓVILES Y MANEJAR VIDEO DEL HEADER
    // ========================================
    console.log('📱 Configurando manejo de video del header...');
    const video = document.querySelector('.header-video');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (video && isMobile) {
        // En móviles, intentar reproducir el video
        video.play().catch(function(error) {
            console.log('📱 Autoplay bloqueado en móvil, mostrando imagen de respaldo');
            // Si falla, ocultar video y mostrar poster
            video.style.display = 'none';
            // Crear imagen de respaldo
            const header = document.querySelector('.header');
            header.style.backgroundImage = 'url(./img/imagenmain.png)';
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
        });
    }

    // ========================================
    // RESUMEN DE ELEMENTOS ENCONTRADOS
    // ========================================
    console.log('📊 RESUMEN DE ELEMENTOS ENCONTRADOS:');
    console.log('🖼️ Thumbnails:', document.querySelectorAll('.thumbnail').length);
    console.log('📏 Size buttons:', document.querySelectorAll('.size-btn').length);
    console.log('📊 Quantity inputs:', document.querySelectorAll('.quantity-input').length);
    console.log('🛒 Botones de comprar:', document.querySelectorAll('.add-to-cart-btn').length);
    console.log('🚀 ¡Todo configurado correctamente!');
});