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
        
        

        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.id = product.cost;

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const soldCount = document.createElement("p");
            soldCount.classList.add("vendidos");
            soldCount.textContent = product.soldCount;

            const productName = document.createElement('h2');
            productName.textContent = product.name;
            productName.classList.add("titulo");

            const productPricee = document.createElement('p');
            productPricee.textContent = `${product.cost}`;
            productPricee.style ="display:none";

            const productPrice = document.createElement('p');
            productPrice.textContent = `Precio: ${product.currency} ${product.cost}`;

            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar';
            addButton.classList.add('boton-agregar-carrito');

            const viewButton = document.createElement('button');
            viewButton.textContent = 'Ver';
            viewButton.classList.add('boton-ver-producto');

            const productDescription = document.createElement('p');
            productDescription.classList.add("descripcion");
            productDescription.textContent = product.description;

            const productContainer = document.createElement('div');
            productContainer.appendChild(productName);
            productContainer.appendChild(productPrice);
            productContainer.appendChild(productPricee);
            productContainer.appendChild(addButton);
            productContainer.appendChild(viewButton);
            productElement.appendChild(soldCount);

            productElement.appendChild(productImage);
            productElement.appendChild(productContainer);
            productElement.appendChild(productDescription);

            container.appendChild(productElement);

            addButton.addEventListener('click', () => {
                // Lógica para agregar el producto al carrito
            });

            viewButton.addEventListener('click', () => {
                window.location.href = "product-info.html"
            });
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        //window.location.href = "categories.html";
    }
}

//botón precio ascendente
const botonsito1 = document.getElementById("as");
botonsito1.addEventListener("click", function(e) {
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
let botonsito2 = document.getElementById("ds");
botonsito2.addEventListener("click", function(e) {
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");

    const elementosArray = Array.from(elementos);

    elementosArray.sort((a,b) => b.id - a.id);
    contenedor1.innerHTML = "";

    elementosArray.forEach(element => {
       contenedor1.appendChild(element)
    });
});

let botonsito3 = document.getElementById("rel");

//botón relevancia
botonsito3.addEventListener("click", function(e) {

    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);

    elementosArray.sort((a,b) => b.getElementsByClassName("vendidos")[0].innerHTML - a.getElementsByClassName("vendidos")[0].innerHTML);
    contenedor1.innerHTML = "";

    elementosArray.forEach(element => {
       contenedor1.appendChild(element)
    });
});

const botonsito4 = document.getElementById("FiltrarPrecio");
//botón filtrar
botonsito4.addEventListener("click", (e) => {
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