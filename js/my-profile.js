if (localStorage.getItem("usuarioLogueado") === "true") {
    let user = JSON.parse(localStorage.getItem("registroUsuario"));

    console.log(user);
    document.getElementById("user-rename").value = user.primer_nombre;
    document.getElementById("user-resecname").value = user.segundo_nombre;
    document.getElementById("user-resurname").value = user.primer_apellido;
    document.getElementById("user-resecsurname").value = user.segundo_apellido;
    document.getElementById("user-rephone").value = user.telefono;
    document.getElementById("inputemail").value = user.email;

    if (localStorage.getItem("imagenPerfil")) {
        document.getElementById("imgplace").src = localStorage.getItem("imagenPerfil");
    }

} else {
    window.location.href = 'login.html';
}

function validarNumero(event) {
    const input = event.target;
    const valor = input.value;

    // Reemplaza no números con una cadena vacía
    input.value = valor.replace(/\D/g, '');

}

document.getElementById("user-rephone").addEventListener("input", validarNumero);

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                console.log(1);
            } else {
                //event.preventDefault()
                event.stopPropagation()
                console.log(2);
                const primerNombre = document.getElementById("user-rename").value;
                const segundoNombre = document.getElementById("user-resecname").value;
                const primerApellido = document.getElementById("user-resurname").value;
                const segundoApellido = document.getElementById("user-resecsurname").value;
                const telefono = document.getElementById("user-rephone").value;
                const email = document.getElementById("inputemail").value;



                let user = {
                    "primer_nombre": primerNombre,
                    "segundo_nombre": segundoNombre,
                    "primer_apellido": primerApellido,
                    "segundo_apellido": segundoApellido,
                    "telefono": telefono,
                    "email": email,
                    "contraseña": JSON.parse(localStorage.getItem("registroUsuario")).contraseña
                }
                localStorage.removeItem("registroUsuario");
                localStorage.setItem("registroUsuario", JSON.stringify(user));

                const input = document.getElementById("inportImg");
                const file = input.files[0];

                const reader = new FileReader();

                if (file) {
                    reader.onload = function (e) {

                        const imageData = e.target.result;

                        localStorage.setItem('imagenPerfil', imageData);
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.error('Por favor, selecciona una imagen.');
                }



                /*let primer_nombre = document.getElementById("user-rename");
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
*/
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

/*function changesDone() {
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
*/

