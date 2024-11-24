document.addEventListener('DOMContentLoaded', async () => {
    await getData();

});

// carrito
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//datos adoptante
// const adoptante = JSON.parse(localStorage.getItem('adoptante')) || []

let listaAdopcion = [];

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


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


function renderizarMascotas(mascotasArray, mascotasLista) {
    // Obtener el contenedor por su ID
    const listadoMascotas = document.getElementById(mascotasLista);

/*     // Verificar si el contenedor existe
    if (!listadoMascotas) {
        console.error(`Error: El contenedor con ID "${mascotasLista}" no existe en el DOM.`);
        return;
    } */

    // Limpiar el contenido anterior
    listadoMascotas.innerHTML = '';

    // Recorrer el array de mascotas y crear los elementos correspondientes
    mascotasArray.forEach((mascota, index) => {
        // Crear el contenedor principal de cada mascota
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota'); // Agregar clase CSS
        mascotaDiv.dataset.id = index; // Atributo data-id con el índice

        const mascotaContent = document.createElement('div');
        mascotaContent.classList.add('mascota-content');
        
        // Crear la imagen y agregarle un evento
        const mascotaImg = document.createElement('img');
        mascotaImg.src = mascota.img;
        mascotaImg.alt = mascota.nombre;
        mascotaImg.classList.add('mascota-img');

        // Evento para abrir el modal al hacer clic en la imagen
        mascotaImg.addEventListener('click', () => abrirModal('modal', index));

        // Crear el nombre
        const mascotaNombre = document.createElement('h3');
        mascotaNombre.textContent = mascota.nombre;

        // Agregar la imagen y el nombre al contenedor
        mascotaDiv.appendChild(mascotaImg);
        mascotaDiv.appendChild(mascotaNombre);

        listadoMascotas.appendChild(mascotaDiv);
    });
}
// Filtros
const botonPerro = document.getElementById('perro');
const botonGato = document.getElementById('gato');
 

 const mascotasArray = Mascotas;
botonGato.addEventListener('click',() =>{
    const filtrarGatos = Mascotas.filter(mascota => mascota.especie === 'gato');
    renderizarMascotas(filtrarGatos, 'mascotasLista');
});
botonPerro.addEventListener('click',() =>{
    const filtrarPerros = Mascotas.filter(mascota => mascota.especie === 'perro');
    renderizarMascotas(filtrarPerros, 'mascotasLista');
}); 


/* MODALES BOTONES */

document.getElementById('modal-abrir-ca').addEventListener('click', mostrarCarrito);
document.getElementById('modal-cerrar-ca').addEventListener('click', cerrarTodosLosModales);
document.getElementById('modal-cerrar').addEventListener('click', cerrarTodosLosModales);

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



// Función para agregar mascota al carrito de adopción
function agregarCarrito() {
    const adoptarButton = document.getElementById('modal-adoptar');
    const mascotaIndex = adoptarButton.dataset.mascotaId;

    if (!listaAdopcion.includes(mascotaIndex)) {
        listaAdopcion.push(mascotaIndex);
        adoptarButton.innerText = "Agregado";
        Toastify({
            text: "Agregado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "rgb(28 196 28)",
            },
            onClick: function(){} // Callback after click
          }).showToast(); 
    } else {
        Toastify({
            text: "Esta mascota ya está agregada",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "right",
            stopOnFocus: true,
            style: {
              background: "rgb(119 47 0)",
            },
            onClick: function(){} 
          }).showToast(); 
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
    listaAdopcion = listaAdopcion.filter(index => parseInt(index) !== parseInt(mascotaIndex));
    mostrarCarrito();
}





///// FIRMAR PAPELES
const firmarPapeles = document.getElementById('modal-firmar')
const checkbox = document.getElementById('checkbox-terminos')
// const datosAdoptante = [
//     { nombreInput : document.getElementById('nombre')},
//     { apellidoInput : document.getElementById('apellido')},
//     { emailInput : document.getElementById('email')},
//     { telefonoInput : document.getElementById('tel')}
// ]

//Eventos
checkbox.addEventListener('change', verificarCondiciones);
/* datosAdoptante.forEach(inputInf => {
    const input = Object.values(inputInf)[0];
    input.addEventListener('input', verificarCondiciones);
}) */
firmarPapeles.addEventListener('click', () => {
    verificarCondiciones()
    // guardarDatosAdoptante()
    cerrarTodosLosModales()
    Swal.fire({
        title: 'FELICIDADES!',
        text: 'Acabas de conseguir un nuevo amigo. ¡Recuerda alimentarlo y mimarlo! No lo olvides.',
        icon: 'success',
        confirmButtonText: 'cerrar',
      });
})

function verificarCondiciones() {
        if (checkbox.checked) {
            firmarPapeles.disabled = false;
    
        } else {
            firmarPapeles.disabled = true;
        }
}

// //Guardar datos del adoptante
// function guardarDatosAdoptante() {
//     const datosAdoptante = {
//         nombre: document.getElementById('nombre').value.trim(),
//         apellido: document.getElementById('apellido').value.trim(),
//         email: document.getElementById('email').value.trim(),
//         telefono: document.getElementById('tel').value.trim(),
//     }
//     localStorage.setItem('adoptante', JSON.stringify(datosAdoptante))
// }
// Función para abrir un modal específico y cargar la información de la mascota si aplica










const contenedor = document.getElementById('lista-ad');

contenedor.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        // Si el desplazamiento es vertical (deltaY), lo convertimos en desplazamiento horizontal
        contenedor.scrollLeft += e.deltaY; // Desplazamiento horizontal
        e.preventDefault(); // Prevenir el comportamiento predeterminado de desplazamiento vertical
    }
});