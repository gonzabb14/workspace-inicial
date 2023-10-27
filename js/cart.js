const USER_ID = "25801";
const CART_URL = CART_INFO_URL + USER_ID + ".json";
const PRODUCT_LIST = document.getElementsByClassName("cart_list")[0];
const buy = document.getElementById("comprar");

function listarProductos(arrayDeProductos) {
  PRODUCT_LIST.innerHTML = "";
  let appendchild = "";
  arrayDeProductos.forEach((product) => {
    const image = product.image;
    const name = product.name;
    const count = product.count;
    const currency = product.currency;
    const unitCost = product.unitCost;
    const id = product.id;

    appendchild += `
                <li class="cart_item clearfix">
                    
                    <div class="cart-column">
                    <div class="cart_item_image"><img src="${image}" alt=""></div>
                        <div class="cart_item_name cart_info_col">
                     <div class="value">
                            <p class="cart_item_title">Name:</p>
                            
                            <p class="cart_item_text cart-name">${name}</p>
                            </div>
                            <div class="value">
                            <p class="cart_item_title">Cantidad:</p>
                            <input class="cantidad" data-id="${id}" type="number" min="0" value="${count}" required min="1">
                            </div>
                            <div class="value">
                            <p class="cart_item_title">Costo por unidad:</p>
                            <p class="cart_item_text">${currency}${unitCost}</p>
                            </div>
                            <div class="value">
                            <p class="cart_item_title">Subtotal:</p>
                            <p class="total-itemsito" data-id="${id}"  class="cart_item_text" > ${currency}${
      count * unitCost
    } </p>
    </div>             
                          
                        
                        
 
                         </div>
    </div>
                         </div>
                     
                </li>
                `;
  });
  PRODUCT_LIST.innerHTML = appendchild;
}

function CostoFinal() {
  let PrecioFinal = 0;
  const arrayProductos = JSON.parse(localStorage.getItem("Productos"));
  arrayProductos.forEach((producto) => {
    PrecioFinal += producto.count * producto.unitCost;
  });

  if (document.getElementById("opcion1").checked) {
    PrecioFinal = parseInt(PrecioFinal) * 0.15 + parseInt(PrecioFinal);
  }
  if (document.getElementById("opcion2").checked) {
    PrecioFinal = parseInt(PrecioFinal) * 0.07 + parseInt(PrecioFinal);
  }
  if (document.getElementById("opcion3").checked) {
    PrecioFinal = parseInt(PrecioFinal) * 0.05 + parseInt(PrecioFinal);
  }

  document.getElementsByClassName("costo-final")[0].innerHTML = PrecioFinal;
}

function actualizar_subtotal(id) {
  Array.from(document.getElementsByClassName("total-itemsito")).forEach(
    (element) => {
      //if (element.getElementsByClassName("costo-total-producto")[0].innerHTML)
      console.log(element.dataset.id === id);
      if (element.dataset.id === id) {
        let precio_por_unidad = 0;
        let cantidad = 0;
        let moneda;
        JSON.parse(localStorage.getItem("Productos")).forEach((producto) => {
          if (parseInt(producto.id) === parseInt(id)) {
            precio_por_unidad = producto.unitCost;
            cantidad = producto.count;
            moneda = producto.currency;
          }
        });
        element.innerHTML = `<p>${moneda}</p> <p class="costo-total-producto">${
          cantidad * precio_por_unidad
        }</p>`;
      }
    }
  );
}

