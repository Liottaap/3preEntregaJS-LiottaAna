
const datosAdoptante = [
    { emailInput : document.getElementById('email')},
    { passlInput : document.getElementById('pass')},
    { nombreInput : document.getElementById('nombre')},
    { apellidoInput : document.getElementById('apellido')},
    { emailInput : document.getElementById('dir')},
    { emailInput : document.getElementById('tel')}
    ]

// Guardar usuario en localStorage
const usuario = JSON.parse(localStorage.getItem('usuario')) || [];
const guardarUsuario = () => localStorage.setItem('usuario', JSON.stringify(usuario));

//Guardar datos del registro
const guardarRegistro = document.getElementById("btnRedir")
guardarRegistro.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if(email !== '' && pass !== '' && pass.length > 8){
        const datosRegistro = {email, pass};

        usuario.push(datosRegistro);
        console.log('se guardó correctamente');
        guardarUsuario();

    paginaPrincipal()
    }else {
        alert('holiwis, escribiste mal todo')
    }
});

 function paginaPrincipal(){
    window.location.href = '../index.html';
}
