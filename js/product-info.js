const usuarioLogueado = localStorage.getItem('usuarioLogueado') === 'true';
if (!usuarioLogueado) {
    window.location.href = 'login.html';
} else {
    //alert("logueado");
    let barraNavegacion = document.getElementsByClassName("navbar navbar-expand-lg navbar-dark bg-dark p-1");
    let usuarioLogin = document.createElement("a");
    usuarioLogin.classList = "userlogged";
    usuarioLogin.href = "my-profile.html"
    usuarioLogin.innerHTML = JSON.parse(localStorage.getItem("registroUsuario")).email;
    barraNavegacion[0].appendChild(usuarioLogin);
}

function agregarImagenes() {
    fetch("https://japceibal.github.io/emercado-api/products/" + localStorage.ProductID + ".json")
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let imagenes = ``;
                    data.images.forEach(element => {
                        imagenes += `<img style="width: 150px;" src="${element}"></img>`;
                    });
                    document.getElementById("imagenes").innerHTML = imagenes;
                    //console.log(array);
                })
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

                    // Llama a enviarComentario después de agregar los comentarios existentes
                    enviarComentario();
                })
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.log("Hubo un problema con la petición Fetch (agregar comentarios):" + error.message);
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
                <textarea style="width:500px; height:100px;"></textarea>
                <p>Tu puntuación:</p>
                <select style="width:35px;">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button style="width:60px; margin-top:10px; border-radius:10%; background-color:#4343ffeb;">Enviar</button>
            </form>
        </div>
    </div>
    `;

    // console.log(comments);

    document.getElementById("container-product").innerHTML = htmlContentToAppend;
    agregarImagenes();
    agregarComentarios();

    // Configura el evento clic en el botón "Enviar" después de haber creado el botón
    document.querySelector("button").addEventListener("click", enviarComentario);
}

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
    function agregarComentarios() {
        fetch("https://japceibal.github.io/emercado-api/products_comments/" + localStorage.ProductID + ".json")
            .then(response => {
                if (response.ok) {
                    return response.json(); // Aquí, se devuelve el resultado del parsing JSON
                } else {
                    console.log("Respuesta de red OK pero respuesta HTTP no OK");
                    throw new Error("Respuesta de red OK pero respuesta HTTP no OK");
                }
            })
            .then(data => {
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
    
                // Llama a enviarComentario después de agregar los comentarios existentes
                enviarComentario();
            })
            .catch(error => {
                console.log("Hubo un problema con la petición Fetch (agregar comentarios):" + error.message);
            });
    }
    
