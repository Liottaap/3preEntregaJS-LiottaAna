// Bienvenida
alert(`Bienvenido/a al CENTRO DE MASCOTAS PATITAS CONTENTAS. 
Muchas mascotas están esperando conseguir un hogar y nuevas oportunidades. 
Afortunadamente contamos con 5 amigos gatunos y 5 perrunos disponibles para que les brindes esa oportunidad.`);

// Información de las mascotas
class Gato{
    constructor(nombre, edad, hobbies, esterilizado){
        this.nombre = nombre;
        this.edad = edad;
        this.hobbies = hobbies;
        this.esterilizado = esterilizado; 
    }
}

class Perro{
    constructor(nombre, edad, hobbies, esterilizado){
        this.nombre = nombre;
        this.edad = edad;
        this.hobbies = hobbies;
        this.esterilizado = esterilizado; 
    }
}
// GATOS

const gatos = [
    new Gato('canela','adulta', 'cantar, lamerse','no esterilizada'),
    new Gato('bruno','cachorro', 'dormir y mirar a la nada','esterilizado'),
    new Gato('princesa','adulta', 'lamerse, mirar con altanería','esterilizada'),
    new Gato('mila','anciana', 'dormir, recibir caricias','no esterilizada'),
    new Gato('hamborgueso','cachorro', 'comer, jugar con ovillos de lana','esterilizado')
]

// PERROS
const perros = [
    new Perro('pompon','cachorro', 'jugar, saltar',' esterilizada'),
    new Perro('felipe','anciano', 'dormir y comer','no esterilizado'),
    new Perro('firulais','anciano', 'correr, cazar','esterilizado'),
    new Perro('goliat','adulto', 'aprender trucos, pasear','no esterizado'),
    new Perro('olivia','cachorro', 'pasear, olfatear, ladrar','esterilizada')
]

// Para almacenar las mascotas adoptadas
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
            alert(`¡Felicidades! Has adoptado a ${gatoAdoptado.nombre}. Asegúrate de alimentarlo, cepillarlo, y quererlo como se merece!`);
            
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
            alert(`¡Felicidades! Has adoptado a ${perroAdoptado.nombre}.
            Sácalo a pasear, báñalo y ¡Asegurate de que no rompa nada!`);
            
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
}