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
                // Para el producto 1, asegurar que no baje de 10
                if (productNumber === "1" && parseInt(buttonValue) < 10) {
                    quantityInput.value = 10;
                    console.log('🔢 Cantidad ajustada a mínimo 10 para producto 1');
                }
                // Para el producto 2, asegurar que no baje de 20
                else if (productNumber === "2" && parseInt(buttonValue) < 20) {
                    quantityInput.value = 20;
                    console.log('🔢 Cantidad ajustada a mínimo 20 para producto 2');
                } else {
                    quantityInput.value = buttonValue;
                }
                console.log('🔢 Quantity changed to:', quantityInput.value, 'for product:', productNumber);
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
            const productNumber = this.getAttribute('data-product');
            const value = parseInt(this.value) || 0;
            
            console.log('📊 Quantity input changed manually:', value, 'Product:', productNumber);
            
            // Obtener el número de producto de este input
            // Remover clase active de todos los botones de tamaño DE LA MISMA SECCIÓN
            document.querySelectorAll(`.size-btn[data-product="${productNumber}"]`).forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Validar botón de comprar para producto 1
            if (productNumber === "1") {
                const comprarBtn = document.querySelector(`.add-to-cart-btn[data-product="1"]`);
                
                if (value < 10) {
                    comprarBtn.disabled = true;
                    comprarBtn.textContent = "MÍNIMO 10 UNIDADES";
                    comprarBtn.style.opacity = "0.5";
                    comprarBtn.style.cursor = "not-allowed";
                    console.log('❌ Botón de comprar desactivado - mínimo 10 unidades');
                } else {
                    comprarBtn.disabled = false;
                    comprarBtn.textContent = "COMPRAR";
                    comprarBtn.style.opacity = "1";
                    comprarBtn.style.cursor = "pointer";
                    console.log('✅ Botón de comprar activado');
                }
            }
            // Validar botón de comprar para producto 2
            else if (productNumber === "2") {
                const comprarBtn = document.querySelector(`.add-to-cart-btn[data-product="2"]`);
                
                if (value < 20) {
                    comprarBtn.disabled = true;
                    comprarBtn.textContent = "MÍNIMO 20 UNIDADES";
                    comprarBtn.style.opacity = "0.5";
                    comprarBtn.style.cursor = "not-allowed";
                    console.log('❌ Botón de comprar desactivado - mínimo 20 unidades');
                } else {
                    comprarBtn.disabled = false;
                    comprarBtn.textContent = "COMPRAR";
                    comprarBtn.style.opacity = "1";
                    comprarBtn.style.cursor = "pointer";
                    console.log('✅ Botón de comprar activado');
                }
            }
            
            console.log('📊 Size buttons deactivated for product:', productNumber);
        });
    });

    // ========================================
    // VALIDACIÓN INICIAL PARA BOTONES DE COMPRAR
    // ========================================
    console.log('🔍 Validando configuración inicial de botones...');
    
    // Validar botón de comprar del producto 1 al cargar
    const comprarBtn1 = document.querySelector('.add-to-cart-btn[data-product="1"]');
    const quantityInput1 = document.querySelector('.quantity-input[data-product="1"]');
    
    if (comprarBtn1 && quantityInput1) {
        const initialValue = parseInt(quantityInput1.value);
        if (initialValue < 10) {
            comprarBtn1.disabled = true;
            comprarBtn1.textContent = "MÍNIMO 10 UNIDADES";
            comprarBtn1.style.opacity = "0.5";
            comprarBtn1.style.cursor = "not-allowed";
            console.log('❌ Botón de comprar producto 1 desactivado inicialmente');
        } else {
            comprarBtn1.disabled = false;
            comprarBtn1.textContent = "COMPRAR";
            comprarBtn1.style.opacity = "1";
            comprarBtn1.style.cursor = "pointer";
            console.log('✅ Botón de comprar producto 1 activado inicialmente');
        }
    }
    
    // Validar botón de comprar del producto 2 al cargar
    const comprarBtn2 = document.querySelector('.add-to-cart-btn[data-product="2"]');
    const quantityInput2 = document.querySelector('.quantity-input[data-product="2"]');
    
    if (comprarBtn2 && quantityInput2) {
        const initialValue = parseInt(quantityInput2.value);
        if (initialValue < 20) {
            comprarBtn2.disabled = true;
            comprarBtn2.textContent = "MÍNIMO 20 UNIDADES";
            comprarBtn2.style.opacity = "0.5";
            comprarBtn2.style.cursor = "not-allowed";
            console.log('❌ Botón de comprar producto 2 desactivado inicialmente');
        } else {
            comprarBtn2.disabled = false;
            comprarBtn2.textContent = "COMPRAR";
            comprarBtn2.style.opacity = "1";
            comprarBtn2.style.cursor = "pointer";
            console.log('✅ Botón de comprar producto 2 activado inicialmente');
        }
    }

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
                
                // Validación adicional para producto 1
                if (productId === "1") {
                    const quantityInput = document.querySelector(`.quantity-input[data-product="1"]`);
                    const cantidad = parseInt(quantityInput.value);
                    
                    if (cantidad < 10) {
                        alert('⚠️ El mínimo de compra para este producto es 10 unidades');
                        console.log('❌ Compra bloqueada - cantidad insuficiente');
                        return;
                    }
                }
                // Validación adicional para producto 2
                else if (productId === "2") {
                    const quantityInput = document.querySelector(`.quantity-input[data-product="2"]`);
                    const cantidad = parseInt(quantityInput.value);
                    
                    if (cantidad < 20) {
                        alert('⚠️ El mínimo de compra para este producto es 20 unidades');
                        console.log('❌ Compra bloqueada - cantidad insuficiente');
                        return;
                    }
                }
                
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
    
    // ========================================
    // CONTADOR DE VISITAS GLOBAL CON FIREBASE
    // ========================================
    console.log('👥 Configurando contador de visitas global...');
    
    // Función para actualizar el display del contador
    function updateVisitorDisplay(count) {
        const visitorCountElement = document.getElementById('visitor-count');
        if (visitorCountElement) {
            visitorCountElement.textContent = count.toLocaleString('es-CL');
            console.log('👥 Contador de visitas actualizado:', count);
        } else {
            console.error('❌ Elemento contador de visitas no encontrado');
        }
    }
    
    // Función para incrementar el contador global
    function incrementGlobalVisitorCount() {
        const visitorRef = database.ref('visitorCount');
        
        // Incrementar el contador en Firebase
        visitorRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        }, (error, committed, snapshot) => {
            if (error) {
                console.error('❌ Error al incrementar contador:', error);
                // Fallback: mostrar contador local si Firebase falla
                const localCount = localStorage.getItem('visitorCount') || 0;
                updateVisitorDisplay(parseInt(localCount) + 1);
            } else if (committed) {
                console.log('✅ Contador global incrementado correctamente');
                // Actualizar display con el nuevo valor
                updateVisitorDisplay(snapshot.val());
            }
        });
    }
    
    // Función para obtener el contador actual
    function getCurrentVisitorCount() {
        const visitorRef = database.ref('visitorCount');
        
        visitorRef.once('value')
            .then((snapshot) => {
                const count = snapshot.val() || 0;
                updateVisitorDisplay(count);
                console.log('👥 Contador actual cargado:', count);
            })
            .catch((error) => {
                console.error('❌ Error al cargar contador:', error);
                // Fallback: mostrar contador local
                const localCount = localStorage.getItem('visitorCount') || 0;
                updateVisitorDisplay(parseInt(localCount));
            });
    }
    
    // Escuchar cambios en tiempo real
    function listenToVisitorCount() {
        const visitorRef = database.ref('visitorCount');
        
        visitorRef.on('value', (snapshot) => {
            const count = snapshot.val() || 0;
            updateVisitorDisplay(count);
            console.log('👥 Contador actualizado en tiempo real:', count);
        });
    }
    
    // Inicializar contador global
    try {
        // Escuchar cambios en tiempo real
        listenToVisitorCount();
        
        // Incrementar contador global
        incrementGlobalVisitorCount();
        
        console.log('✅ Contador de visitas global configurado correctamente');
    } catch (error) {
        console.error('❌ Error al configurar Firebase:', error);
        // Fallback: usar contador local
        const localCount = parseInt(localStorage.getItem('visitorCount') || 0) + 1;
        localStorage.setItem('visitorCount', localCount.toString());
        updateVisitorDisplay(localCount);
        console.log('🔄 Usando contador local como fallback');
    }
});