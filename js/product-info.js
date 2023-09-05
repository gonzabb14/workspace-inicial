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
    let array = [];
    fetch("https://japceibal.github.io/emercado-api/products/" + localStorage.ProductID + ".json")
        .then(response => {
            if (response.ok) {
                
                response.json().then(data => {
                    let imagenes = ``;
                    data.images.forEach(element => {
                        array.push(element);
                        imagenes += `<img style="width: 150px;" src="${element}"></img>`;

                    });
                    document.getElementById("comentarios").innerHTML = imagenes;
                    //console.log(array);
                })}
            else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
            })
        .catch(error => {
            console.log("Hubo un problema con la petición Fetch:" + error.message);
        });
}

function agregarProducto(product, categoria) {
    let htmlContentToAppend = `
    <div id="container-product2">
        <div id="product-information">
            <h2>${product.name}</h2>
            <hr>
            <div>
                <p><strong>Precio</strong></p>
                <p>${product.currency} ${product.cost}</p>
            </div>
            <div>
                <p><strong>Descripción</strong></p>
                <p>${product.description}</p>
            </div>
            <div>
                <p><strong>Categoria</strong></p>
                <p>${categoria}</p>
            </div>
            <div>
                <p><strong>Cantidad de vendidos</strong></p>
                <p>${product.soldCount}</p>
            </div>
            <div >
                <p><strong>Imágenes ilustrativas</strong></p>
                <div id="comentarios" style="display: flex; justify-content: space-around;">
            </div>
        </div>
    </div>
    `;
    
   // console.log(comments);

    document.getElementById("container-product").innerHTML = htmlContentToAppend;
    agregarImagenes();
    //agregarComentarios();
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