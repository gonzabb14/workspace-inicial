
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
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if ( email === 'example@example.com' && password ===  'password' ){
    localStorage.setItem('usuarioLogueado', 'true');
    window.location.href = 'index.html';
  } else {
    alert('Credenciales incorrectas')
}
});