fetch(CART_URL)
  .then((response) => response.json())
  .then((data) => {
    if (localStorage.getItem("Productos") === null) {
      localStorage.setItem("Productos", JSON.stringify([]));
      let arrayProductos = JSON.parse(localStorage.getItem("Productos"));
      let nodo = {
        name: data.articles[0].name,
        image: data.articles[0].image,
        count: data.articles[0].count,
        currency: data.articles[0].currency,
        unitCost: data.articles[0].unitCost,
        id: data.articles[0].id,
      };

      arrayProductos.push(nodo);
      localStorage.setItem("Productos", JSON.stringify(arrayProductos));
    }

    listarProductos(JSON.parse(localStorage.getItem("Productos")));

    const aumentar_cantidad = document.getElementsByClassName("cantidad");

    Array.from(aumentar_cantidad).forEach((input) => {
      input.addEventListener("input", function (e) {
        let id = input.dataset.id;
        let arr = JSON.parse(localStorage.getItem("Productos"));
        //let indice = 0;

        arr.forEach((element) => {
          if (element.id === parseInt(id)) {
            element.count = input.value;
          } else {
            //indice++;
          }
        });

        if (parseInt(input.value) === 0) {
          arr.splice(indice, 1);
        }

        localStorage.setItem("Productos", JSON.stringify(arr));
        //listarProductos(JSON.parse(localStorage.getItem("Productos")));
        actualizar_subtotal(id);
        CostoFinal();
      });
    });

    CostoFinal();
  })
  .catch((error) => console.log(error.message));

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

// buy.addEventListener("click", (event) => {
//     event.preventDefault();
//     // const mensaje = document.getElementById("mensaje_compra")
//     const formulario = document.getElementById("form_compra")
//     formulario.reset();
//     // mensaje.innerHTML = '¡Gracias por su compra!';
//     // mensaje.style.display = 'block';
//     // mensaje.classList.add('alert');
//     // setTimeout(function () {
//     //     mensaje.style.display = 'none';
//     // }, 3000);
// });

// Código para la ventana emergente para seleccionar el tipo de pago pago

const btnMostrarModal = document.getElementById("mostrarModal");
const modal = document.getElementById("miModal");
const btnCerrarModal = document.getElementById("confirmarModal");
const txtPago = document.getElementById("formaDePago");

btnMostrarModal.addEventListener("click", function () {
  modal.style.display = "block";
});

btnCerrarModal.addEventListener("click", function () {
  const campoTarjeta = document.getElementById("numero_tarjeta");
  const campoTransferencia = document.getElementById("número_cuenta");

  if (campoTarjeta.checkValidity() || campoTransferencia.checkValidity()) {
    txtPago.classList.remove("is-invalid");
    modal.style.display = "none";
    txtPago.classList.add("is-valid");
  }
});
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("transferencia").addEventListener("click", function () {
  const text = document.querySelectorAll(".input_modal");
  const text2 = document.querySelectorAll(".input_modal2");
  text.forEach(function (input) {
    input.disabled = true;
  });
  text2.forEach(function (input) {
    input.disabled = false;
  });
});

document.getElementById("tarjeta").addEventListener("click", function () {
  const text = document.querySelectorAll(".input_modal");
  const text2 = document.querySelectorAll(".input_modal2");
  text.forEach(function (input) {
    input.disabled = false;
  });
  text2.forEach(function (input) {
    input.disabled = true;
  });
});

const formaDeEnvio = document.querySelector('input[name="opcion"]:checked');

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!formaDeEnvio) {
          formaDeEnvio.setCustomValidity(
            "Debes seleccionar una forma de envío."
          );
        } else if (!form.checkValidity()) {
          txtPago.classList.add("is-invalid");
          event.preventDefault();
          event.stopPropagation();
        } else {
          const mensaje = document.getElementById("mensaje_compra");
          const formulario = document.getElementById("form_compra");
          formulario.reset();
          mensaje.innerHTML = "¡Gracias por su compra!";
          mensaje.style.display = "block";
          mensaje.classList.add("alert");
          setTimeout(function () {
            mensaje.style.display = "none";
          }, 3000);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document
  .getElementById("confirmarModal")
  .addEventListener("click", function () {
    const forma_pago = document.getElementById("formaDePago");
    forma_pago.style.display = "none";
  });
