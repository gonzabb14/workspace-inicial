document.addEventListener("DOMContentLoaded", function(){
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

////////////////////////////////////////////////////////////////////VALIDACION DE USUARIOS //////////////////////////////////////////////////////////////////////////////////////


const userToken = localStorage.getItem('userToken');

if (!userToken) {

  const loginForm = document.querySelector('#Formulario');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const temporaryToken = 'temporary123';
    localStorage.setItem('userToken', temporaryToken);
    window.location.href = 'index.html';
  });

} else {
  window.location.href = 'index.html';
}