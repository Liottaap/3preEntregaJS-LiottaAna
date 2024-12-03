// Guardar usuario en localStorage
const usuario = JSON.parse(localStorage.getItem('usuario')) || [];
const guardarUsuario = () => localStorage.setItem('usuario', JSON.stringify(usuario));
// Guardar usuario en localStorage (arreglo de usuarios)
const guardarUsuarios = (usuarios) => localStorage.setItem('usuarios', JSON.stringify(usuarios));



// Escuchar el evento DOMContentLoaded para asegurar que el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    
    // Escuchar el botón Iniciar Sesion
    const iniciarSesion = document.getElementById('btnInicio');
    if (iniciarSesion) {
        iniciarSesion.addEventListener('click', () => {
            const email = document.getElementById('emailInicio').value.trim();
            const pass = document.getElementById('pass').value.trim();

            const usuarios = JSON.parse(localStorage.getItem('usuario')) || [];
            const usuarioValido = usuarios.find(
                (usuario) => usuario.email === email && usuario.pass === pass
            );

            if (usuarioValido) {
                console.log('Iniciaste sesión completamente');
                localStorage.setItem('usuarioLogueado',JSON.stringify(usuarioValido));
                paginaPrincipal();
            } else {
                alert('Error al iniciar sesión. Vuelve a intentarlo.');
            }
        });
    }

    // Escuchar el botón de registro
    const guardarRegistro = document.getElementById("btnReg");
    if (guardarRegistro) {
        guardarRegistro.addEventListener('click', () => {
            // Obtener valores de los inputs
            const nombreCompleto = document.getElementById('nombreApellido').value.trim();
            const email = document.getElementById('emailR').value.trim();
            const pass = document.getElementById('passR').value.trim();
            const genero = document.getElementById('genero-list').value;
            const edad = parseInt(document.getElementById('edad').value);
            const direccion = document.getElementById('dir').value.trim();
            const telefono = document.getElementById('tel').value.trim();

            const usuarioExistente = usuario.find((u) => u.email === email);
            if (usuarioExistente) {
                Toastify({
                    text: "Este usuario ya existe. Inicia Sesión para continuar.",
                    duration: 3000,
                    gravity: "bottom",
                    style: { background: "rgb(119 47 0)" },
                }).showToast();
            } else if (
                nombreCompleto !== '' &&
                email !== '' &&
                pass !== '' &&
                pass.length > 8 &&
                genero !== '' &&
                !isNaN(edad) &&
                edad >= 18 &&
                direccion !== '' &&
                telefono !== ''
            ) {
                const datosRegistro = { nombreCompleto, email, pass, genero, edad, direccion, telefono };

                // Guardar en el array de usuario y en localStorage
                usuario.push(datosRegistro);
                guardarUsuario();

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
    window.location.href = '../index.html';
}