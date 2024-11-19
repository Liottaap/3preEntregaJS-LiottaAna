const Amigos = [

    {
        img: "../img/amigos-4.jpg"
    },
    {
        img: "../img/amigos-5.jpg"
    },
    {
        img: "../img/amigos-6.jpg"
    },
    {
        img: "../img/amigos-7.jpg"
    },
    {
        img: "../img/amigos-8.jpg"
    },
    {
        img: "../img/amigos-9.jpg"
    },
    {
        img: "../img/amigos-10.jpg"
    },
    {
        img: "../img/amigos-11.jpg"
    },
    {
        img: "../img/amigos-12.jpg"},
    {
        img: "../img/amigos-2.jpg"
    },
]




// Genera las imagenes de la galeria de Amigos
Amigos.forEach((amigo, index) => {
    const div = document.createElement('div');
    div.classList.add('galeria-item');
    div.dataset.id = index;

    div.innerHTML = `
        <img src="${amigo.img}" alt="">
    `;
    
    document.getElementById('galeria-container').appendChild(div);

});