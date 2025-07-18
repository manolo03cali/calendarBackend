📅 Calendar Backend

# Prueba la aplicación

Visita este [enlace](https://calendar-backend25.up.railway.app/ "Calendario")

Este es el backend para una aplicación de calendario con gestión de usuarios, eventos y autenticación. Lo desarrollé usando Node.js, Express, MongoDB, JWT y otras herramientas modernas. Toda la lógica está organizada en controladores, middlewares, rutas y modelos de datos.
✨ Características principales

    ✅ Registro, login y renovación de sesión usando JSON Web Tokens (JWT)

    🔒 Contraseñas encriptadas con bcryptjs

    🧼 Validación de datos con express-validator

    🗄️ Conexión a base de datos MongoDB Atlas con Mongoose

    🔐 Middleware de autenticación para proteger rutas

    🌍 Habilitación de CORS para frontend externo

    📁 Estructura modular, mantenible y escalable

🚀 Instalación paso a paso

1. Instalar dependencias
   `npm install`
2. Clonar el archivo
   `.env.template` y renombrar a `.env`
3. Cambiar variables de entorno de acuerdo a su configuración.
4. Correr el servidor `npm start`

Modo producción:

    npm start

🔑 Endpoints principales
Método Ruta Descripción
POST /api/auth/new Registro de usuario
POST /api/auth Login de usuario
GET /api/auth/renew Renovar token autenticación
GET /api/events Obtener todos los eventos
POST /api/events Crear nuevo evento
PUT /api/events/:id Actualizar evento por ID
DELETE /api/events/:id Eliminar evento por ID
🧱 Estructura del proyecto

📦 calendar-backend
├── 📁 controllers # Controladores para manejar la lógica de rutas
├── 📁 database # Conexión a MongoDB con Mongoose
├── 📁 helpers # Funciones utilitarias como generación de JWT y validación de fechas
├── 📁 middlewares # Validación de campos y autenticación con JWT
├── 📁 models # Modelos de datos (User, Event)
├── 📁 routes # Definición de rutas públicas y protegidas
├── 📁 public # Archivos estáticos (index.html, favicon, etc.)
├── 📄 index.js # Punto de entrada principal del servidor
├── 📄 .env # Variables de entorno (no subir al repo)
└── 📄 package.json # Configuración del proyecto y scripts

📚 Tecnologías utilizadas
Herramienta Uso principal
Express Framework para construir el servidor
Mongoose ORM para conectar con MongoDB
bcryptjs Encriptación de contraseñas
jsonwebtoken Autenticación con tokens
express-validator Validación de datos en las rutas
dotenv Manejo de variables de entorno
cors Control de acceso entre dominios
nodemon Recarga automática en desarrollo
🛠️ Proceso de desarrollo explicado

    Inicialicé el proyecto con npm init -y y creé el archivo index.js como punto de entrada.

    Instalé todas las dependencias necesarias con:

npm i express dotenv mongoose express-validator bcryptjs jsonwebtoken cors

Usé nodemon para facilitar el desarrollo:

npm i -D nodemon

Agregué los siguientes scripts al package.json:

    "scripts": {
      "dev": "nodemon index.js",
      "start": "node index.js"
    }

    Configuré el servidor Express:

        Habilité CORS.

        Permití el uso de JSON.

        Serví archivos estáticos desde public/.

    Organicé el backend en carpetas:

        routes/ define las rutas como /api/auth y /api/events.

        controllers/ tiene funciones como createUser, loginUser, getEvents, etc.

        models/ define los esquemas de Mongoose para usuarios y eventos.

        middlewares/ verifica campos y tokens.

        helpers/ contiene la lógica para generar JWT y validar fechas con moment.

🔐 Seguridad

    Todas las rutas de eventos (/api/events) están protegidas con un middleware que valida el JWT.

    Las contraseñas se encriptan con bcryptjs antes de guardarlas.

    El JWT se firma con un secreto y tiene una expiración configurable (2h por defecto).

🌍 MongoDB Atlas

Requiere crear una cuenta en MongoDB Atlas, configurar una base de datos y conectar con la cadena correspondiente en el archivo .env.

Desarrollado por Jose Manuel Quintero Ferreira
Este proyecto fue creado como una guía práctica para construir un backend completo con autenticación y manejo de datos usando las herramientas más comunes de Node.js.
