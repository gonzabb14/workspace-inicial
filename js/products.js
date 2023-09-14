    const usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
    } else {
        //alert("logueado");
        let barraNavegacion = document.getElementsByClassName("navbar navbar-expand-lg navbar-dark bg-dark p-1");
        let usuarioLogin = document.createElement("a");
        usuarioLogin.classList = "userlogged";
        usuarioLogin.href = "my-profile.html"
        usuarioLogin.innerHTML = JSON.parse(localStorage.getItem("registroUsuario")).email;
        barraNavegacion[0].appendChild(usuarioLogin);
    }

function setProductID(id){
    localStorage.setItem("ProductID",id);
    window.location.href = "product-info.html";
}

async function fetchProducts() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/' + localStorage.catID + '.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.getElementById('container-product');
        const contenedor = document.getElementById("queProductoEs");
        contenedor.classList.add("centrar");
        const parrafo = document.createElement("p");
        parrafo.innerHTML = "Verás aquí todos los productos de la categoría " + data.catName;
        
        
        let htmlContentToAppend = "";
        document.getE
        data.products.forEach(product => {
            htmlContentToAppend += `
            <div class="product" id="${product.id}">
                <p class="vendidos">${product.soldCount}</p>
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h2 class="titulo">${product.name}</h2>
                    <p>Precio: ${product.currency}${product.cost}</p>
                    <p style="display: none;">${product.cost}</p>
                    <button class="boton-agregar-carrito">Agregar</button>
                    <button onclick="setProductID(${product.id})" class="boton-ver-producto">Ver</button>
                </div>
            </div>
            `
            document.getElementById("container-product").innerHTML = htmlContentToAppend;
            
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        //window.location.href = "categories.html";
    }
}

//botón precio ascendente
const button1 = document.getElementById("as");
button1.addEventListener("click", function(e) {
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");

    const elementosArray = Array.from(elementos);

    elementosArray.sort((a,b) => a.id - b.id);
    contenedor1.innerHTML = "";

    elementosArray.forEach(element => {
       contenedor1.appendChild(element)
    });
});


//botón precio descendente
let button2 = document.getElementById("ds");
button2.addEventListener("click", function(e) {
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");

    const elementosArray = Array.from(elementos);

    elementosArray.sort((a,b) => b.id - a.id);
    contenedor1.innerHTML = "";

    elementosArray.forEach(element => {
       contenedor1.appendChild(element)
    });
});

let button3 = document.getElementById("rel");

//botón relevancia
button3.addEventListener("click", function(e) {

    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);

    elementosArray.sort((a,b) => b.getElementsByClassName("vendidos")[0].innerHTML - a.getElementsByClassName("vendidos")[0].innerHTML);
    contenedor1.innerHTML = "";

    elementosArray.forEach(element => {
       contenedor1.appendChild(element)
    });
});

const button4 = document.getElementById("FiltrarPrecio");
//botón filtrar
button4.addEventListener("click", (e) => {
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");

    let min = 0;
    let max = document.getElementById("maxPrice").value;
    min = document.getElementById("minPrice").value;
    if (max == "") {
        max = 999999999999;
    }

    const elementosArray = Array.from(elementos);
    if (min < max) {
        elementosArray.forEach(element => {
            const elementId = parseInt(element.id);
            if (elementId >= min && elementId <= max) {
                element.classList.remove("ocultar");
            } else {
                element.classList.add("ocultar");
            }
        });
    }

});


document.getElementById("btnLimpiar2").addEventListener("click", (e) => {
    e.preventDefault();
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);
    document.getElementById("minPrice").value = null;
    document.getElementById("maxPrice").value = null;

    elementosArray.forEach(element => {
        element.classList.remove("ocultar");
    });
});

document.getElementById("buscar").addEventListener("input", (e) => {
    const queBuscar = document.getElementById("buscar").value.toLowerCase();
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);
    elementosArray.forEach(element => {
        if (element.getElementsByClassName("titulo")[0].innerHTML.toLowerCase().includes(queBuscar) || element.getElementsByClassName("descripcion")[0].innerHTML.toLowerCase().includes(queBuscar)) {
            element.classList.remove("ocultar");
        } else {
            element.classList.add("ocultar");
        }
    });
});

fetchProducts();