document.addEventListener("DOMContentLoaded", () => {
    cargarContenidoStreaming();
});

async function cargarContenidoStreaming() {
    // API real de internet de series de TV. 
    const urlAPI = "https://api.tvmaze.com/shows/44778";

    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor de streaming: ${respuesta.status}`);
        }

        // Convertimos la respuesta a JSON
        const datosSerie = await respuesta.json();

        // Mandamos los datos a la función que dibuja la tarjeta
        mostrarSerie(datosSerie);

    } catch (error) {
        console.error("Error al mapear el streaming:", error);
        document.getElementById("contenedor-streaming").innerHTML = 
            `<p class="error">Error al conectar con el servicio de streaming.</p>`;
    }
}

function mostrarSerie(serie) {
    const contenedor = document.getElementById("contenedor-streaming");

    // Inyectamos los datos reales de la API en nuestra tarjeta estilo Netflix
    contenedor.innerHTML = `
        <div class="tarjeta-streaming">
            <img src="${serie.image.medium}" alt="Póster de ${serie.name}" class="poster">
            
            <div class="info-serie">
                <h2>${serie.name}</h2>
                
                <p class="rating">⭐ Calificación: ${serie.rating.average || 'N/A'} / 10</p>
                
                <p><strong>Géneros:</strong> ${serie.genres.join(", ")}</p>
                <p><strong>Idioma original:</strong> ${serie.language}</p>
                
                <div class="sinopsis">
                    <strong>Sinopsis:</strong>
                    ${serie.summary}
                </div>
            </div>
        </div>
    `;
}