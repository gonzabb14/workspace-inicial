if (usuarioLogueado) {
    let user = JSON.parse(localStorage.getItem("registroUsuario"));

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");
    nombre.innerHTML = "Nombre: " + user.nombre + " " + user.apellido;
    email.innerHTML = "Email: " + user.email;

    document.getElementById("cerrar-sesion").addEventListener("click", function (e) {
        localStorage.clear();
        location.reload(); //refresca la web así te manda al login
    })

} else {
    window.location.href = 'login.html';
}

