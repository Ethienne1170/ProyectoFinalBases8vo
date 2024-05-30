document.addEventListener('DOMContentLoaded', function() {
    // URL de la API
    const apiUrl = 'http://localhost:3000/plantas/plantas';

    // Contenedor donde se mostrarán los datos
    const plantasContainer = document.getElementById('plantas-container');

    // Función para crear una tarjeta (card) para cada planta
    function createPlantCard(planta) {
        const card = document.createElement('div');
        card.className = 'card';

        // Aquí asume que la API devuelve propiedades 'name', 'description' e 'image'
        card.innerHTML = `
            <h2>${planta.name}</h2>
            <p>${planta.description}</p>
            <img src="${planta.image}" alt="${planta.name}" style="width:100%; height:auto;">
        `;

        plantasContainer.appendChild(card);
    }

    // Usar fetch para obtener los datos de la API
    fetch(apiUrl)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            // Suponiendo que data es un array de plantas
            data.forEach(planta => createPlantCard(planta));
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
            plantasContainer.innerHTML = '<p>Error al obtener los datos.</p>';
        });
});
