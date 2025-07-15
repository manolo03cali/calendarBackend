// Importo el objeto 'response' desde Express para tener autocompletado y tipado cuando devuelvo una respuesta
const { response } = require("express");

// Importo bcryptjs para poder encriptar contraseñas y compararlas de forma segura
const bcrypt = require("bcryptjs");

// Importo el modelo de usuario desde la carpeta 'models' para poder hacer operaciones en la base de datos
const User = require("../models/User");

// Importo una función personalizada que me permite generar tokens JWT para autenticación
const { generateJWT } = require("../helpers/jwt");

// Función que uso para registrar a un nuevo usuario
const createUser = async (req, res = response) => {
  // Extraigo el email y la contraseña que el usuario envió desde el frontend (por ejemplo, desde un formulario)
  const { email, password } = req.body;

  try {
    // Busco en la base de datos si ya hay un usuario registrado con ese correo electrónico
    let user = await User.findOne({ email });

    // Si ya existe, no permito que se registre nuevamente y envío un mensaje de error
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "This email is already registered",
      });
    }

    // Si no existe ese correo, creo un nuevo usuario con los datos que me mandaron
    user = new User(req.body);

    // Genero una "sal" (valor aleatorio) que se usa para hacer más segura la encriptación de la contraseña
    const salt = bcrypt.genSaltSync();

    // Encripto la contraseña con la sal antes de guardarla en la base de datos
    user.password = bcrypt.hashSync(password, salt);

    // Guardo el usuario en la base de datos
    await user.save();

    // Después de guardar al usuario, genero un token JWT para que el usuario pueda autenticarse
    const token = await generateJWT(user.id, user.name);

    // Devuelvo una respuesta al cliente confirmando que todo salió bien, junto con el token
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    // Si ocurre un error inesperado, lo imprimo en la consola para saber qué pasó
    console.log(error);

    // Envío una respuesta genérica de error al cliente
    res.status(500).json({
      ok: false,
      msg: "An unexpected error occurred, please contact the administrator",
    });
  }
};

// Función que utilizo cuando un usuario quiere iniciar sesión
const loginUser = async (req, res = response) => {
  // Extraigo el email y la contraseña desde el cuerpo de la petición
  const { email, password } = req.body;

  try {
    // Busco si el usuario existe en la base de datos
    const user = await User.findOne({ email });

    // Si no existe el usuario con ese email, devuelvo un error
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No account found with this email",
      });
    }

    // Verifico que tenga una contraseña guardada, por seguridad adicional
    if (!user.password) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid email or password",
      });
    }

    // Comparo la contraseña ingresada con la que está en la base de datos (encriptada)
    const validPassword = bcrypt.compareSync(password, user.password);

    // Si las contraseñas no coinciden, devuelvo un mensaje de error
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid email or password",
      });
    }

    // Si todo está correcto, genero un nuevo token JWT para este usuario
    const token = await generateJWT(user.id, user.name);

    // Devuelvo una respuesta con los datos del usuario y el token
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      msg: "Login successful",
      token,
    });
  } catch (error) {
    // En caso de que ocurra un error inesperado, lo muestro en la consola
    console.log(error);

    // Y devuelvo un error interno al cliente
    return res.status(500).json({
      ok: false,
      msg: "An unexpected error occurred, please contact the administrator",
    });
  }
};

// Función para renovar o revalidar el token JWT (cuando el usuario ya está autenticado y necesita uno nuevo)
const revalidarToken = async (req, res = response) => {
  // Extraigo el uid y el nombre del usuario desde el objeto request (asumo que estos valores fueron validados antes con middleware)
  const { uid, name } = req;

  // Genero un nuevo token JWT con los mismos datos
  const newToken = await generateJWT(uid, name);

  // Devuelvo el nuevo token en la respuesta
  res.json({
    ok: true,
    uid,
    name,
    token: newToken,
    msg: "Token revalidated successfully",
  });
};

// Exporto las funciones para poder usarlas en mis rutas u otros controladores
module.exports = {
  createUser,
  loginUser,
  revalidarToken,
};
