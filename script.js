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

/* Modal */

function abrirModal(mascotaId) {
    const mascota = Mascotas[mascotaId];
    document.getElementById('modal-name').innerText =  mascota.nombre;
    document.getElementById('modal-img').src = mascota.img;
    document.getElementById('modal-genero').innerText = `Genero: ${mascota.genero}`;
    document.getElementById('modal-edad').innerText = `Edad: ${mascota.edad}`;
    document.getElementById('modal-esterilizado').innerText = `Estado: ${mascota.esterilizado}`;
    document.getElementById('modal-hobbies').innerText = `Hobbies: ${mascota.hobbies}`;

    // Mostrar el modal
    document.getElementById('modal').style.display = 'flex';
}

//Evento para hacer click en el div de la mascota

const mascotasElements = document.querySelectorAll('.mascota');
mascotasElements.forEach(mascota => {
    mascota.addEventListener('click', () => abrirModal(mascota.id));
});


// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

// Asigna el evento de clic al botón de cerrar
document.getElementById('modal-cerrar').addEventListener('click', cerrarModal);

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