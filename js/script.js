document.addEventListener('DOMContentLoaded', async () => {
    await getData();
    inicializarEventos();
});

// Obtener datos de las APIs
//The cat api
const cat_key = 'live_6InE9GSfGzZY1AvZ2KIk0eiV19CUggQOl8XLxhEieaQEWxZ5SYRhXqWanSINmNVo'
catApi = `https://api.thecatapi.com/v1/images/search?limit=10&&api_key=${cat_key}`
//The cat api
const dog_key = 'live_LQcKWl2cgjCUzl8kbjgmKRCJLrXzRe8hMIMGm7XNuTX5TrC7jfktNVsILeC92A2K'
dogApi = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${dog_key}`

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

// Función para inicializar eventos globales
function inicializarEventos() {
    document.getElementById('modal-adoptar').addEventListener('click', agregarCarrito);
    document.getElementById('modal-abrir-ca').addEventListener('click', mostrarCarrito);
    document.getElementById('modal-cerrar-ca').addEventListener('click', cerrarTodosLosModales);
    document.getElementById('modal-cerrar').addEventListener('click', cerrarTodosLosModales);
    document.getElementById('modal-firmar').addEventListener('click', firmarPapeles);
    document.getElementById('checkbox-terminos').addEventListener('change', verificarCondiciones);

    const inputsAdicionales = document.querySelectorAll('.datos-adicionales input');
    inputsAdicionales.forEach(input => input.addEventListener('input', verificarCondiciones));
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



// Abrir y cerrar modales


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

