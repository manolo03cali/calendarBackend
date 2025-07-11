/**
 * endpoins
 * Rutas de eventos /events
 * host + /api/events
 */
const { check } = require("express-validator");
const { Router } = require("express");
const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../controllers/events");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");
const router = Router();
router.use(validateJWT, validateFields);
router.get("/", getEvents);
router.post(
  "/",
  [
    // middlewares
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha final es obligatoria").custom(isDate),
    validateFields,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    // middlewares
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha final es obligatoria").custom(isDate),
    validateFields,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
