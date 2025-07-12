// Importo la librería 'moment', que me permite trabajar fácilmente con fechas y horas
const moment = require("moment");

// Creo una función llamada 'isDate' que se encarga de validar si el valor recibido es una fecha válida
const isDate = (value) => {
  // Primero verifico si el valor existe; si está vacío, retorno false de inmediato
  if (!value) {
    return false;
  }

  // Utilizo moment para intentar convertir el valor recibido en un objeto de fecha
  const fecha = moment(value);

  // Reviso si la fecha creada por moment es válida
  if (fecha.isValid()) {
    // Si es válida, retorno true
    return true;
  } else {
    // Si no es válida, retorno false
    return false;
  }
};

// Exporto la función 'isDate' para poder utilizarla en otras partes del proyecto
module.exports = {
  isDate,
};
