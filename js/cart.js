const USER_ID = "25801";
const CART_URL = CART_INFO_URL + USER_ID + ".json";
const PRODUCT_LIST = document.getElementsByClassName("cart_list")[0];

console.log(CART_URL);

fetch(CART_URL)
    .then(response => response.json())
    .then(data => {

        const image = data.articles[0].image;
        const name = data.articles[0].name;
        const count = data.articles[0].count;
        const currency = data.articles[0].currency;
        const unitCost = data.articles[0].unitCost;

        console.log(image, name, count, currency, unitCost);

        let product = `
            <li class="cart_item clearfix">
                <div class="cart_item_image"><img src="${image}" alt=""></div>
                <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                    <div class="cart_item_name cart_info_col">
                        <div class="cart_item_title">Name</div>
                        <div class="cart_item_text">${name}</div>
                    </div>
                    <div class="cart_item_quantity cart_info_col">
                        <div class="cart_item_title">Cantidad</div>
                        <input id="cantidad" type="number" min="0" placeholder="${count}">
                    </div>
                    <div class="cart_item_price cart_info_col">
                        <div class="cart_item_title">Subtotal</div>
                        <div class="cart_item_text">${currency}${unitCost}</div>
                    </div>
                    <div class="cart_item_total cart_info_col">
                        <div class="cart_item_title">Total</div>
                        <div id="total" class="cart_item_text">${currency}${count*unitCost}</div>
                    </div>
                </div>
            </li>
        `;

        document.getElementById("order_total_amount").innerHTML = currency + unitCost*count;
       // console.log(document.getElementById("order_total_amount").innerHTML = currency + count*unitCost);

        PRODUCT_LIST.innerHTML = product;

        document.getElementById("cantidad").addEventListener("click", function(e) {
            console.log(document.getElementById("cantidad").value);
            document.getElementById("total").innerHTML = currency + unitCost*document.getElementById("cantidad").value;
  
            //cambiar cuando se añada la funcion de agregar mas productos
            document.getElementById("order_total_amount").innerHTML = currency + unitCost*document.getElementById("cantidad").value;
        });

    })
    .catch(error => console.log(error.message));