document.addEventListener('DOMContentLoaded', async () => {
    await getData();
    inicializarEventos();
});

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let listaAdopcion = [];

// Guardar carrito en localStorage
const guardarCarrito = () => localStorage.setItem('carrito', JSON.stringify(carrito));

// Función para inicializar eventos globales
function inicializarEventos() {
    document.getElementById('modal-adoptar').addEventListener('click', agregarCarrito);
    document.getElementById('modal-abrir-ca').addEventListener('click', mostrarCarrito);
    document.getElementById('modal-cerrar-ca').addEventListener('click', cerrarTodosLosModales);
    document.getElementById('modal-cerrar').addEventListener('click', cerrarTodosLosModales);
    document.getElementById('modal-firmar').addEventListener('click', firmarPapeles);
    document.getElementById('checkbox-terminos').addEventListener('change', verificarCondiciones);
    document.getElementById('btn-login').addEventListener('click', )
}

 const datosAdoptante = [
/*      { nombreInput : document.getElementById('nombre')},
     { apellidoInput : document.getElementById('apellido')}, */
     { emailInput : document.getElementById('email')}
 ]

// Obtener datos de las APIs
//The cat api
const cat_key = 'live_6InE9GSfGzZY1AvZ2KIk0eiV19CUggQOl8XLxhEieaQEWxZ5SYRhXqWanSINmNVo'
catApi = `https://api.thecatapi.com/v1/images/search?limit=10&&api_key=${cat_key}`
//The cat api
const dog_key = 'live_LQcKWl2cgjCUzl8kbjgmKRCJLrXzRe8hMIMGm7XNuTX5TrC7jfktNVsILeC92A2K'
dogApi = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${dog_key}`
//// ==== RENDERIZAR MASCOTAS ==== ////

const getData = async () => {
    try {
        const [catRespuesta, dogRespuesta] = await Promise.all([fetch(catApi), fetch(dogApi)]);
        const gatos = await catRespuesta.json();
        const perros = await dogRespuesta.json();

        // Asignación de imágenes a las mascotas
        Mascotas.forEach((mascota) => {
            if (mascota.especie === 'gato' && gatos.length > 0) {
                mascota.img = gatos.pop().url;
            } else if (mascota.especie === 'perro' && perros.length > 0) {
                mascota.img = perros.pop().url;
            }
        });

        // Renderizar las mascotas luego de obtener las imágenes
        renderizarMascotas(Mascotas, 'mascotasLista');

    } catch (e) {
        console.error("Error al obtener información de las APIs", e);
    }
};

// Renderizar mascotas
function renderizarMascotas(mascotasArray, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';

    mascotasArray.forEach((mascota, index) => {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota');
        mascotaDiv.dataset.id = index;

        const mascotaImg = document.createElement('img');
        mascotaImg.src = mascota.img;
        mascotaImg.alt = mascota.nombre;
        mascotaImg.classList.add('mascota-img');
        mascotaImg.addEventListener('click', () => abrirModal('modal', index));

        const mascotaNombre = document.createElement('h3');
        mascotaNombre.textContent = mascota.nombre;

        mascotaDiv.appendChild(mascotaImg);
        mascotaDiv.appendChild(mascotaNombre);
        contenedor.appendChild(mascotaDiv);
    });
}

// Filtros
const botonPerro = document.getElementById('perro');
const botonGato = document.getElementById('gato');
const botonTodos = document.getElementById('todos')

const mascotasArray = Mascotas;
botonGato.addEventListener('click',() =>{
    const filtrarGatos = Mascotas.filter(mascota => mascota.especie === 'gato');
    renderizarMascotas(filtrarGatos, 'mascotasLista');
});
botonPerro.addEventListener('click',() =>{
    const filtrarPerros = Mascotas.filter(mascota => mascota.especie === 'perro');
    renderizarMascotas(filtrarPerros, 'mascotasLista');
}); 
botonTodos.addEventListener('click', () => {
    renderizarMascotas(Mascotas, 'mascotasLista');
});


// Agregar mascota al carrito
function agregarCarrito() {
    const index = document.getElementById('modal-adoptar').dataset.mascotaId;

    if (!listaAdopcion.includes(index)) {
        listaAdopcion.push(index);
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

    listaAdopcion.forEach((index) => {
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
    listaAdopcion = listaAdopcion.filter((id) => id !== index);
    mostrarCarrito();
}

///// FIRMAR PAPELES
const firmarPapeles = document.getElementById('modal-firmar')
const checkbox = document.getElementById('checkbox-terminos')


//Eventos
checkbox.addEventListener('change', verificarCondiciones);
/* datosAdoptante.forEach(inputInf => {
    const input = Object.values(inputInf)[0];
    input.addEventListener('input', verificarCondiciones);
}) */
firmarPapeles.addEventListener('click', () => {
    // Verificar si hay mascotas en el carrito y si las condiciones están verificadas
    if (carrito.length > 0 && condicionesVerificadas()) {
        cerrarTodosLosModales();
        Swal.fire({
            title: 'FELICIDADES!',
            text: 'Acabas de conseguir un nuevo amigo. ¡Recuerda alimentarlo y mimarlo! No lo olvides.',
            icon: 'success',
            confirmButtonText: 'cerrar',
        });
    } else {
        Toastify({
            text: "Falta información en este carrito. Revisa si hay mascotas o no has firmado los términos",
            duration: 3000,
            gravity: "bottom",
            style: { background: "rgb(119 47 0)" },
        }).showToast();
    }
    // guardarDatosAdoptante();
});

// Función para verificar las condiciones
function verificarCondiciones() {
    firmarPapeles.disabled = !checkbox.checked;
}

// Función para verificar si las condiciones se cumplen
function condicionesVerificadas() {
    return checkbox.checked;
}

// Abrir y cerrar modales
// Función para abrir modales
function abrirModal(modalId, index = null) {
    cerrarTodosLosModales();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }

    if (index !== null) {
        const mascota = Mascotas[index];
        if (mascota) {
            document.getElementById('modal-name').innerText = mascota.nombre;
            document.getElementById('modal-img').src = mascota.img;
            document.getElementById('modal-genero').innerText = `Género: ${mascota.genero}`;
            document.getElementById('modal-edad').innerText = `Edad: ${mascota.edad}`;
            document.getElementById('modal-esterilizado').innerText = `Estado: ${mascota.esterilizado}`;
            document.getElementById('modal-hobbies').innerText = `Hobbies: ${mascota.hobbies}`;

            // Botón de adopción
            const adoptarButton = document.getElementById('modal-adoptar');
            if (adoptarButton) {
                adoptarButton.dataset.mascotaId = index;
                adoptarButton.innerText = "Adoptar";
            }
        }
    }
}

function cerrarTodosLosModales() {
    document.querySelectorAll('.modal').forEach((modal) => {
        modal.style.display = 'none';
    });
}

//GALERIA
let index = 0;

document.getElementById('next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const galeriaContainer = document.querySelector('.galeria-container');
    const totalImagenes = document.querySelectorAll('.galeria-item').length;

    index = (index + direction + totalImagenes) % totalImagenes;
   const offset = -index * 100;

    galeriaContainer.style.transform = `translateX(${offset}%)`;
}

