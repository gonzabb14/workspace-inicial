document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-fondo");
    
    // Ralentizar la reproducción al 50% de la velocidad normal
    video.playbackRate = 0.5;
    
    // Detener el video después de 1 minuto (60 segundos)
    setTimeout(function () {
        video.pause();
    }, 60000); // 60000 milisegundos = 60 segundos
    
    // Reiniciar el video después de 2 minutos (120 segundos)
    setTimeout(function () {
        video.currentTime = 0; // Reiniciar el video al principio
        video.play(); // Iniciar la reproducción nuevamente
    }, 120000); // 120000 milisegundos = 120 segundos
});
