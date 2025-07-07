// Importo el objeto 'response' desde Express, para tener el tipado en la respuesta
const { response } = require("express");

// Importo bcryptjs para poder encriptar y comparar contraseñas
const bcrypt = require("bcryptjs");

// Importo el modelo de usuario desde la carpeta de modelos
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

// Función para crear un nuevo usuario
const createUser = async (req, res = response) => {
  // Extraigo el email y la contraseña del body de la petición
  const { email, password } = req.body;

  try {
    // Primero, busco si ya existe un usuario con ese email
    let user = await User.findOne({ email });

    // Si encuentro un usuario, devuelvo un error porque no se pueden duplicar
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "This email is already registered",
      });
    }

    // Si no existe el usuario, creo una nueva instancia con los datos recibidos
    user = new User(req.body);

    // Genero una "salt" para hacer más segura la encriptación de la contraseña
    const salt = bcrypt.genSaltSync();

    // Encripto la contraseña antes de guardarla en la base de datos
    user.password = bcrypt.hashSync(password, salt);

    // Guardo el nuevo usuario en la base de datos
    await user.save();

    //Generaro un JWT
    const token = await generateJWT(user.id, user.name);
    // Devuelvo una respuesta exitosa
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    // Si ocurre un error inesperado, lo muestro por consola
    console.log(error);

    // Devuelvo un error interno al cliente
    res.status(500).json({
      ok: false,
      msg: "An unexpected error occurred, please contact the administrator",
    });
  }
};

// Función para el inicio de sesión de un usuario
const loginUser = async (req, res = response) => {
  // Extraigo el email y la contraseña que envía el cliente
  const { email, password } = req.body;

  try {
    // Busco en la base de datos si existe un usuario con ese email
    const user = await User.findOne({ email });

    // Si no existe el usuario, devuelvo un error
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No account found with this email",
      });
    }

    // Verifico si el usuario tiene contraseña almacenada (control extra)
    if (!user.password) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid email or password",
      });
    }

    // Comparo la contraseña enviada con la almacenada en la base de datos
    const validPassword = bcrypt.compareSync(password, user.password);

    // Si la contraseña no coincide, devuelvo un error
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid email or password",
      });
    }

    // Geenero un JWT
    const token = await generateJWT(user.id, user.name);
    // Si todo está correcto, devuelvo los datos del usuario
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      msg: "Login successful",
      token,
    });
  } catch (error) {
    // Si ocurre un error inesperado, lo muestro por consola
    console.log(error);

    // Devuelvo un error interno al cliente
    return res.status(500).json({
      ok: false,
      msg: "An unexpected error occurred, please contact the administrator",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  // Extraigo el uid y el name del usuario desde el request
  const { uid, name } = req;
  const newToken = await generateJWT(uid, name);
  res.json({
    ok: true,
    token: newToken,
    msg: "Token revalidated successfully",
  });
};

// Exporto las funciones para usarlas en otras partes del proyecto
module.exports = {
  createUser,
  loginUser,
  revalidarToken,
};
