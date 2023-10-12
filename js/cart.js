document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud a la API ha fallado.');
            }
            return response.json();
        })
        .then(data => {
            const HTMLResponse = document.querySelector('#cart');
            const articles = data.articles;

            const tpl = articles.map((article) => `
                <li>
                    ${article.name} <br>
                    ${article.count} <br>
                    ${article.unitCost} ${article.currency} <br>
                    <img src="${article.image}" alt="${article.name}">
                </li>
            `);

            HTMLResponse.innerHTML = `<ul>${tpl.join('')}</ul>`;
        })
        .catch(error => {
            console.error(error);
            // Puedes mostrar un mensaje de error en la página si lo deseas
        });
});
