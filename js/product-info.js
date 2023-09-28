

function agregarImagenes() {
    fetch("https://japceibal.github.io/emercado-api/products/" + localStorage.ProductID + ".json")
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let imagenes = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">`;

                    // Agregar indicadores para cada imagen
                    for (let i = 0; i < data.images.length; i++) {
                        imagenes += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''} aria-label="Slide ${i + 1}"></button>`;
                    }

                    imagenes += `</div>
                        <div class="carousel-inner">`;

                    // Agregar cada imagen al carrusel
                    data.images.forEach((element, index) => {
                        imagenes += `<div class="carousel-item${index === 0 ? ' active' : ''}">
                            <img style="width: 400px;" src="${element}" alt="Imagen ${index + 1}">
                        </div>`;
                    });

                    imagenes += `</div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>`;
                      
                    document.getElementById("imagenes").innerHTML = imagenes;
                });
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.log("Hubo un problema con la petición Fetch (agregar imagenes):" + error.message);
        });
}


function agregarComentarios() {
    fetch("https://japceibal.github.io/emercado-api/products_comments/" + localStorage.ProductID + ".json")
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let comentarios = ``;
                    console.log(data);
                    let space = " ";

                    data.forEach(comentario => {
                        comentarios += `
                        <div class="test-divs" style="border: 1px solid black; margin: 0px;  border: 0.5px solid #897d7d38;">
                            <div style="display: flex; flex-direction: row;">
                                <p class="test"><strong>${comentario.user}</strong></p>
                                <p style="margin: 0px 10px 0px 10px;">-</p>
                                <p>${comentario.dateTime}</p>
                                <p style="margin: 0px 10px 0px 10px;">-</p>
                                <div class="calificaciones">
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                            </div>
                            <p class="test">${comentario.description}</p>
                        </div>
                        `;

                    })
                    document.getElementById("comentarios").innerHTML = comentarios;
                    //agregarScore(comentario.score, i);
                    let i = 0;
                    data.forEach(comentario => {
                        const cal = document.getElementsByClassName("calificaciones")[i].getElementsByTagName("span");
                        for (let j = 0; j < comentario.score; j++) {
                            cal[j].classList.add("checked");
                        }
                        i++;
                    })
                })
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.log("Hubo un problema con la petición Fetch (agregar comentarios):" + error.message);
        });
}
function relatedProducts() {
    fetch("https://japceibal.github.io/emercado-api/products/" + localStorage.ProductID + ".json")
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let related = ``;
                    data.relatedProducts.forEach(element => {
                        related += `<div class=rProduct>
                        <img style="width: 150px;" src="${element.image}">
                        <p class="test">${element.name}</p>
                        <button onclick="setProductID(${element.id})" class="boton-ver-producto">Ver</button>
                        </div>
                        `;
                    });
                    document.querySelector("#relatedProducts").innerHTML = related;
                    //console.log(array);
                })
            }
            else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.log("Hubo un problema con la petición Fetch (agregar productos relacionados):" + error.message);
        });
}

function agregarProducto(product, categoria) {
    let htmlContentToAppend = `
    <div id="container-product2">
        <div id="product-information">
            <h2>${product.name}</h2>
            <hr>
            <div class="test-divs">
                <p class="test"><strong>Precio</strong></p>
                <p class="test">${product.currency} ${product.cost}</p>
            </div>
            <div class="test-divs">
                <p class="test"><strong>Descripción</strong></p>
                <p class="test">${product.description}</p>
            </div>
            <div class="test-divs">
                <p class="test"><strong>Categoria</strong></p>
                <p class="test">${categoria}</p>
            </div>
            <div class="test-divs">
                <p class="test"><strong>Cantidad de vendidos</strong></p>
                <p class="test">${product.soldCount}</p>
            </div>
            <div class="test-divs">
                <p class="test"><strong>Imágenes ilustrativas</strong></p>
                <div id="imagenes" style="display: flex;">
            </div>
        </div>
        <div class="test-divs" style="margin-top: 30px;" >
            <p style="font-size:1.4rem;">Comentarios</p>
            <div style="display: flex; flex-direction: column; justify-content: space-;" id="comentarios">

            </div>
        </div>
        <div class="test-divs" style="margin-top: 30px;">
            <p style="font-size:1.4rem;">Comentar</p>
            <form style="display:flex; flex-direction:column;">
                <p>Tu opinión:</p>
                <textarea style="width:500px; height:100px;" id="comentario-hecho"></textarea>
                <p>Tu puntuación:</p>
                <select id="calificacion-dada" style="width:50px;">
                    <option value="1">1★</option>
                    <option value="2">2★</option>
                    <option value="3">3★</option>
                    <option value="4">4★</option>
                    <option value="5">5★</option>
                </select>
                <button style="width: 60px; margin-top:10px; border-radius:10%;" id="boton-enviar-datos">Enviar</button>
            </form>
        </div>
        <br>
        <div class="test-divs">
        <p class="test"><strong>Productos relacionados:</strong></p>
         <div id="relatedProducts" style="display: flex;" >
         </div>
    </div>
    `;


    // console.log(comments);

    document.getElementById("container-product").innerHTML = htmlContentToAppend;
    agregarImagenes();
    agregarComentarios();
    relatedProducts();
    document.getElementById("boton-enviar-datos").addEventListener("click", (e) => {
        e.preventDefault();
        const comentario = document.getElementById("comentario-hecho").value;
        const score = document.getElementById("calificacion-dada").value;

        console.log(comentario, score);

        const user = JSON.parse(localStorage.registroUsuario);
        console.log(user.nombre);

        const fechaActual = new Date();

        const año = fechaActual.getFullYear(); // Obtiene el año actual
        const mes = fechaActual.getMonth() + 1; // Obtiene el mes actual (0-11, por lo que sumamos 1)
        const dia = fechaActual.getDate(); // Obtiene el día del mes
        const hora = fechaActual.getHours(); // Obtiene la hora del día (0-23)
        const minutos = fechaActual.getMinutes(); // Obtiene los minutos (0-59)
        const segundos = fechaActual.getSeconds(); // Obtiene los segundos (0-59)



        //console.log();


        document.getElementById("comentarios").innerHTML += `
        <div class="test-divs" style="border: 1px solid black; margin: 0px;  border: 0.5px solid #897d7d38;">
            <div style="display: flex; flex-direction: row;">
                <p class="test"><strong>${user.nombre + " " + user.apellido}</strong></p>
                <p style="margin: 0px 10px 0px 10px;">-</p>
                <p>${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia} ${hora < 10 ? '0' + hora : hora}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}</p>
                <p style="margin: 0px 10px 0px 10px;">-</p>
                <div class="calificaciones">
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
            </div>
            <p class="test">${comentario}</p>
        </div>
        `;

        const estrellitas = document.getElementsByClassName("calificaciones")[document.getElementsByClassName("calificaciones").length - 1].getElementsByTagName("span");
        for (let h = 0; h < score; h++) {
            estrellitas[h].classList.add("checked");
        }

        document.getElementById("comentario-hecho").value = '';
        document.getElementById("calificacion-dada").selectedIndex = 0;
        const mensaje = document.getElementById("mensaje")
        mensaje.innerHTML = '¡Gracias por su comentario!';
        mensaje.style.display = 'block';
        mensaje.classList.add('alert');
        setTimeout(function () {
            mensaje.style.display = 'none';
        }, 3000);
    })
};



fetch('https://japceibal.github.io/emercado-api/cats_products/' + localStorage.catID + '.json')
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                //console.log(data.products[0]);
                let i = 0;
                while (data.products.length !== i && data.products[i].id !== parseInt(localStorage.ProductID)) {
                    //console.log(i);
                    //console.log(localStorage.ProductID);
                    //console.log(data.products[i].id);
                    i++;
                }

                if (i < data.products.length) {
                    const productos = data.products[i];
                    const categoriaNombre = data.catName;
                    //console.log("si");
                    agregarProducto(productos, categoriaNombre);
                } else {
                    console.log("no");
                }
            })

        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    })
    .catch(error => {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    });