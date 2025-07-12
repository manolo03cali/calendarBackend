// Extraigo 'Schema' y 'model' desde mongoose para definir el esquema y luego crear el modelo
const { Schema, model } = require("mongoose");

// Defino el esquema de un evento con todas las propiedades que quiero almacenar en la base de datos
const EventSchema = new Schema({
  // El título del evento es obligatorio y debe ser una cadena de texto
  title: {
    type: String,
    required: true,
  },

  // Las notas del evento son opcionales (pueden estar vacías) y también son una cadena
  notes: {
    type: String,
  },

  // La fecha de inicio del evento es obligatoria y debe ser un objeto de tipo Date
  start: {
    type: Date,
    required: true,
  },

  // La fecha de finalización del evento también es obligatoria y debe ser de tipo Date
  end: {
    type: Date,
    required: true,
  },

  // Cada evento está relacionado con un usuario (quien lo creó)
  // Aquí guardo una referencia al modelo 'User' mediante su ObjectId
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Esta referencia me permite hacer populate() para obtener los datos del usuario
    required: true,
  },
});

// Personalizo cómo se transforma este documento cuando lo convierto a JSON
// Esto me sirve para que el frontend reciba un objeto más limpio y legible
EventSchema.method("toJSON", function () {
  // Extraigo los campos __v (versión interna de Mongoose) y _id (nombre por defecto del ID en MongoDB)
  // El resto de propiedades las dejo dentro del objeto final
  const { __v, _id, ...object } = this.toObject();

  // Reemplazo _id por una propiedad llamada 'id' para que sea más clara en el cliente (frontend)
  object.id = _id;

  // Devuelvo el objeto final ya transformado
  return object;
});

// Exporto el modelo 'Event' basado en el esquema que acabo de definir
// Esto me permite usarlo en otras partes del proyecto para crear, leer, actualizar o eliminar eventos
module.exports = model("Event", EventSchema);
