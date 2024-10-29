/* Objeto mascotas */
const Mascotas = {
    //Perros
    'perro-1': {nombre: 'Olivia',img:'./img/perro_1.jpg',genero:'hembra',edad:'cachorro',hobbies: 'A este adorable peludo le gusta pasear, olfatear y perseguir al cartero',esterilizado: 'esterilizada'},
    'perro-2': {nombre: 'Goliat',img:'./img/perro_2.jpg',genero:'macho',edad:'adulto', hobbies:'A este adorable peludo le gusta aprender trucos y pasear',esterilizado: 'no esterizado'},
    'perro-3': {nombre: 'Pomóon',img:'./img/perro_3.jpg',genero:'hembra',edad:'cachorro', hobbies:'A este adorable peludo le gusta jugar y saltar',esterilizado: 'esterilizada'},
    'perro-4': {nombre: 'Felipe',img:'./img/perro_4.jpg',genero:'macho',edad:'anciano', hobbies:'A este adorable peludo le gusta dormir y comer',esterilizado:'no esterilizado'},
    'perro-5': {nombre: 'Firulais',img:'./img/perro_5.jpg',genero:'macho',edad:'anciano', hobbies:'A este adorable peludo le gusta correr y cazar',esterilizado: 'esterilizado'},
    //Gatos
    'gato-1' : {nombre:'Anvorgueso',img:'./img/gato_1.jpg' , genero:'macho' ,edad:'cachorro' ,hobbies: 'A este adorable peludo le gusta comer y jugar con ovillos de lana', esterilizado:'esterilizado'},
    'gato-2' : {nombre:'Bruno',img:'./img/gato_2.jpg',genero:'macho', edad:'cachorro',hobbies: 'A este adorable peludo le gusta dormir y mirar a la nada',esterilizado:'esterilizado'},
    'gato-3' : {nombre:'Mila',img:'./img/gato_3.jpg' ,genero:'hembra',edad:'anciana', hobbies:'A este adorable peludo le gusta dormir y recibir caricias',esterilizado:'no esterilizada'},
    'gato-4' : {nombre:'Canela', img:'./img/gato_4.jpg' ,genero:'hembra',edad:'adulta',hobbies: 'A este adorable peludo le gusta cantar y lamerse',esterilizado:'no esterilizada'},
    'gato-5' : {nombre:'Princesa', img:'./img/gato_5.jpg' ,genero:'hembra',edad:'adulta', hobbies:'A este adorable peludo le gusta lamerse y mirar con altanería',esterilizado:'esterilizada'},
}
// Array de lista de adopción
let listaAdopcion = [];

