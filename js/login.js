const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const eye = document.querySelector("#togglePassword");

// inputPassword.addEventListener("keypress", () => {
//   inputPassword.type = "text";

//   setTimeout(() => {
//     inputPassword.type = "password";
//   }, 10);
// });

eye.addEventListener("click", () => {
  if (inputPassword.type === "password" && eye.className === "fas fa-eye") {
    inputPassword.type = "text";
    eye.className = "fas fa-eye-slash";
  } else {
    inputPassword.type = "password";
    eye.className = "fas fa-eye";
  }
});

// Validacion
// const formulario = document.querySelector("#formulario");

// formulario.addEventListener("submit", (e) => {
//   function validarFormulario() {
//     var email = document.querySelector("#email").value;
//     var password = document.querySelector("#password").value;

//     if (!isValidEmail(email)) {
//       alert("Por favor ingrese un correo electrónico válido.");
//       return false;
//     }

//     if (!isValidPassword(password)) {
//       alert("La contraseña debe tener al menos 8 caracteres.");
//       return false;
//     }

//     return true;
//   }

//   function isValidEmail(email) {
//     // Utiliza una expresión regular para validar el formato del correo electrónico.
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   function isValidPassword(password) {
//     // Verifica que la contraseña tenga al menos 8 caracteres.
//     return password.length >= 8;
//   }
//   validarFormulario();
// });

// let usuarioAutenticado = false;

// function verificarAutenticacion() {
//   if (!usuarioAutenticado) {
//     window.location.href = "login.html";
//   }
// }

// verificarAutenticacion();
