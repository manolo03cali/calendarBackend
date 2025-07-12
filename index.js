// Importo Express, que es el framework que utilizo para levantar mi servidor web
const express = require("express");

// Importo mi función personalizada para conectar a la base de datos MongoDB
const { dbConnection } = require("./database/config");

// Cargo las variables de entorno desde el archivo .env usando dotenv
require("dotenv").config();

// Importo CORS, que me permite aceptar peticiones desde otros dominios (útil cuando el frontend está en otro servidor)
const cors = require("cors");

// Creo mi aplicación de Express. A partir de aquí configuro todo el backend
const app = express();

// -------------------
// Conexión a la base de datos
// -------------------
dbConnection(); // Llamo a mi función para conectar a MongoDB. Si hay error, se mostrará en consola

// -------------------
// Configuración de middlewares
// -------------------

// Habilito CORS para que el backend acepte peticiones desde otros orígenes (como localhost:3000 de React)
app.use(cors());

// Sirvo archivos estáticos desde la carpeta 'public' (por ejemplo, index.html o imágenes)
app.use(express.static("public"));

// Habilito el middleware para leer y parsear el body de las peticiones que lleguen en formato JSON
app.use(express.json());

// -------------------
// Definición de rutas
// -------------------

// Todas las rutas que comienzan con /api/auth serán manejadas por el archivo './routes/auth.js'
// Aquí tengo las rutas de autenticación: registro, login y renovación del token
app.use("/api/auth", require("./routes/auth"));

// Todas las rutas que comienzan con /api/events serán manejadas por './routes/events.js'
// Aquí gestiono el CRUD de eventos del calendario
app.use("/api/events", require("./routes/events"));

// -------------------
// Inicio del servidor
// -------------------

// Escucho peticiones HTTP en el puerto que definí en la variable de entorno PORT
// Cuando el servidor se levanta, muestro un mensaje en consola
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
