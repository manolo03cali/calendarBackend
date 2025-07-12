/**
 * Endpoints relacionados con los eventos del calendario
 * Ruta base: host + /api/events
 */

const { check } = require("express-validator"); // Importo 'check' para hacer validaciones en los campos
const { Router } = require("express"); // Importo Router desde Express para crear mis rutas

// Importo los controladores que se encargan de manejar la lógica para cada ruta de eventos
const {
  createEvent, // Crear un nuevo evento
  deleteEvent, // Eliminar un evento existente
  getEvents, // Obtener todos los eventos
  updateEvent, // Actualizar un evento
} = require("../controllers/events");

// Importo el middleware que valida los campos después de ejecutar las validaciones con express-validator
const { validateFields } = require("../middlewares/field-validators");

// Importo el middleware que verifica si el JWT es válido (autenticación)
const { validateJWT } = require("../middlewares/validar-jwt");

// Importo una función personalizada para validar que un campo sea una fecha válida
const { isDate } = require("../helpers/isDate");

// Inicializo el router para configurar las rutas
const router = Router();

// Aplico el middleware 'validateJWT' a todas las rutas de este router para protegerlas con autenticación
// También aplico validateFields aquí por si alguna validación lo requiere globalmente
router.use(validateJWT, validateFields);

/**
 * Ruta: GET /api/events/
 * Descripción: Obtengo todos los eventos del usuario autenticado
 */
router.get("/", getEvents);

/**
 * Ruta: POST /api/events/
 * Descripción: Creo un nuevo evento
 */
router.post(
  "/",
  [
    // Validaciones que aplico antes de llegar al controlador
    check("title", "El titulo es obligatorio").not().isEmpty(), // El título no puede estar vacío
    check("start", "Fecha de inicio es obligatoria").custom(isDate), // La fecha de inicio debe ser válida
    check("end", "Fecha final es obligatoria").custom(isDate), // La fecha de fin debe ser válida
    validateFields, // Si hay errores, los detengo aquí
  ],
  createEvent // Controlador que crea el evento
);

/**
 * Ruta: PUT /api/events/:id
 * Descripción: Actualizo un evento existente, identificado por su id
 */
router.put(
  "/:id",
  [
    // Validaciones al actualizar un evento
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha final es obligatoria").custom(isDate),
    validateFields,
  ],
  updateEvent // Controlador que actualiza el evento
);

/**
 * Ruta: DELETE /api/events/:id
 * Descripción: Elimino un evento específico por su id
 */
router.delete("/:id", deleteEvent); // No necesita validaciones, solo verificación de autenticación

// Exporto este router para poder usarlo en mi archivo principal de rutas o en app.js
module.exports = router;
