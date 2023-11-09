
// if (usuarioLogueado) {
//     let user = JSON.parse(localStorage.getItem("registroUsuario"));

//     let nombre = document.getElementById("nombre");
//     let apellido = document.getElementById("apellido");
//     let email = document.getElementById("email");
//     let inputemail = document.getElementById("inputemail")
//     nombre.innerHTML = user.nombre + " " + user.apellido;
//     email.innerHTML = user.email;
//     inputemail.value = user.email;

//     document.getElementById("cerrar-sesion").addEventListener("click", function (e) {
//         localStorage.clear();
//         location.reload(); //refresca la web así te manda al login
//     })

// } else {
//     window.location.href = 'login.html';
// }

// document.getElementById("inportImg").addEventListener("Change", function () {
//     const reader = new FileReader;
//     reader.adddEventListener("load", () => {
//         localStorage.setItem("recent-image", reader.result);
//     });
//     document.getElementById("imgplace").src = reader.readAsDataURL(this.files[0]);
//     reader.readAsDataURL(this.files[0]);

// });

// const input = document.getElementById("inportImg");

input.addEventListener('change', (e) => {
    const files = e.target.files;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
        const dataURL = reader.result;

        const image = document.getElementById("imgplace");
        image.src = dataURL;
    };

    reader.readAsDataURL(file);
});




// document.addEventListener("DOMContentLoaded", () => {
//     const recentImageDataUrl = localStorage.getItem('recent-image');

//     if (recentImageDataUrl) {
//         document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
//     }
// })


(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                event.stopPropagation()
                let primer_nombre = document.getElementById("user-rename");
                let segundo_nombre = document.getElementById("user-resecname");
                let primer_apellido = document.getElementById("user-resurname");
                let segundo_apellido = document.getElementById("user-resecsurname");
                let email = document.getElementById("inputemail");
                let telefono = document.getElementById("user-rephone");


                let userchanges = {
                    "primer_nombre": primer_nombre.value,
                    "segundo_nombre": segundo_nombre.value,
                    "primer_apellido": primer_apellido.value,
                    "segundo_apellido": segundo_apellido.value,
                    "email": email.value,
                    "Telefono": telefono.value,

                }

                localStorage.setItem("userChanges", JSON.stringify(userchanges));

                let user = JSON.parse(localStorage.getItem("registroUsuario"));
                user.nombre = primer_nombre.value + " " + segundo_nombre.value;
                user.apellido = primer_apellido.value + " " + segundo_apellido.value;

                localStorage.setItem("registroUsuario", JSON.stringify(user));

            }

            form.classList.add('was-validated')
        }, false)
    })
})()

const input = document.getElementById("inportImg");



function changesDone() {
    let primer_nombre = document.getElementById("user-rename");
    let segundo_nombre = document.getElementById("user-resecname");
    let primer_apellido = document.getElementById("user-resurname");
    let segundo_apellido = document.getElementById("user-resecsurname");
    let email = document.getElementById("inputemail");
    let telefono = document.getElementById("user-rephone");
    let userchanged = JSON.parse(localStorage.getItem("userChanges"));


    let nombre = document.getElementById("nombre");
    let inputemail = document.getElementById("inputemail");
    nombre.innerHTML = userchanged.primer_nombre + " " + userchanged.primer_apellido + " " + userchanged.segundo_apellido;
    email.innerHTML = userchanged.email;
    inputemail.value = userchanged.email;
    primer_nombre.value = userchanged.primer_nombre;
    segundo_nombre.value = userchanged.segundo_nombre;
    primer_apellido.value = userchanged.primer_apellido
    segundo_apellido.value = userchanged.segundo_apellido;
    telefono.value = userchanged.Telefono;
}

changesDone();


