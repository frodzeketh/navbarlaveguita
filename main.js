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