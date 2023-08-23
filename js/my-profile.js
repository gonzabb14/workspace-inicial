const usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';

if (usuarioLogueado){
    let barraNavegacion = document.getElementsByClassName("navbar navbar-expand-lg navbar-dark bg-dark p-1");
    let usuarioLogin = document.createElement("a");
    usuarioLogin.classList = "userlogged";
    usuarioLogin.href = "my-profile.html"
    usuarioLogin.innerHTML = JSON.parse(localStorage.getItem("registroUsuario")).email;
    barraNavegacion[0].appendChild(usuarioLogin);

    let user = JSON.parse(localStorage.getItem("registroUsuario"));

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");
    nombre.innerHTML = "Nombre: " +user.nombre + " " + user.apellido;
    email.innerHTML = "Email: " +user.email;

    document.getElementById("borrar-usuario").addEventListener("click", function(e){
        localStorage.clear();
        location.reload(); //refresca la web así te manda al login
    })

}else {
    window.location.href = 'login.html';
}

