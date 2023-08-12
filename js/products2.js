async function fetchProducts() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/102.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.getElementById('container-product');

        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product'); // Agrega una clase para dar estilo si es necesario

            const productImage = document.createElement('img');
            productImage.src = product.image; // Asigna la URL de la imagen del producto
            productImage.alt = product.name; // Asigna el nombre del producto como alternativa


            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productContainer = document.createElement('div');

            const productPrice = document.createElement('p');
            productPrice.textContent = `Precio: ${product.cost}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            productContainer.appendChild(productName);
            productContainer.appendChild(productPrice);
            productElement.appendChild(productImage);
            productElement.appendChild(productContainer);
            productElement.appendChild(productDescription);

            container.appendChild(productElement);
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchProducts();

  
  