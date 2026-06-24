document.addEventListener("DOMContentLoaded", () => {
    cargarPerfilSocial();
});

async function cargarPerfilSocial() {
    // API Real de internet (Oficial de GitHub). Trae los datos del usuario 
    const urlAPI = "https://api.github.com/users/torvalds";

    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error(`Error al conectar con la API: ${respuesta.status}`);
        }

        // Convertimos los datos reales de internet a JSON
        const datosUsuario = await respuesta.json();
        
        mostrarPerfil(datosUsuario);

    } catch (error) {
        console.error("Error en la API:", error);
        document.querySelector(".contenedor-instagram").innerHTML = 
            `<p class="error">No se pudo consumir la API real. Revisa tu conexión a internet.</p>`;
    }
}

function mostrarPerfil(perfil) {
    const contenedor = document.querySelector(".contenedor-instagram");

    // Mapeamos los datos reales de la API de GitHub en tu diseño
    contenedor.innerHTML = `
        <div class="header-perfil">
            <img src="${perfil.avatar_url}" alt="Foto de perfil" class="foto-perfil">
            
            <div class="datos-perfil">
                <h2>@${perfil.login}</h2>
                
                <ul class="estadisticas">
                    <li><strong>${perfil.public_repos}</strong> repositorios</li>
                    <li><strong>${perfil.followers}</strong> seguidores</li>
                    <li><strong>${perfil.following}</strong> seguidos</li>
                </ul>
                
                <div class="bio">
                    <span>${perfil.name || 'Usuario de GitHub'}</span>
                    ${perfil.bio || 'Este perfil no tiene biografía disponible.'}
                </div>
            </div>
        </div>
    `;
}