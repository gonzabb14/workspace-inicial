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
document.addEventListener("DOMContentLoaded", function () {
    const submenus = document.querySelectorAll(".submenu");

    // Ocultar todos los submenús inicialmente
    submenus.forEach(function (submenu) {
        submenu.style.display = "none";

        // Agregar eventos mouseenter y mouseleave para mostrar/ocultar submenús
        submenu.addEventListener("mouseenter", function () {
            submenu.style.display = "block";
        });

        submenu.addEventListener("mouseleave", function () {
            submenu.style.display = "none";
        });
    });

    // Agregar eventos mouseenter y mouseleave para mostrar/ocultar submenús en los enlaces
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (navItem) {
        const submenu = navItem.querySelector(".submenu");
        if (submenu) {
            navItem.addEventListener("mouseenter", function () {
                submenu.style.display = "block";
            });

            navItem.addEventListener("mouseleave", function () {
                submenu.style.display = "none";
            });
        }
    });
});


