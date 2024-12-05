// Obtener el array de usuarios desde localStorage (o uno vacío si no hay datos)
const obtenerUsuarios = () => JSON.parse(localStorage.getItem('usuarios')) || [];

// Guardar el array de usuarios actualizado en localStorage
const guardarUsuarios = (usuarios) => localStorage.setItem('usuarios', JSON.stringify(usuarios));

// Escuchar el evento DOMContentLoaded para asegurar que el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado y listo.");

    // Evento para el botón de iniciar sesión
    const btnInicio = document.getElementById('btnInicio');
    if (btnInicio) {
        btnInicio.addEventListener('click', (e) => {
            e.preventDefault()

            const email = document.getElementById('emailInicio').value.trim();
            const pass = document.getElementById('pass').value.trim();
            console.log("Intentando iniciar sesión con:", { email, pass });

            const usuarios = obtenerUsuarios();

            const usuarioValido = usuarios.find(
                (usuario) => usuario.email === email && usuario.pass === pass
            );

            if (usuarioValido) {
                console.log('Inicio de sesión exitoso:', usuarioValido);
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));
                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: 'Redirigiendo a la página principal.',
                    icon: 'success',
                    showConfirmButton: false, 
                    timer: 3000,
                });
                setTimeout(() => {
                    paginaPrincipal();
                }, 3000); 
            } else {
                alert('Error al iniciar sesión. Vuelve a intentarlo.');
            }
        });
    }

    // Evento para el botón de registro
    const btnReg = document.getElementById('btnReg');
    if (btnReg) {
        btnReg.addEventListener('click', (e) => {
            e.preventDefault()

            const nombreCompleto = document.getElementById('nombreApellido').value.trim();
            const email = document.getElementById('emailR').value.trim();
            const pass = document.getElementById('passR').value.trim();
            const genero = document.getElementById('genero-list').value;
            const edad = parseInt(document.getElementById('edad').value);
            const direccion = document.getElementById('dir').value.trim();
            const telefono = document.getElementById('tel').value.trim();

            console.log("Datos ingresados para registro:", {
                nombreCompleto, email, pass, genero, edad, direccion, telefono
            });

            const usuarios = obtenerUsuarios();
            const usuarioExistente = usuarios.find((u) => u.email === email);

            if (usuarioExistente) {
                Toastify({
                    text: "Este usuario ya existe. Inicia sesión para continuar.",
                    duration: 3000,
                    gravity: "bottom",
                    style: { background: "rgb(119 47 0)"},
                }).showToast();
                return;
            }

            if (
                nombreCompleto && email && pass && pass.length > 8 &&
                genero && !isNaN(edad) && edad >= 18 &&
                direccion && telefono
            ) {
                const datosRegistro = { nombreCompleto, email, pass, genero, edad, direccion, telefono };
                usuarios.push(datosRegistro);
                guardarUsuarios(usuarios);

                console.log('Usuario registrado exitosamente:', datosRegistro);
                Swal.fire({
                    title: 'REGISTRO EXITOSO',
                    text: 'Se te enviará la información necesaria a tu correo electrónico.',
                    icon: 'success',
                    confirmButtonText: 'Cerrar',
                });
            } else {
                Toastify({
                    text: "Información Incorrecta. No se ha podido registrar.",
                    duration: 3000,
                    gravity: "bottom",
                    style: { background: "rgb(119 47 0)" },
                }).showToast();
            }
        });
    }
});

// Función para redirigir a otra página
function paginaPrincipal() {
    console.log("Redirigiendo a la página principal...");
    window.location.href = '../index.html';
}
