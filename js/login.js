document.getElementById("recuperarContraseña").classList.add("displayOff");
document.getElementById("register").classList.add("displayOff");
//document.getElementById("inisio-de-sesion").classList.remove("displayOff")

const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const eye = document.querySelector("#togglePassword");

eye.addEventListener("click", () => {
  if (inputPassword.type === "password" && eye.className === "fas fa-eye") {
    inputPassword.type = "text";
    eye.className = "fas fa-eye-slash";
  } else {
    inputPassword.type = "password";
    eye.className = "fas fa-eye";
  }
});

document.getElementById('formulario').addEventListener('submit', function(e){
  const email = document.getElementById('email');
  const password = document.getElementById('password');
    localStorage.setItem("usuario", email.value);
    localStorage.setItem('usuarioLogueado', 'true');
    window.location.href = 'index.html';
});

document.getElementById("btnRecuperar").addEventListener("click", function(e){
  e.preventDefault(); // hace que la web no se resetee porque el btnRecuperar es una etiqueta del tipo a, tiene href.
  document.getElementById("recuperarContraseña").classList.remove("displayOff");
  document.getElementById("inicio-de-sesion").classList.add("displayOff");
})

document.getElementById("recuperar").addEventListener("click", function(e){
  if (document.getElementsByName("email").requiered){
  document.getElementById("recuperarContraseña").classList.add("displayOff");
  document.getElementById("inicio-de-sesion").classList.remove("displayOff");}
})

document.getElementById("btnRegistro").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("register").classList.remove("displayOff");
  document.getElementById("inicio-de-sesion").classList.add("displayOff");
})