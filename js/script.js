document.addEventListener('DOMContentLoaded', () => {
    renderizarMascotas(Mascotas);
});

let listaAdopcion = [];
// carrito
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//datos adoptante
const adoptante = JSON.parse(localStorage.getItem('adoptante')) || []

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Función para abrir un modal específico y cargar la información de la mascota si aplica
function abrirModal(modalId, index = null) {
    cerrarTodosLosModales();

    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';

    if (index !== null) {
        // Si hay un índice, carga la información en el modal
        const mascota = Mascotas[index];
        document.getElementById('modal-name').innerText = mascota.nombre;
        document.getElementById('modal-img').src = mascota.img;
        document.getElementById('modal-genero').innerText = `Género: ${mascota.genero}`;
        document.getElementById('modal-edad').innerText = `Edad: ${mascota.edad}`;
        document.getElementById('modal-esterilizado').innerText = `Estado: ${mascota.esterilizado}`;
        document.getElementById('modal-hobbies').innerText = `Hobbies: ${mascota.hobbies}`;

        // Botón de adopción
        const adoptarButton = document.getElementById('modal-adoptar');
        adoptarButton.dataset.mascotaId = index;
        adoptarButton.innerText = "Adoptar";
    }
}

// Función para cerrar todos los modales
function cerrarTodosLosModales() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Filtros
const botonEsterilizado = document.getElementById('esterilizado');
const botonMacho = document.getElementById('macho');
const botonHembra = document.getElementById('hembra');
const botonTodos = document.getElementById('todos');

const mascotasArray = Mascotas;

botonTodos.addEventListener('click', () => renderizarMascotas(mascotasArray));

botonEsterilizado.addEventListener('click', () => {
    const mascotasEsterilizadas = mascotasArray.filter(mascota => mascota.esterilizado === 'Esterilizado');
    renderizarMascotas(mascotasEsterilizadas);
});

botonMacho.addEventListener('click', () => {
    const mascotasMachos = mascotasArray.filter(mascota => mascota.genero === 'macho');
    renderizarMascotas(mascotasMachos);
});

botonHembra.addEventListener('click', () => {
    const mascotasHembras = mascotasArray.filter(mascota => mascota.genero === 'hembra');
    renderizarMascotas(mascotasHembras);
});



//// ==== RENDERIZAR MASCOTAS ==== ////

function renderizarMascotas(mascotas) {
    const perrosContainer = document.getElementById('perros-container');
    const gatosContainer = document.getElementById('gatos-container');

    // Limpiar los contenedores
    perrosContainer.innerHTML = '';
    gatosContainer.innerHTML = '';

    // Filtrar y agregar mascotas a los contenedores correspondientes
    mascotas.forEach((mascota, index) => {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota');
        mascotaDiv.dataset.id = index;

        mascotaDiv.innerHTML = `
            <img src="${mascota.img}" alt="${mascota.nombre}" class="mascota-img" onerror="this.src='images/default.jpg'">
            <h3>${mascota.nombre}</h3>
        `;

        if (mascota.especie === 'perro') {
            perrosContainer.appendChild(mascotaDiv);
        } else if (mascota.especie === 'gato') {
            gatosContainer.appendChild(mascotaDiv);
        }
    });

    
    perrosContainer.addEventListener('click', (event) => {
        if (event.target.closest('.mascota')) {
            const mascotaDiv = event.target.closest('.mascota');
            const mascotaIndex = parseInt(mascotaDiv.dataset.id);
            abrirModal('modal', mascotaIndex);
        }
    });

    gatosContainer.addEventListener('click', (event) => {
        if (event.target.closest('.mascota')) {
            const mascotaDiv = event.target.closest('.mascota');
            const mascotaIndex = parseInt(mascotaDiv.dataset.id);
            abrirModal('modal', mascotaIndex);
        }
    });
}

