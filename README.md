# Calendar Backend

Backend para una aplicación de notas y calendario, construido con Node.js, Express, MongoDB, JWT y otras tecnologías modernas.

## Características

- Registro y autenticación de usuarios con JWT
- Encriptación de contraseñas con bcryptjs
- Validación de campos con express-validator
- Conexión a MongoDB Atlas usando Mongoose
- Variables de entorno gestionadas con dotenv
- CORS habilitado para seguridad
- Estructura modular y escalable

## Instalación

1. Clona el repositorio:

   ```sh
   git clone <url-del-repo>
   cd 10-calendar-backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=4000
   DB_CNN=<tu-cadena-de-conexion-mongodb>
   SECRET_JWT_SEED=<tu-secreto-jwt>
   ```

## Scripts

- **Desarrollo:**

  ```sh
  npm run dev
  ```

  Usa nodemon para recargar el servidor automáticamente.

- **Producción:**
  ```sh
  npm start
  ```

## Endpoints principales

- `POST /api/auth/new` — Registro de usuario
- `POST /api/auth/` — Login de usuario
- `GET /api/auth/renew` — Renovar token JWT

## Estructura del proyecto

- `/controllers` — Lógica de negocio y controladores
- `/database` — Configuración de la base de datos
- `/helpers` — Funciones auxiliares (ej: generación de JWT)
- `/middlewares` — Middlewares personalizados (validación de campos, JWT)
- `/models` — Modelos de datos de Mongoose
- `/routes` — Definición de rutas y endpoints
- `/public` — Archivos estáticos

## Dependencias principales

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- express-validator
- cors

## Notas

- Asegúrate de tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y configurar tu cadena de conexión en `.env`.
- El frontend puede consumir estos endpoints para autenticación y gestión de usuarios.

---

Desarrollado por Jose Manuel Quintero Ferreira.

Guía completa: Backend para una aplicación de notas usando MongoDB, JWT y Express
Para iniciar el backend de una aplicación de notas, primero creamos el directorio del proyecto y lo abrimos en Visual Studio Code. Dentro de este, inicializamos un archivo principal llamado index.js, donde escribimos un simple console.log('¡Hola, mundo!') para verificar que todo funcione correctamente.

Después, ejecutamos el comando npm init -y para generar automáticamente el archivo package.json que contiene la configuración básica del proyecto. Al iniciar el servidor con node index.js, notamos que cualquier cambio en el archivo requiere reiniciar el servidor manualmente. Para evitar esto, instalamos nodemon de forma global, lo que permite recargar el servidor automáticamente cada vez que modificamos los archivos. Usamos el siguiente comando:

bash
Copiar
Editar
sudo npm i -g nodemon
Una vez instalado, podemos iniciar el servidor con nodemon index.js, y así cualquier cambio realizado se reflejará sin tener que reiniciar. Para detener la ejecución de nodemon usamos la combinación Ctrl + C.

A continuación, modificamos el archivo package.json para definir scripts que nos permitan iniciar el proyecto en modo desarrollo o producción. Agregamos lo siguiente en la sección "scripts":

json
Copiar
Editar
"scripts": {
"dev": "nodemon index.js",
"start": "node index.js"
}
De esta forma, ejecutamos npm run dev durante el desarrollo y npm start cuando despleguemos la aplicación en producción.

Luego, instalamos las dependencias esenciales del proyecto:

express: para crear el servidor y manejar las rutas HTTP.

dotenv: para trabajar con variables de entorno desde un archivo .env.

express-validator: para validar los datos enviados en las solicitudes.

mongoose: para conectarnos a una base de datos MongoDB.

bcryptjs: para encriptar contraseñas de forma segura.

jsonwebtoken: para manejar la autenticación mediante tokens JWT.

cors: para permitir o restringir peticiones desde otros dominios.

Ejecutamos el siguiente comando para instalar todas las dependencias:

bash
Copiar
Editar
npm i express dotenv express-validator mongoose bcryptjs jsonwebtoken cors
Una vez instaladas, en el archivo index.js configuramos lo básico del servidor. Requerimos las dependencias necesarias y configuramos Express:

js
Copiar
Editar
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
res.json({ mensaje: 'API de Notas funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
También podemos imprimir las variables de entorno usando console.log(process.env) para verificar que se están cargando correctamente. Si luego cambiamos el valor de PORT en el archivo .env, el servidor usará el nuevo puerto la próxima vez que se inicie.

Continuamos con la estructura del proyecto, donde se recomienda organizar los archivos en carpetas:

routes/: contiene las rutas o endpoints, por ejemplo auth.routes.js.

controllers/: contiene la lógica de cada endpoint, por ejemplo auth.controller.js.

models/: define los esquemas de Mongoose, como el modelo de usuario.

middlewares/: contiene funciones intermedias como validaciones.

helpers/: incluye utilidades como generación de tokens JWT.

En routes/auth.routes.js definimos las rutas relacionadas con autenticación y llamamos a los métodos correspondientes definidos en controllers/auth.controller.js. Para las validaciones reutilizables, creamos un archivo llamado field-validators.js dentro de middlewares/, donde centralizamos el uso de express-validator. Si se necesitan validaciones específicas, las podemos agregar ahí y exportarlas como módulos para usarlas en las rutas.

Para almacenar los datos usamos MongoDB Atlas. Creamos una cuenta gratuita, configuramos una base de datos, un usuario y conectamos mediante MongoDB Compass para asegurarnos de que todo está correctamente enlazado. Luego, en el proyecto, instalamos Mongoose:

bash
Copiar
Editar
npm i mongoose
Y nos conectamos desde index.js o desde un archivo separado para la conexión:

js
Copiar
Editar
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB:', err));
Para proteger las contraseñas de los usuarios, usamos bcryptjs, que permite realizar un cifrado de una sola vía. Esto significa que no se puede obtener el texto original desde la contraseña encriptada. Un ejemplo de uso:

js
Copiar
Editar
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('contraseña123', 10);
La autenticación se maneja usando jsonwebtoken (JWT). Como el token se genera en varios puntos del proyecto, creamos un archivo dentro de la carpeta helpers llamado jwt.js para centralizar su lógica:

js
Copiar
Editar
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
return new Promise((resolve, reject) => {
jwt.sign({ uid }, process.env.JWT_SECRET, {
expiresIn: '2h'
}, (err, token) => {
if (err) {
reject('No se pudo generar el token');
} else {
resolve(token);
}
});
});
};
Por último, para añadir una capa adicional de seguridad, instalamos y configuramos la librería cors, la cual nos permite restringir o permitir solicitudes desde ciertos dominios. Se configura así:

js
Copiar
Editar
app.use(cors({
origin: ['https://tudominio.com'], // aquí puedes permitir solo ciertos orígenes
}));
