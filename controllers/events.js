// Importo el objeto 'response' desde express, para tener el tipado disponible en las respuestas HTTP
const { response } = require("express");

// Importo el modelo Event que me permite interactuar con la colección de eventos en la base de datos
const Event = require("../models/Event");

// ========================
// Obtener todos los eventos
// ========================
const getEvents = async (req, res = response) => {
  // Consulto todos los eventos en la base de datos y uso 'populate' para reemplazar el ID del usuario por su nombre
  const events = await Event.find().populate("user", "name");

  // Devuelvo la respuesta al cliente con el array de eventos
  res.json({
    ok: true,
    events,
  });
};

// ========================
// Crear un nuevo evento
// ========================
const createEvent = async (req, res = response) => {
  // Creo una nueva instancia del modelo Event con los datos recibidos en el cuerpo de la petición
  const event = new Event(req.body);

  try {
    // Le asigno al evento el ID del usuario autenticado, que fue extraído previamente por un middleware y almacenado en req.uid
    event.user = req.uid;

    // Guardo el evento en la base de datos
    const eventSave = await event.save();

    // Devuelvo una respuesta con el evento guardado correctamente
    res.json({
      ok: true,
      msg: "Event save successfully",
      event: eventSave,
    });
  } catch (error) {
    // Si ocurre algún error, lo imprimo en consola para depurar
    console.log(error);

    // Envío una respuesta de error al cliente
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};

// ========================
// Actualizar un evento
// ========================
const updateEvent = async (req, res = response) => {
  // Obtengo el ID del evento desde los parámetros de la URL
  const eventId = req.params.id;

  // Obtengo el ID del usuario autenticado desde la request
  const uid = req.uid;

  try {
    // Busco el evento en la base de datos por su ID
    const event = await Event.findById(eventId);

    // Si no existe el evento, respondo con un 404
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found by Id",
      });
    }

    // Verifico si el evento pertenece al usuario que está intentando modificarlo
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to update this event",
      });
    }

    // Creo un nuevo objeto de evento con los datos actualizados y el mismo UID del usuario
    const newEvent = { ...req.body, user: uid };

    // Actualizo el evento en la base de datos y solicito que me devuelva el nuevo documento con 'new: true'
    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    // Envío una respuesta con el evento actualizado
    res.json({
      ok: true,
      msg: "Event update successfully",
      event: updateEvent,
    });
  } catch (error) {
    // Si algo falla, imprimo el error en la consola
    console.log(error);

    // Devuelvo una respuesta de error al cliente
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};

// ========================
// Eliminar un evento
// ========================
const deleteEvent = async (req, res = response) => {
  // Obtengo el ID del evento que quiero eliminar
  const eventId = req.params.id;

  // También obtengo el UID del usuario autenticado
  const uid = req.uid;

  try {
    // Busco el evento por su ID
    const event = await Event.findById(eventId);

    // Si el evento no existe, informo que no se encontró
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found by Id",
      });
    }

    // Verifico que el usuario sea el dueño del evento antes de permitir eliminarlo
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to delete this event",
      });
    }

    // Elimino el evento de la base de datos
    await Event.findByIdAndDelete(eventId);

    // Respondo que el evento fue eliminado exitosamente
    res.json({
      ok: true,
      msg: "Event delete successfully",
    });
  } catch (error) {
    // Si hay un error, lo imprimo y devuelvo mensaje genérico
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};

// Exporto todas las funciones para poder usarlas en las rutas del backend
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
