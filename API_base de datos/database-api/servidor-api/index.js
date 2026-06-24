const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Esto permite que tu HTML consuma esta API sin bloqueos
app.use(express.json());

// 1. Configurar la conexión a tu MySQL Workbench
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Tu usuario de MySQL
    password: 'Leonardo',  // TU CONTRASEÑA DE MYSQL WORKBENCH
    database: 'mi_plataforma'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL Workbench:', err);
        return;
    }
    console.log('¡Conectado exitosamente a MySQL Workbench!');
});

// 2. Crear la URL de la API (Ruta GET)
app.get('/api/usuarios', (req, res) => {
    const querySQL = "SELECT * FROM usuarios";
    
    db.query(querySQL, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Le regresamos los datos de Workbench convertidos en formato JSON
        res.json(resultados);
    });
});

// 3. Encender el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});