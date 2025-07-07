const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");
//console.log(process.env);
// Create an Express application
const app = express();
//Base de datos
dbConnection();
// CORS
app.use(cors());
//directorio public
app.use(express.static("public"));
//lectura y parseo del body
app.use(express.json());
//rutas
//TODO auth //crear, login, renew
app.use("/api/auth", require("./routes/auth"));

//TODO: CRUD: eventos

// Escuchar peticiones a la ruta raíz
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
