// Importo 'response' desde Express para tener el tipado en la respuesta y que editores como VSCode me den autocompletado
const { response } = require("express");

// Importo 'validationResult' desde express-validator, que me permite recoger los errores de validación de las rutas
const { validationResult } = require("express-validator");

// Creo una función middleware llamada 'validateFields' que voy a usar después de aplicar validaciones en las rutas
const validateFields = (req, res = response, next) => {
  // Uso 'validationResult' para obtener los errores de validación que se generaron previamente
  const errors = validationResult(req);

  // Si hay errores, es decir, el array no está vacío, retorno un error 400 (bad request)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      // Uso 'errors.mapped()' para transformar el array de errores en un objeto clave-valor más fácil de leer
      errors: errors.mapped(),
    });
  }

  // Si no hay errores, llamo a 'next()' para que la petición continúe hacia el siguiente middleware o controlador
  next();
};

// Exporto la función 'validateFields' para poder usarla como middleware en mis rutas protegidas por validaciones
module.exports = {
  validateFields,
};
