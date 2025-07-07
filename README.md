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

Back end para la aplicación de notas usando mongo, jwt, express
configuración del backend

creo el directorio
ingreso al directorio con visual estudio code
creo un index.js con un console.log hola mundo

al acceder al comando npm init -y para iniciar el servidor sin embargo cada vez que realicemos un cambio hay que reiniciar el servidor manualmente, para solucionar esto instalamos de manera global nodemon asi:

sudo npm i nodemon -g

una vez instalado ya lo podemos iniciar

node index.js con esto ya podemos iniciar y va a tomar los cambios que realicemos en el index.js en tiempo real sin necesidad de estar reiniciando.

control+c para cancelar nodemon

ahora modificamos el script para poder iniciar y finalizar correctamente el proyecto en modo producción y en modo desarrollo dev y start

{
"name": "10-calendar-backend",
"version": "1.0.0",
"main": "index.js",
"scripts": {
"dev": "nodemon index.js",
"start": "node index.js"
},
"keywords": [],
"author": "",
"license": "ISC",
"description": ""
}

ahora podemos iniciar el proyecto en consola bien sea con npm start para producción y en modo de desarrollo en npm run dev.

necesitamos express para crear nuestro servidor que tenga todos los endpoins y ayude a la creación del backend server está opción es muy utilizada

npm i express

para las variables de entorno instalamos:

npm i dotenv

luego en el index.js la usamos con
require("dotenv").config();

Listamos con un console.log las variables de entorno que se estan ejecutando entre esas el port
console.log(process.env);

luego usamos la de nuestro interes en este caso el PORT
app.listen(process.env.PORT, () => {
console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});

con está configuración al cambiar el puerto en nuestro archivo de variables de entorno .env al reiniciar manualmente el servidor toma el nuevo puerto.

creamos los endpoins en el archivo auth routes que hacen el llamado a los
metodos de los mismos que tendriamos en el controller con el mismo nombre

luego para hacer validaciones instalamos express-validator

npm i express-validator

creamos un archivo independiente llamado field-validators.js para centrar las validaciones ya que es basicamente lo mismo en el caso que nos ocupa, en caso de que necesitemos otro tipo de validaciones las guardamos en el mismo archivo y la exportamos cómo un modulo para usaras en las rutas donde tengamos chek al final dentro de cada arreglo donde estan los campos.

Creamos una cuenta gratuita de mongo atlas la conectamos con su respectivo usuario y contrasena
al software de escritorio mongo compass.

una vez tenemos claro el usuario y contrasena y el mongo compass conectado pasamos a visual studio code en nuestro proyecto para instalar la libreria Mongoose https://mongoosejs.com/

instalamos el paquete con npm i mongoose

para la encriptación de contrasenas usamos la libreria
usamos encriptación de una via con la cual es imposible obtener el texto encriptado

npm i bcryptjs

para manejar la autenticación con jwt json web token para manejar el estado de la sesión de forma pasiva, cómo hay que crear el token en varios lugares creamos un directorio helpers y un archivo llamado jwt.js con el fin de centralizar la logica

realizamos la instalación
npm i jsonwebtoken

Para poder adicionar una capa de seguridad a nuestra api podemos usar la libreria cors que basicamente nos permite aceptar o denegar peticiones de ciertos dominios

instalación npm i cors
