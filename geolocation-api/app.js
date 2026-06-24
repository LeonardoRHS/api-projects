let mapa;
let marcador; 

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            mostrarPosicion,
            mostrarError,
            {
                enableHighAccuracy: true,
                timeout: 10000, 
                maximumAge: 0   
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización");
    }
}

function mostrarPosicion(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    
    if (!mapa) {
        mapa = L.map('map').setView([latitud, longitud], 16);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(mapa);

       
        marcador = L.marker([latitud, longitud])
            .addTo(mapa)
            .bindPopup("¡Estás aquí!")
            .openPopup();
            
    } else {
        
        mapa.setView([latitud, longitud], 16);
        marcador.setLatLng([latitud, longitud]);
    }
}

function mostrarError(error) {
    console.warn("Error de geolocalización:", error.message);
    alert("No se pudo obtener la ubicación exacta. Asegúrate de dar permisos de ubicación.");
}