// Función para abrir un modal específico y cargar la información de la mascota si aplica
function abrirModal(modalId, mascotaId = null) {
    cerrarTodosLosModales();

    const modal = document.getElementById(modalId);
    modal.style.display = 'flex'; 

    if (mascotaId) {
        // Si hay un ID de mascota, carga la información en el modal
        const mascota = Mascotas[mascotaId];
        document.getElementById('modal-name').innerText = mascota.nombre;
        document.getElementById('modal-img').src = mascota.img;
        document.getElementById('modal-genero').innerText = `Genero: ${mascota.genero}`;
        document.getElementById('modal-edad').innerText = `Edad: ${mascota.edad}`;
        document.getElementById('modal-esterilizado').innerText = `Estado: ${mascota.esterilizado}`;
        document.getElementById('modal-hobbies').innerText = `Hobbies: ${mascota.hobbies}`;

        // Botón de adopción
        const adoptarButton = document.getElementById('modal-adoptar');
        adoptarButton.dataset.mascotaId = mascotaId;
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
    const mascotaId = adoptarButton.dataset.mascotaId;

    if (!listaAdopcion.includes(mascotaId)) {
        listaAdopcion.push(mascotaId);
        adoptarButton.innerText = "Agregado";
    } else {
        alert("Esta mascota ya está en la lista de adopción.");
    }
}

// Eventos para abrir el modal de información de la mascota al hacer clic
document.querySelectorAll('.mascota').forEach(mascota => {
    mascota.addEventListener('click', () => abrirModal('modal', mascota.id));
});

// Asigna el evento al botón "Adoptar" dentro del modal
document.getElementById('modal-adoptar').addEventListener('click', agregarCarrito);

// Evento de clic al botón de cerrar en el modal de información
document.getElementById('modal-cerrar').addEventListener('click', cerrarTodosLosModales);



/* MODAL CARRITO / FIRMAR PAPELES */


function mostrarCarrito() {
    const listaContainer = document.querySelector('.lista-ad-container');
    listaContainer.innerHTML = '';

    listaAdopcion.forEach(mascotaId => {
        const mascota = Mascotas[mascotaId];

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

        // Agrega el evento para eliminar la mascota de la lista
        eliminarLink.addEventListener('click', () => eliminarDelCarrito(mascotaId));

        // Estructura los elementos y los añade al contenedor
        div.appendChild(h3);
        div.appendChild(eliminarLink);
        li.appendChild(img);
        li.appendChild(div);
        listaContainer.appendChild(li);
    });
        // Muestra el modal del carrito
        abrirModal('modal-ca');
}


// Función para eliminar una mascota del carrito
function eliminarDelCarrito(mascotaId) {
    listaAdopcion = listaAdopcion.filter(id => id !== mascotaId);
    mostrarCarrito(); // Vuelve a mostrar el carrito actualizado
}

// Asigna el evento al botón o enlace que abre el modal del carrito
document.getElementById('modal-abrir-ca').addEventListener('click', mostrarCarrito);

//boton cerrar en carrito

document.getElementById('modal-cerrar-ca').addEventListener('click', cerrarTodosLosModales);


/* // Para almacenar las mascotas adoptadas
let listaAdopcion = []; 

//Para el ciclo while
let continuarAdoptando = true;

while (continuarAdoptando) {
    // Preguntar el tipo de mascota que quiere adoptar
    let tipoMascota = prompt("¿Te gustaría adoptar un gato o un perro? (Escribe 'gato' o 'perro')").toLowerCase();

    ///EL CAMINO DE LA OSCURIDAD
    if (tipoMascota === "gato") {
        //lista de gatos
        let nombreGatos = gatos.map(gato => gato.nombre).join("\n")
        let seleccionGato = prompt(`Has seleccionado Gato. Estos son los que tenemos disponibles:\n${nombreGatos}\nPara seleccionar, inserta el nombre correspondiente:`).toLowerCase();
        
        // Buscar el gato seleccionado en la lista
        let indexGato = gatos.findIndex(gato => gato.nombre.toLowerCase() === seleccionGato);
        
        // Verificar si el gato existe en la lista
        if (indexGato !== -1) {
            let gatoAdoptado = gatos[indexGato];
            alert(`
            ¡FELICIDADES! 
            Has adoptado a ${gatoAdoptado.nombre}.
            Este gato está: ${gatoAdoptado.esterilizado}
            Recuerda que sus hobbies son:
            ${gatoAdoptado.hobbies}.
            No lo olvides!`);
            
            // Añadir el gato adoptado a la lista de adopciones
            listaAdopcion.push(gatoAdoptado.nombre);

            // Eliminar el gato adoptado de la lista
            gatos.splice(indexGato, 1);
        } else {
            alert('Respuesta inválida, por favor inserta un nombre válido.');
        }

    ///EL CAMINO DE LA LUZ
    } else if (tipoMascota === "perro") {
        //lista de perros
        let nombrePerros = perros.map(perro => perro.nombre).join("\n")
        let seleccionPerro = prompt(`Has seleccionado Perro. Estos son los que tenemos disponibles:\n${nombrePerros}\nPara seleccionar, inserta el nombre correspondiente:`).toLowerCase();
        
        // Buscar el perro en la lista
        let indexPerro = perros.findIndex(perro => perro.nombre.toLowerCase() === seleccionPerro);
        
        // Verificar si el perro existe
        if (indexPerro !== -1) {
            let perroAdoptado = perros[indexPerro];
            alert(`
            ¡FELICIDADES! 
            Has adoptado a ${perroAdoptado.nombre}.
            Este perro está: ${perroAdoptado.esterilizado}
            Recuerda que sus hobbies son:
            ${perroAdoptado.hobbies}.
            No lo olvides!`);
            
            // Añadir el perro adoptado a la lista
            listaAdopcion.push(perroAdoptado.nombre);

            // Eliminar el perro adoptado de la lista
            perros.splice(indexPerro, 1);
        } else {
            alert('Respuesta inválida, por favor inserta un nombre válido.');
        }
    }

    // Preguntar si quiere seguir adoptando
    continuarAdoptando = prompt("¿Te gustaría adoptar otra mascota? Responde 'si' o 'no'.").toLowerCase();

    // Si el usuario no quiere adoptar más.. mostrar la lista de mascotas adoptadas
    if (continuarAdoptando !== "si") {
        if (listaAdopcion.length > 0) {
            alert(`Gracias por adoptar. Has adoptado las siguientes mascotas:\n${listaAdopcion.join(", ")}.\n¡Por favor, cuídalas mucho!`);
        } else {
            alert('No has adoptado ninguna mascota, pero te esperamos si cambias de opinión. ¡Gracias por visitarnos!');
        }
        break;
    }

    // Si ya no hay más mascotas disponibles, terminar el ciclo
    if (gatos.length === 0 && perros.length === 0) {
        alert('¡Wow!... No quedan más mascotas.');
        continuarAdoptando = false;
        break;
    }
} */