// Función para agregar mascota al carrito de adopción
function agregarCarrito() {
    const adoptarButton = document.getElementById('modal-adoptar');
    const mascotaIndex = adoptarButton.dataset.mascotaId;

    if (!listaAdopcion.includes(mascotaIndex)) {
        listaAdopcion.push(mascotaIndex);
        adoptarButton.innerText = "Agregado";
    } else {
        alert(`Esta mascota ya está en la lista de adopción.
        Para quitarla, hazlo desde el carrito.`);
    }
    guardarCarrito();
}

const adoptarBoton = document.getElementById('modal-adoptar').addEventListener('click', agregarCarrito);

// Función para mostrar el carrito
function mostrarCarrito() {
    const listaContainer = document.querySelector('.lista-ad-container');
    listaContainer.innerHTML = '';

    listaAdopcion.forEach(mascotaIndex => {
        const mascota = Mascotas[mascotaIndex]; 

        // Crear elementos HTML para cada mascota
        const li = document.createElement('li');
        li.className = 'lista-ad';

        const img = document.createElement('img');
        img.src = mascota.img;
        img.alt = mascota.nombre;
        img.id = 'modal-img-ad';

        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.id = 'modal-name-ad';
        h3.textContent = mascota.nombre;

        const eliminarLink = document.createElement('a');
        eliminarLink.href = '#';
        eliminarLink.textContent = 'Quitar mascota';
        eliminarLink.id = 'modal-eliminar';

        // Agrega el evento para eliminar la mascota de la lista y evito que se actualice la pantalla por defecto a causa del form
        eliminarLink.addEventListener('click', (event) => {
            event.preventDefault()
            eliminarDelCarrito(mascotaIndex);
        });

        
        div.appendChild(h3);
        div.appendChild(eliminarLink);
        li.appendChild(img);
        li.appendChild(div);
        listaContainer.appendChild(li);
    });
    
    abrirModal('modal-ca');
}

// Función para eliminar una mascota del carrito
function eliminarDelCarrito(mascotaIndex) {
    listaAdopcion = listaAdopcion.filter(index => index !== mascotaIndex);
    mostrarCarrito();
}


///// FIRMAR PAPELES
const firmarPapeles = document.getElementById('modal-firmar')
const checkbox = document.getElementById('checkbox-terminos')
const datosAdoptante = [
    { nombreInput : document.getElementById('nombre')},
    { apellidoInput : document.getElementById('apellido')},
    { emailInput : document.getElementById('email')},
    { telefonoInput : document.getElementById('tel')}
]

//Eventos
checkbox.addEventListener('change', verificarCondiciones);
datosAdoptante.forEach(inputInf => {
    const input = Object.values(inputInf)[0];
    input.addEventListener('input', verificarCondiciones);
})
firmarPapeles.addEventListener('click', () => {
    verificarCondiciones()
    guardarDatosAdoptante()
    cerrarTodosLosModales()
    alert(`
    Felicidades ${datosAdoptante[0].nombreInput.value}, te enviaremos a tu correo electrónico la información necesaria para poder reunirte a ti y a tu nueva mascota pronto!.
    `)

})

function verificarCondiciones() {
    // Verifica si el input esta completadoy si el checkbox está marcado
    const todosLlenos = datosAdoptante.every(inputInf => {
        const input = Object.values(inputInf)[0];
        return input.value.trim() !== '';
    });

    if (todosLlenos && checkbox.checked) {
        firmarPapeles.disabled = false;

    } else {
        firmarPapeles.disabled = true;
    }
}

//Guardar datos del adoptante
function guardarDatosAdoptante() {
    const datosAdoptante = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('tel').value.trim(),
    }
    localStorage.setItem('adoptante', JSON.stringify(datosAdoptante))
}

document.getElementById('modal-abrir-ca').addEventListener('click', mostrarCarrito);
document.getElementById('modal-cerrar-ca').addEventListener('click', cerrarTodosLosModales);
document.getElementById('modal-cerrar').addEventListener('click', cerrarTodosLosModales);



//agregar despues actualizacion de las mascotas que ya no estan disponibles para adoptar.
