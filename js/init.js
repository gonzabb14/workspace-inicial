const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';
if (!usuarioLogueado) {
    window.location.href = 'login.html';
} else {
    //alert("logueado");
    let barraNavegacion = document.getElementsByClassName("navbar navbar-expand-lg navbar-dark bg-dark p-1");
    let usuarioLogin = document.createElement("a");
    usuarioLogin.classList += "userlogged";
    // usuarioLogin.href = "my-profile.html"
    let dropdownbutton =    `<div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${JSON.parse(localStorage.getItem("registroUsuario")).email}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <div id:"modos"><label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
          </label><p class="textmode">Modo noche</p>
          </div>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" onclick="localStorage.clear();
          location.reload();">Cerrar sesión</a></li>
        </ul>
      </li>
    </ul>
  </div>`
  usuarioLogin.innerHTML = dropdownbutton
    barraNavegacion[0].appendChild(usuarioLogin);
}
function setProductID(id){
  localStorage.setItem("ProductID",id);
  window.location.href = "product-info.html";
}
const colorSwitch = document.querySelector('.switch input[type="checkbox"]');
const textMode = document.querySelector(".textmode");

// Función para cambiar el tema
function cambiaTema(ev) {
    if (ev.target.checked) {
        document.body.classList.add('dark-mode');
        // Guardar la preferencia en el localStorage
        localStorage.setItem('modoNoche', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        // Guardar la preferencia en el localStorage
        localStorage.setItem('modoNoche', 'false');
    }
}

// Recuperar la preferencia del localStorage al cargar la página
const modoNocheGuardado = localStorage.getItem('modoNoche');
if (modoNocheGuardado === 'true') {
    colorSwitch.checked = true;
    cambiaTema({ target: colorSwitch }); // Llamar a la función para aplicar el tema
}

colorSwitch.addEventListener('change', cambiaTema);


// en el htlm:
// <div id:"modos"><label class="switch">
//           <input type="checkbox">
//           <span class="slider round"></span>
//           </label><p class="textmode">Modo noche</p>
//           </div>