const USER_ID = "25801";
const CART_URL = CART_INFO_URL + USER_ID + ".json";
const PRODUCT_LIST = document.getElementsByClassName("cart_list")[0];
const buy = document.getElementById('comprar')

function listarProductos(arrayDeProductos) {
    PRODUCT_LIST.innerHTML = "";
    let appendchild = "";
    arrayDeProductos.forEach(product => {
        const image = product.image;
        const name = product.name;
        const count = product.count;
        const currency = product.currency;
        const unitCost = product.unitCost;
        const id = product.id;

        appendchild += `
                <li class="cart_item clearfix">
                    <div class="cart_item_image"><img src="${image}" alt=""></div>
                    <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                        <div class="cart_item_name cart_info_col">
                            <div class="cart_item_title">Name</div>
                            <div class="cart_item_text">${name}</div>
                        </div>
                        <div class="cart_item_quantity cart_info_col">
                            <div class="cart_item_title">Cantidad</div>
                            <input class="cantidad" data-id="${id}" type="number" min="0" value="${count}">
                        </div>
                        <div class="cart_item_price cart_info_col">
                            <div class="cart_item_title">Subtotal</div>
                            <div class="cart_item_text">${currency}${unitCost}</div>
                        </div>
                        <div class="cart_item_total cart_info_col">
                            <div class="cart_item_title">Total</div>
                            <div id="total" class="cart_item_text" style="display:flex;"> <p>${currency}</p> <p class="costo-total-producto">${count * unitCost}</p> </div>
                        </div>
                        <div class="cart_item_remove cart_info_col">
                         <div class="cart_item_title">Eliminar</div>
                            <div class="cart_item_text" style="display:flex;">
                            <button class="remove-button" data-id="${id}">Eliminar del carrito</button>
        </div>
    </div>
                    </div>
                </li>
                `;
    });
    PRODUCT_LIST.innerHTML = appendchild;
};

function CostoFinal() {
    let PrecioFinal = 0;
    const arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    arrayProductos.forEach(producto => {
        PrecioFinal += producto.count * producto.unitCost;
    })

    if (document.getElementById("opcion1").checked) {
        PrecioFinal = parseInt(PrecioFinal) * 0.15 + parseInt(PrecioFinal);
    };
    if (document.getElementById("opcion2").checked) {
        PrecioFinal = parseInt(PrecioFinal) * 0.07 + parseInt(PrecioFinal);
    };
    if (document.getElementById("opcion3").checked) {
        PrecioFinal = parseInt(PrecioFinal) * 0.05 + parseInt(PrecioFinal);
    };

    document.getElementsByClassName("costo-final")[0].innerHTML = PrecioFinal;
};



fetch(CART_URL)
    .then(response => response.json())
    .then(data => {

        if (localStorage.getItem("Productos") === null) {
            localStorage.setItem("Productos", JSON.stringify([]));
            let arrayProductos = JSON.parse(localStorage.getItem("Productos"));
            let nodo = {
                "name": data.articles[0].name,
                "image": data.articles[0].image,
                "count": data.articles[0].count,
                "currency": data.articles[0].currency,
                "unitCost": data.articles[0].unitCost,
                "id": data.articles[0].id
            };

            arrayProductos.push(nodo);
            localStorage.setItem("Productos", JSON.stringify(arrayProductos));
        };

        listarProductos(JSON.parse(localStorage.getItem("Productos")));

        const aumentar_cantidad = document.getElementsByClassName("cantidad");

        Array.from(aumentar_cantidad).forEach(input => {
            input.addEventListener("input", function (e) {
                let id = input.dataset.id;
                let arr = JSON.parse(localStorage.getItem("Productos"));
                let indice = 0;

                arr.forEach(element => {
                    if (element.id === parseInt(id)) {
                        element.count = input.value;
                    } else {
                        indice++;
                    };
                });

                if (parseInt(input.value) === 0) {
                    arr.splice(indice, 1);
                }

                localStorage.setItem("Productos", JSON.stringify(arr));
                location.reload();
            });
        })

        CostoFinal();
    })
    .catch(error => console.log(error.message));

document.getElementsByClassName("tipo-de-moneda")[0].innerHTML = "U$D";

document.getElementById("opcion1").addEventListener("click", function (e) {
    CostoFinal();
});
document.getElementById("opcion2").addEventListener("click", function (e) {
    CostoFinal();
});
document.getElementById("opcion3").addEventListener("click", function (e) {
    CostoFinal();
});

buy.addEventListener("click", (event) => {
    event.preventDefault();
    const mensaje = document.getElementById("mensaje_compra")
    const formulario = document.getElementById("form_compra")
    formulario.reset();
    mensaje.innerHTML = '¡Gracias por su compra!';
    mensaje.style.display = 'block';
    mensaje.classList.add('alert');
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 3000);
});


function removeProduct() {
    let array = JSON.parse(localStorage.getItem("Productos"));
    let indice = 0;
    array.splice(indice, 1);
    localStorage.setItem("Productos", JSON.stringify(array));
    location.reload();
}
PRODUCT_LIST.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-button")) {
        removeProduct()

    }
});