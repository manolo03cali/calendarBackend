// Importo 'response' desde Express para tener autocompletado en la respuesta
const { response } = require("express");

// Importo la librería 'jsonwebtoken' para poder verificar y decodificar tokens JWT
const jwt = require("jsonwebtoken");

// Creo una función middleware llamada 'validateJWT' que voy a usar para proteger rutas que requieren autenticación
const validateJWT = (req, res = response, next) => {
  // Intento leer el token JWT desde los headers de la petición, específicamente en 'x-token'
  const token = req.header("x-token");

  // Si no me enviaron un token, devuelvo un error 401 (no autorizado)
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    // Si hay token, lo verifico usando la clave secreta almacenada en la variable de entorno 'SECRET_JWT_SEED'
    // Si el token es válido, obtengo el uid y name que guardé al generarlo
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    // Asigno el uid y el name al objeto 'req' para que estén disponibles en los siguientes middlewares/controladores
    req.uid = uid;
    req.name = name;
  } catch (error) {
    // Si algo falla al verificar el token (por ejemplo, está vencido o alterado), devuelvo un error 401
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  // Si todo va bien, paso al siguiente middleware o controlador
  next();
};

// Exporto el middleware 'validateJWT' para poder usarlo en mis rutas protegidas
module.exports = {
  validateJWT,
};
