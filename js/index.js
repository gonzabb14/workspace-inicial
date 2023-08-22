document.addEventListener("DOMContentLoaded", function(){

    const usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
    } else {
        //alert("logueado");
        let barraNavegacion = document.getElementsByClassName("navbar navbar-expand-lg navbar-dark bg-dark p-1");
        let usuarioLogin = document.createElement("a");
        usuarioLogin.classList = "userlogged";
        usuarioLogin.href = "my-profile.html"
        usuarioLogin.innerHTML = localStorage.usuario;
        barraNavegacion[0].appendChild(usuarioLogin);
    
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    
});

