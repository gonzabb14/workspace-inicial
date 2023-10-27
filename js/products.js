

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

        data.products.forEach(product => {
            htmlContentToAppend += `
            <div class="product" id="${product.id}">
                <p class="vendidos">${product.soldCount}</p>
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h2 class="titulo">${product.name}</h2>
                    <p class="descripcion">${product.description}</p>
                    <p>Precio: ${product.currency}${product.cost}</p>
                    <p style="display: none;">${product.cost}</p>
                    <button class="boton-agregar-carrito">Agregar</button>
                    <button onclick="setProductID(${product.id})" class="boton-ver-producto">Ver</button>
                </div>
            </div>
            `;
        });

        // Agregar todos los elementos al contenedor al final del bucle
        container.innerHTML = htmlContentToAppend;

        // Aplicar la función de búsqueda después de cargar los productos
        applySearchFilter();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        //window.location.href = "categories.html";
    }
}

function applySearchFilter() {
    const queBuscar = document.getElementById("buscar").value.toLowerCase();
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);

    elementosArray.forEach(element => {
        const titulo = element.querySelector(".titulo").textContent.toLowerCase();

        if (titulo.includes(queBuscar)) {
            element.classList.remove("ocultar");
        } else {
            element.classList.add("ocultar");
        }
    });

    // Ordenar los elementos visibles por título
    const elementosVisibles = elementosArray.filter(element => !element.classList.contains("ocultar"));
    elementosVisibles.sort((a, b) => {
        const tituloA = a.querySelector(".titulo").textContent.toLowerCase();
        const tituloB = b.querySelector(".titulo").textContent.toLowerCase();
        return tituloA.localeCompare(tituloB);
    });

    // Limpiar el contenedor y agregar los elementos ordenados
    contenedor1.innerHTML = "";
    elementosVisibles.forEach(element => {
        contenedor1.appendChild(element);
    });
}

// Llama a fetchProducts() al cargar la página
fetchProducts();


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
    const queBuscar = e.target.value.toLowerCase();
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const elementosArray = Array.from(elementos);

    elementosArray.forEach(element => {
        const titulo = element.querySelector(".titulo").textContent.toLowerCase();
        const descripcion = element.querySelector(".descripcion").textContent.toLowerCase();

        if (titulo.includes(queBuscar) || descripcion.includes(queBuscar)) {
            element.classList.remove("ocultar");
        } else {
            element.classList.add("ocultar");
        }
    });
});


fetchProducts();