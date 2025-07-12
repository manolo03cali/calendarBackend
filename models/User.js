// Importo 'Schema' y 'model' desde mongoose para poder definir el esquema del usuario y luego crear el modelo a partir de él
const { Schema, model } = require("mongoose");

// Defino el esquema del usuario con los campos que quiero guardar en la base de datos
const UserSchema = new Schema({
  // Campo 'name': aquí guardo el nombre del usuario
  // Debe ser una cadena de texto y es obligatorio
  name: {
    type: String,
    required: true,
  },

  // Campo 'email': aquí guardo el correo electrónico del usuario
  // También es obligatorio y debe ser único (no se pueden repetir correos)
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Campo 'password': aquí guardo la contraseña del usuario
  // Es una cadena y también es obligatoria
  // Normalmente esta contraseña la guardo encriptada (nunca en texto plano)
  password: {
    type: String,
    required: true,
  },
});

// Exporto el modelo 'User' usando el esquema que acabo de definir
// Esto me permite interactuar con la colección de usuarios desde cualquier parte del proyecto
module.exports = model("User", UserSchema);
