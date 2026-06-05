document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // CONFIGURACIÓN DE PRODUCTOS (fallback si Firebase no responde)
    // ========================================
    var productConfig = {
        1: {
            nombre: "Carbón Quebracho Colorado Bolsa Premium 2.5kg",
            precio: "$1.850",
            cantidadMinima: 20,
            opcionesMayor: [20, 50],
            cantidadDefault: 20,
            telefono: "56988396185"
        },
        2: {
            nombre: "Saco de Carbón Quebracho Blanco Premium 20kg",
            precio: "$20.000",
            cantidadMinima: 10,
            opcionesMayor: [10, 50],
            cantidadDefault: 10,
            telefono: "56988396185"
        }
    };

    // ========================================
    // CARGAR PRODUCTOS DESDE FIRESTORE (tiempo real)
    // ========================================
    function loadProductsFromFirebase() {
        try {
            db.collection('productos').onSnapshot(function(snapshot) {
                snapshot.forEach(function(doc) {
                    var id = doc.id;
                    var data = doc.data();
                    if (productConfig[id]) {
                        if (data.nombre) productConfig[id].nombre = data.nombre;
                        if (data.precio) productConfig[id].precio = data.precio;
                        if (data.cantidadMinima) productConfig[id].cantidadMinima = data.cantidadMinima;
                        if (data.cantidadDefault) productConfig[id].cantidadDefault = data.cantidadDefault;
                        if (data.telefono) productConfig[id].telefono = data.telefono;
                        if (data.opcionesMayor) {
                            productConfig[id].opcionesMayor = Array.isArray(data.opcionesMayor)
                                ? data.opcionesMayor
                                : Object.values(data.opcionesMayor);
                        }
                    }
                });
                applyProductConfig();
            });
        } catch (error) {
            applyProductConfig();
        }
    }

    // ========================================
    // APLICAR CONFIGURACIÓN AL DOM
    // ========================================
    function applyProductConfig() {
        Object.keys(productConfig).forEach(function(id) {
            var config = productConfig[id];
            var section = document.getElementById('product-' + id);
            if (!section) return;

            var titleEl = section.querySelector('.product-title');
            if (titleEl) titleEl.textContent = config.nombre;

            var priceEl = section.querySelector('.product-price');
            if (priceEl) {
                var precio = config.precio || '';
                if (precio && precio.charAt(0) !== '$') precio = '$' + precio;
                priceEl.textContent = precio;
            }

            var sizeContainer = section.querySelector('.size-options');
            if (sizeContainer && config.opcionesMayor) {
                sizeContainer.innerHTML = '';
                config.opcionesMayor.forEach(function(qty) {
                    var btn = document.createElement('button');
                    btn.className = 'size-btn';
                    btn.setAttribute('data-product', id);
                    btn.textContent = qty;
                    btn.addEventListener('click', function() {
                        handleSizeClick(this, id);
                    });
                    sizeContainer.appendChild(btn);
                });
            }

            var qtyInput = section.querySelector('.quantity-input');
            if (qtyInput) qtyInput.value = config.cantidadDefault;

            validateBuyButton(id);
        });
    }

    // ========================================
    // CLICK EN BOTÓN DE TAMAÑO (POR MAYOR)
    // ========================================
    function handleSizeClick(button, productId) {
        var config = productConfig[productId];
        var buttonValue = parseInt(button.textContent);

        document.querySelectorAll('.size-btn[data-product="' + productId + '"]').forEach(function(b) {
            b.classList.remove('active');
        });
        button.classList.add('active');

        var qtyInput = document.querySelector('.quantity-input[data-product="' + productId + '"]');
        if (qtyInput) {
            qtyInput.value = Math.max(buttonValue, config.cantidadMinima);
        }

        validateBuyButton(productId);
    }

    // ========================================
    // VALIDAR BOTÓN DE COMPRAR
    // ========================================
    function validateBuyButton(productId) {
        var config = productConfig[productId];
        if (!config) return;

        var qtyInput = document.querySelector('.quantity-input[data-product="' + productId + '"]');
        var buyBtn = document.querySelector('.add-to-cart-btn[data-product="' + productId + '"]');
        if (!qtyInput || !buyBtn) return;

        var value = parseInt(qtyInput.value) || 0;

        if (value < config.cantidadMinima) {
            buyBtn.disabled = true;
            buyBtn.textContent = 'MÍNIMO ' + config.cantidadMinima + ' UNIDADES';
            buyBtn.style.opacity = '0.5';
            buyBtn.style.cursor = 'not-allowed';
        } else {
            buyBtn.disabled = false;
            buyBtn.textContent = 'COMPRAR';
            buyBtn.style.opacity = '1';
            buyBtn.style.cursor = 'pointer';
        }
    }

    // ========================================
    // MINIATURAS DE IMAGEN
    // ========================================
    document.querySelectorAll('.thumbnail').forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            var productNumber = this.getAttribute('data-product');
            var mainImage = document.querySelector('.product-main-image[data-product="' + productNumber + '"]');

            if (mainImage) {
                mainImage.src = this.src;
                document.querySelectorAll('.thumbnail[data-product="' + productNumber + '"]').forEach(function(t) {
                    t.classList.remove('active-thumb');
                });
                this.classList.add('active-thumb');
            }
        });
    });

    // ========================================
    // VALIDACIÓN DE INPUTS DE CANTIDAD
    // ========================================
    document.querySelectorAll('.quantity-input').forEach(function(input) {
        input.addEventListener('input', function() {
            var productNumber = this.getAttribute('data-product');

            document.querySelectorAll('.size-btn[data-product="' + productNumber + '"]').forEach(function(btn) {
                btn.classList.remove('active');
            });

            validateBuyButton(productNumber);
        });
    });

    // ========================================
    // BOTONES DE COMPRAR (WHATSAPP)
    // ========================================
    document.querySelectorAll('.add-to-cart-btn').forEach(function(boton) {
        boton.addEventListener('click', function(event) {
            event.preventDefault();

            var productId = this.getAttribute('data-product');
            var config = productConfig[productId];
            if (!config) return;

            var qtyInput = document.querySelector('.quantity-input[data-product="' + productId + '"]');
            var cantidad = parseInt(qtyInput.value) || 0;

            if (cantidad < config.cantidadMinima) {
                alert('El mínimo de compra para este producto es ' + config.cantidadMinima + ' unidades');
                return;
            }

            var mensaje = 'Hola, quiero comprar ' + config.nombre + '\n\nCantidad: ' + cantidad + '\n\nGracias';
            var urlWhatsApp = 'https://wa.me/' + config.telefono + '?text=' + encodeURIComponent(mensaje);
            window.open(urlWhatsApp, '_blank');
        });
    });

    // ========================================
    // VIDEO DEL HEADER EN MÓVILES
    // ========================================
    var video = document.querySelector('.header-video');
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (video && isMobile) {
        video.play().catch(function() {
            video.style.display = 'none';
            var header = document.querySelector('.header');
            header.style.backgroundImage = 'url(./img/imagenmain.png)';
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
        });
    }

    // ========================================
    // CONTADOR DE VISITAS (FIRESTORE)
    // ========================================
    function updateVisitorDisplay(count) {
        var el = document.getElementById('visitor-count');
        if (el) el.textContent = count.toLocaleString('es-CL');
    }

    function initVisitorCounter() {
        try {
            var counterRef = db.collection('counters').doc('visitors');

            counterRef.onSnapshot(function(doc) {
                if (doc.exists) {
                    updateVisitorDisplay(doc.data().count || 0);
                }
            });

            counterRef.set(
                { count: firebase.firestore.FieldValue.increment(1) },
                { merge: true }
            );
        } catch (error) {
            var localCount = parseInt(localStorage.getItem('visitorCount') || 0) + 1;
            localStorage.setItem('visitorCount', localCount.toString());
            updateVisitorDisplay(localCount);
        }
    }

    // ========================================
    // INICIALIZAR
    // ========================================
    loadProductsFromFirebase();
    initVisitorCounter();
});
