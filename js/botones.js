let index = 0;

document.getElementById('prev-button').addEventListener('click', () => {
   navigate(-1);
});

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


