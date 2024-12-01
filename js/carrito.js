// Guardar carrito en localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const guardarCarrito = () => localStorage.setItem('carrito', JSON.stringify(carrito));


// Agregar mascota al carrito
function agregarCarrito() {
    const index = document.getElementById('modal-adoptar').dataset.mascotaId;

    if (!carrito.includes(index)) {
        carrito.push(index);
        console.log(carrito)
        Toastify({
            text: "Mascota agregada al carrito",
            duration: 3000,
            gravity: "bottom",
            style: { background: "rgb(28 196 28)" },
        }).showToast();
    } else {
        Toastify({
            text: "Mascota ya está en el carrito",
            duration: 3000,
            gravity: "bottom",
            style: { background: "rgb(119 47 0)" },
        }).showToast();
    }
    guardarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    const listaContainer = document.getElementById('lista-ad');
    listaContainer.innerHTML = '';

    carrito.forEach((index) => {
        const mascota = Mascotas[index];

        const li = document.createElement('li');
        li.className = 'lista-ad';

        const img = document.createElement('img');
        img.src = mascota.img;
        img.alt = mascota.nombre;

        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = mascota.nombre;

        const eliminarLink = document.createElement('a');
        eliminarLink.href = '#';
        eliminarLink.textContent = 'Quitar mascota';
        eliminarLink.addEventListener('click', (e) => {
            e.preventDefault();
            eliminarDelCarrito(index);
        });

        div.appendChild(h3);
        div.appendChild(eliminarLink);
        li.appendChild(img);
        li.appendChild(div);
        listaContainer.appendChild(li);
    });

    abrirModal('modal-ca');
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
    carrito = carrito.filter((id) => id !== index);
    mostrarCarrito();
}




///// FIRMAR PAPELES


const checkbox = document.getElementById('checkbox-terminos');
//Eventos
checkbox.addEventListener('change', verificarCondiciones);
const btnFirmar = document.getElementById('modal-firmar');
btnFirmar.addEventListener('click', firmarPapeles);


function firmarPapeles() {
    // Verificar si hay mascotas en el carrito y si las condiciones están verificadas
    if (carrito.length > 0 && condicionesVerificadas()) {
        cerrarTodosLosModales();

        Swal.fire({
            title: 'ADOPCIÓN TERMINADA!',
            text: 'Se te enviará la información necesaria a tu correo electrónico.',
            icon: 'success',
            confirmButtonText: 'Cerrar',
        });

    } else {
        Toastify({
            text: "Falta información en este carrito. Revisa si hay mascotas o no has firmado los términos.",
            duration: 3000,
            gravity: "bottom",
            style: { background: "rgb(119 47 0)" },
        }).showToast();
    }
    guardarCarrito()

}

// Función para verificar las condiciones
function verificarCondiciones() {
    const camposCompletos = infoCompletada();
    btnFirmar.disabled = !(checkbox.checked && camposCompletos);
}

// Función para verificar si las condiciones se cumplen
function condicionesVerificadas() {
    return checkbox.checked && infoCompletada();
}

//Para almacenar datos de los inputs
function infoCompletada(){
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('tel').value.trim();
    const direccion= document.getElementById('dir').value.trim();

    return nombre !== '' && apellido !== '' && telefono !== '' && direccion !== '';
}
