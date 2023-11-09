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

            } else {
                //event.preventDefault()
                event.stopPropagation()
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
            }

            form.classList.add('was-validated')
        }, false)
    })
})()
