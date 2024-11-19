/* Objeto mascotas */
const Mascotas = [
    //Perros
    {
        id: 1,
        especie: "perro",
        nombre: 'Olivia',
        img:'./img/perro_1.jpg',
        genero:'hembra',
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta pasear, olfatear y perseguir al cartero',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 2,
        especie: "perro",
        nombre: 'Goliat',
        img:'./img/perro_2.jpg',
        genero:'macho',
        edad:'adulto', 
        hobbies:'A este adorable peludo le gusta aprender trucos y pasear',
        esterilizado: 'No esterilizado' 
    },
    {
        id: 3,
        especie: "perro",
        nombre: 'Pompón',
        img:'./img/perro_3.jpg',
        genero:'hembra',edad:'cachorro', 
        hobbies:'A este adorable peludo le gusta jugar y saltar',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 4,
        especie: "perro",
        nombre: 'Felipe',
        img:'./img/perro_4.jpg',
        genero:'macho',
        edad:'anciano', 
        hobbies:'A este adorable peludo le gusta dormir y comer',
        esterilizado:'No esterilizado' 
    },
    {
        id: 5,
        especie: "perro",
        nombre: 'Firulais',
        img:'./img/perro_5.jpg',
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
        img:'./img/gato_1.jpg', 
        genero:'macho' ,
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta comer y jugar con ovillos de lana', 
        esterilizado: 'Esterilizado' 
    },
    {
        id: 7,
        especie: "gato",
        nombre:'Bruno',
        img:'./img/gato_2.jpg',
        genero:'macho', 
        edad:'cachorro',
        hobbies: 'A este adorable peludo le gusta dormir y mirar a la nada',
        esterilizado: 'Esterilizado' 
    },
    {
        id: 8,
        especie: "gato",
        nombre:'Mila',
        img:'./img/gato_3.jpg' ,
        genero:'hembra',
        edad:'anciana', 
        hobbies:'A este adorable peludo le gusta dormir y recibir caricias',
        esterilizado: 'No esterilizado' 
    },
    {
        id: 9,
        especie: "gato",
        nombre:'Canela', 
        img:'./img/gato_4.jpg' ,
        genero:'hembra',
        edad:'adulta',
        hobbies: 'A este adorable peludo le gusta cantar y lamerse',
        esterilizado: 'No esterilizado'
    },
    {
        id: 10,
        especie: "gato",
        nombre:'Princesa', 
        img:'./img/gato_5.jpg' ,
        genero:'hembra',
        edad:'adulta', 
        hobbies:'A este adorable peludo le gusta lamerse y mirar con altanería',
        esterilizado: 'Esterilizado'
    }
]

// Genera elementos de mascotas en el HTML
Mascotas.forEach((mascota, index) => {
    const div = document.createElement('div');
    div.classList.add('mascota');
    div.dataset.id = index;

    div.innerHTML = `
        <img src="${mascota.img}" alt="${mascota.nombre}" class="mascota-img">
        <h3>${mascota.nombre}</h3>
    `;
    
    document.getElementById('perros-container').appendChild(div);
    document.getElementById('gatos-container').appendChild(div);

});
