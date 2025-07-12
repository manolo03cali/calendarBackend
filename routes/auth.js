/**
 * Endpoints relacionados con usuarios (autenticación)
 * Ruta base: host + /api/auth
 */

const { check } = require("express-validator"); // Importo 'check' para hacer validaciones en los campos del body
const { Router } = require("express"); // Importo Router desde Express para crear un grupo de rutas
const router = Router(); // Inicializo el router

// Importo los controladores que se ejecutarán cuando se llame cada ruta
const {
  createUser, // Controlador para registrar un nuevo usuario
  loginUser, // Controlador para iniciar sesión
  revalidarToken, // Controlador para renovar el token
} = require("../controllers/auth");

// Importo el middleware que se encarga de validar los campos después de usar express-validator
const { validateFields } = require("../middlewares/field-validators");

// Importo el middleware que verifica si el JWT (token) es válido
const { validateJWT } = require("../middlewares/validar-jwt");

/**
 * Ruta: POST /api/auth/new
 * Descripción: Registro de nuevo usuario
 */
router.post(
  "/new",
  [
    // Aplico middlewares para validar los campos del body
    check("name", "El nombre es obligatorio").not().isEmpty(), // El nombre no puede estar vacío
    check("email", "El email es obligatorio").isEmail(), // El email debe tener un formato válido
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }), // Password mínimo de 6 caracteres
    validateFields, // Si hay errores, los detiene y responde
  ],
  createUser // Si todo está correcto, ejecuto el controlador 'createUser'
);

/**
 * Ruta: POST /api/auth
 * Descripción: Inicio de sesión
 */
router.post(
  "/",
  [
    // Valido el formato de email y longitud del password
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields, // Si hay errores, se devuelven antes de llegar al controlador
  ],
  loginUser // Si la validación es correcta, ejecuto 'loginUser'
);

/**
 * Ruta: GET /api/auth/renew
 * Descripción: Renueva el token JWT (requiere autenticación previa)
 */
router.get("/renew", validateJWT, revalidarToken);
// Aquí primero paso por el middleware 'validateJWT' para asegurarme que el usuario tiene un token válido
// Luego, si todo está bien, llamo al controlador 'revalidarToken' que genera un nuevo JWT

// Exporto el router para usarlo en el archivo principal de rutas o en app.js
module.exports = router;
