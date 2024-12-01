const Mascotas = [
    //Perros
    {
        id: 1,
        especie: "perro",
        nombre: 'Olivia',
        img:'',
        genero:'hembra',
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta pasear, olfatear y perseguir al cartero',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 2,
        especie: "perro",
        nombre: 'Goliat',
        img: '',
        genero:'macho',
        edad:'adulto', 
        hobbies:'A este adorable peludo le gusta aprender trucos y pasear',
        esterilizado: 'No esterilizado' 
    },
    {
        id: 3,
        especie: "perro",
        nombre: 'Pompón',
        img: '',
        genero:'hembra',edad:'cachorro', 
        hobbies:'A este adorable peludo le gusta jugar y saltar',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 4,
        especie: "perro",
        nombre: 'Felipe',
        img: '',
        genero:'macho',
        edad:'anciano', 
        hobbies:'A este adorable peludo le gusta dormir y comer',
        esterilizado:'No esterilizado' 
    },
    {
        id: 5,
        especie: "perro",
        nombre: 'Firulais',
        img: '',
        genero:'macho',
        edad:'anciano', 
        hobbies:'A este adorable peludo le gusta correr y cazar',
        esterilizado: 'Esterilizado' 
    },
    //Gatos
    {
        id: 6,
        especie: "gato",
        nombre:'Anvorgueso',
        img: '', 
        genero:'macho' ,
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta comer y jugar con ovillos de lana', 
        esterilizado: 'Esterilizado' 
    },
    {
        id: 7,
        especie: "gato",
        nombre:'Bruno',
        img: '',
        genero:'macho', 
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta dormir y mirar a la nada',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 8,
        especie: "gato",
        nombre:'Mila',
        img: '',
        genero:'hembra',
        edad:'anciana', 
        hobbies:'A este adorable peludo le gusta dormir y recibir caricias',
        esterilizado: 'No esterilizado' 
    },
    {
        id: 9,
        especie: "gato",
        nombre:'Canela', 
        img: '',
        genero:'hembra',
        edad:'adulta',
        hobbies: 'A este adorable peludo le gusta cantar y lamerse',
        esterilizado: 'No esterilizado'
    },
    {
        id: 10,
        especie: "gato",
        nombre:'Princesa', 
         img: '' ,
        genero:'hembra',
        edad:'adulta', 
        hobbies:'A este adorable peludo le gusta lamerse y mirar con altanería',
        esterilizado: 'Esterilizado'
    }
]



//// ==== RENDERIZAR MASCOTAS ==== ////

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