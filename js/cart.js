document.addEventListener("DOMContentLoaded", function () {

    const USER_ID = "25801";
    const CART_URL = CART_INFO_URL + USER_ID + ".json";
    const PRODUCT_LIST = document.getElementsByClassName("cart_list")[0];
    const buy = document.getElementById('comprar')

    console.log(CART_URL);

    fetch(CART_URL)
        .then(response => response.json())
        .then(data => {

            let final_cost = [];
            let appendchild = "";

            const carrito = JSON.parse(localStorage.getItem("Productos"));

            function listarProductos(arrayDeProductos) {
                arrayDeProductos.forEach(product => {
                    const image = product.image;
                    const name = product.name;
                    const count = product.count;
                    const currency = product.currency;
                    const unitCost = product.unitCost;
    
                    let nodo = {
                        "costo" : unitCost,
                        "cantidad" : count
                    };
    
                    final_cost.push(nodo);
    
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
                                    <input id="cantidad" data-precio-unitario="${unitCost}" type="number" min="1" value="${count}">
                                </div>
                                <div class="cart_item_price cart_info_col">
                                    <div class="cart_item_title">Subtotal</div>
                                    <div class="cart_item_text">${currency}${unitCost}</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_title">Total</div>
                                    <div id="total" class="cart_item_text">${currency}${count * unitCost}</div>
                                </div>
                            </div>
                        </li>
                        `;
                });
            };

            listarProductos(data.articles);
            if (!(localStorage.getItem("Productos") === null)){
                listarProductos(carrito);
            };

            PRODUCT_LIST.innerHTML = appendchild;


            function CostoFinal(){
                let PrecioFinal = 0;
                final_cost.forEach(producto => {
                    PrecioFinal += producto.cantidad * producto.costo;
                })

                if (document.getElementById("opcion1").checked){
                    PrecioFinal = parseInt(PrecioFinal)*0.15 + parseInt(PrecioFinal);
                };
                if (document.getElementById("opcion2").checked){
                    PrecioFinal = parseInt(PrecioFinal)*0.07 + parseInt(PrecioFinal);
                };
                if (document.getElementById("opcion3").checked){
                    PrecioFinal = parseInt(PrecioFinal)*0.05 + parseInt(PrecioFinal);
                };
                
                document.getElementsByClassName("costo-final")[0].innerHTML = PrecioFinal;
            };
            
            const aumentar_cantidad = document.getElementById("cantidad");
            aumentar_cantidad.addEventListener("click", function(e) {
                precio_unitario = aumentar_cantidad.dataset.precioUnitario;
                for(let i = 0; i < final_cost.length; i++) {
                    if (parseInt(precio_unitario) === final_cost[i].costo){
                        final_cost[i].cantidad = parseInt(aumentar_cantidad.value);
                        i = final_cost.length;
                    }
                }
                CostoFinal();
            });

            document.getElementsByClassName("tipo-de-moneda")[0].innerHTML = "U$D";
            CostoFinal();

            document.getElementById("opcion1").addEventListener("click", function(e) {
                CostoFinal();
            });
            document.getElementById("opcion2").addEventListener("click", function(e) {
                CostoFinal();
            });
            document.getElementById("opcion3").addEventListener("click", function(e) {
                CostoFinal();
            });
            
        })
        .catch(error => console.log(error.message));

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
        })
});
