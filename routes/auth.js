/**
 * endpoins
 * Rutas de Usuarios /Auth
 * host + /api/auth
 */
const { check } = require("express-validator");
const { Router } = require("express");
const router = Router();
const {
  createUser,
  loginUser,
  revalidarToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validar-jwt");
router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
    // validarCampos
  ],
  createUser
);
router.post(
  "/",
  [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);
router.get("/renew", validateJWT, revalidarToken);
module.exports = router;
