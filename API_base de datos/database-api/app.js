document.addEventListener("DOMContentLoaded", () => {
    conectarBaseDatosLocal();
});

async function conectarBaseDatosLocal() {
    // CAMBIO: Ahora apunta a tu propio servidor Node.js conectado a Workbench
    const urlAPI = "http://localhost:3000/api/usuarios";

    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor local: ${respuesta.status}`);
        }

        // JS del servidor ya nos da el array directo desde MySQL
        const listaUsuarios = await respuesta.json();

        renderizarTabla(listaUsuarios);

    } catch (error) {
        console.error("Fallo al consultar tu Workbench:", error);
        document.getElementById("tabla-usuarios").innerHTML = 
            `<tr><td colspan="5" class="error" style="text-align: center;">Error: Asegúrate de que tu servidor Node.js esté encendido.</td></tr>`;
    }
}

function renderizarTabla(usuarios) {
    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = "";

    usuarios.forEach(usuario => {
        tabla.innerHTML += `
            <tr>
                <td><strong>${usuario.id}</strong></td>
                <td><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Avatar" class="avatar-db"></td>
                <td>${usuario.nombre}</td>
                <td>@${usuario.usuario}</td>
                <td>${usuario.email}</td>
            </tr>
        `;
    });
}