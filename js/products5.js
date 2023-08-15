async function fetchProducts() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/105.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const container = document.getElementById('container-product');

        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Precio: ${product.cost}`;

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
            productContainer.appendChild(addButton);
            productContainer.appendChild(viewButton);

            productElement.appendChild(productImage);
            productElement.appendChild(productContainer);
            productElement.appendChild(productDescription);

            container.appendChild(productElement);

            addButton.addEventListener('click', () => {
                // Lógica para agregar el producto al carrito
            });

            viewButton.addEventListener('click', () => {
                // Lógica para mostrar más detalles del producto
            });
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchProducts();
