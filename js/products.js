async function fetchProducts() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/' + localStorage.catID + '.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.getElementById('container-product');
        let contenedor = document.getElementById("queProductoEs");
        contenedor.id = "centrar"
        let parrafo = document.createElement("p");
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
        window.location.href = "categories.html";
    }
}

//botón precio ascendente
let botonsito1 = document.getElementById("as");
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
botonsito4.addEventListener("click", function(e){
    
    const contenedor1 = document.getElementById('container-product');
    const elementos = contenedor1.getElementsByClassName("product");
    const min = document.getElementById("minPrice").value;
    const max = document.getElementById("maxPrice").value;

    if (min < max) {
        const elementosArray = Array.from(elementos);

        let array = elementosArray.filter((a) => parseInt(a.id) <= max && parseInt(a.id) <= min);
        contenedor1.innerHTML = "";

        array.forEach(element => {
            contenedor1.appendChild(element);
        });
    } else {
        alert("min tiene que ser menor o igual que max");
    }
});



fetchProducts();