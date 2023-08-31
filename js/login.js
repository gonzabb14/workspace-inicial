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
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const user = JSON.parse(localStorage.getItem("registroUsuario")); 

  if (user) {
    if (email === user.email && password === user.contraseña) {
      localStorage.setItem("usuarioLogueado", 'true');
      window.location.href = 'index.html';
    } else if (user.email === email){
      alert("Contraseña incorrecta");
    } else {
      alert("Usuario no registrado");
    }
  } else {
    alert("Usuario no registrado");
  }

});

//botón ¿No recuerdas tu contraseña?
document.getElementById("btnRecuperar").addEventListener("click", function(e){
  e.preventDefault(); // hace que la web no se resetee porque el btnRecuperar es una etiqueta del tipo a, tiene href.
  document.getElementById("recuperarContraseña").classList.remove("displayOff");
  document.getElementById("inicio-de-sesion").classList.add("displayOff");
});

//botón recuperar (dentro de ¿No recuerdas tu contraseña?)
document.getElementById("formulario-recuperar").addEventListener("click", function(e){
  if (document.getElementsByName("email").requiered){
  document.getElementById("recuperarContraseña").classList.add("displayOff");
  document.getElementById("inicio-de-sesion").classList.remove("displayOff");}
});

//botón Registrarse
document.getElementById("btnRegistro").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("register").classList.remove("displayOff");
  document.getElementById("inicio-de-sesion").classList.add("displayOff");
});

document.getElementById("registro").addEventListener("click", function(e){
  let nombre = document.getElementsByName("usuario-nombre")[0].value;
  let apellido = document.getElementsByName("usuario-apellido")[0].value;
  let email = document.getElementsByName("usuario-email")[0].value;
  let repetirEmail = document.getElementsByName("usuario-repetirEmail")[0].value;
  let contraseña = document.getElementsByName("usuario-contraseña")[0].value;
  let repetirContraseña = document.getElementsByName("usuario-repetirContraseña")[0].value;

  if (email === repetirEmail){
    if (contraseña === repetirContraseña){

      let user = {
        "nombre"    : nombre,
        "apellido"  : apellido,
        "email"     : email,
        "contraseña": contraseña
      }

      localStorage.setItem("registroUsuario", JSON.stringify(user));

    } else {
      alert("La contraseña no es igual");
      e.preventDefault();
    }
  } else {
    alert("El correo electrónico no es igual");
    e.preventDefault();
  }

});