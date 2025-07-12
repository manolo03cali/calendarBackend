// Importo mongoose, que es la librería que me permite conectarme y trabajar con MongoDB usando JavaScript/Node
const mongoose = require("mongoose");

// Creo una función asíncrona llamada 'dbConnection' que usaré para conectarme a la base de datos
const dbConnection = async () => {
  try {
    // Intento establecer la conexión a MongoDB usando la URL almacenada en la variable de entorno DB_CNN
    // Esta URL contiene la información necesaria (usuario, contraseña, host, nombre de la base de datos, etc.)
    await mongoose.connect(process.env.DB_CNN, {});

    // Si la conexión fue exitosa, imprimo un mensaje en consola
    console.log("DB Online");
  } catch (error) {
    // Si ocurre un error al intentar conectarme, lo muestro en la consola
    console.error(error);

    // Luego lanzo un nuevo error para que el sistema sepa que la conexión falló
    throw new Error("Error al iniciar la base de datos");
  }
};

// Exporto la función 'dbConnection' para poder usarla desde otros archivos del proyecto (por ejemplo, en app.js o index.js)
module.exports = {
  dbConnection,
};
