// Importo la librería 'jsonwebtoken', que me permite generar y verificar tokens JWT (JSON Web Tokens)
const jwt = require("jsonwebtoken");

// Defino una función llamada 'generateJWT' que recibe el 'uid' y el 'name' del usuario.
// Esta función me va a devolver un token JWT que puedo usar para autenticar al usuario en futuras peticiones.
const generateJWT = (uid, name) => {
  // Retorno una nueva promesa porque la generación del token es una operación asincrónica (usa un callback)
  return new Promise((resolve, reject) => {
    // Creo el 'payload', es decir, la información que quiero guardar dentro del token
    const payload = { uid, name };

    // Uso jwt.sign para firmar el token con el payload, una clave secreta, y una configuración de expiración
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED, // Esta es la clave secreta, la guardo en una variable de entorno por seguridad
      {
        expiresIn: "2h", // El token va a ser válido durante 2 horas
      },
      (err, token) => {
        // Esta función callback se ejecuta cuando termina el intento de generar el token

        if (err) {
          // Si hubo un error generando el token, lo imprimo en consola y rechazo la promesa
          console.log(err);
          reject("Could not generate token");
        } else {
          // Si todo salió bien, resuelvo la promesa con el token generado
          resolve(token);
        }
      }
    );
  });
};

// Exporto la función 'generateJWT' para poder usarla en otros archivos (por ejemplo, controladores de login o registro)
module.exports = {
  generateJWT,
};
