const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Alumno = require('./models/alumnoModel')
const AlumnoCtrl = require("./controllers/alumnos");
const CursoCtrl = require("./controllers/cursos");
const Curso = require('./models/cursoModel')
const CalificacionCtrl = require("./controllers/calificaciones");
const ProfesorCtrl = require("./controllers/profesores");
const LoginCtrl = require('./controllers/usuarios');
const InscripcionCtrl = require('./controllers/inscripciones');
const PadreCtrl = require("./controllers/padres");
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

//Configurar archivos static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/websocket', express.static(__dirname + '/websocket'));

//Bodyparser JSON


//Para trabajar con forms
app.use(express.urlencoded({ extended: true }));


//Configuracion de engine pug
app.set('views', './views');
app.set('view engine', 'pug')

//Levantar el servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
});

//Conexion a Mongo
mongoose.connect("mongodb://localhost:27017/escuela")
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
  });

            

//Middlewares
app.use(bodyParser.json());


//Websockets ---- Chat

const messages = [
  { id: 1, text: 'Bienvenido al chat!', author: 'Admin' } 
];

io.on('connection', function (socket) {
  console.log(messages);
  console.log('Alguien se ha conectado al chat');

  // Enviar los mensajes actuales al cliente que se conecta
  socket.emit('messages', messages);

  // Escuchar el evento 'new-message' que envía el cliente
  socket.on('new-message', function (data) {
      console.log('Mensaje recibido:', data); // Verificar el mensaje recibido
      messages.push(data); // Agregar el mensaje al array de mensajes
      console.log('Array de mensajes actualizado:', messages); // Verificar el array actualizado
      io.sockets.emit('messages', messages); // Emitir a todos los clientes
  });

  socket.on('disconnect', () => {
    console.log('Alguien se ha desconectado'); // Muestra un mensaje en la consola cuando un cliente se desconecta.
  });
});

app.get('/chat', function (req, res) {
  console.log(messages);
  res.render('chat');
});



//Rutas app web

//Index en '' y /index
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/index', function (req, res) {
  res.render('index');
});


app.get('/login',  (req, res) => {
  res.render('login');
});

//View de Calificaciones
app.get('/calificaciones', CalificacionCtrl.findCalificaciones);

//View de Login
app.post('/login', LoginCtrl.login);

//Cargar inscipcion con Form
app.get('/inscripciones', async (req, res) => {
  // Traemos alumnos y cursos de la base de datos para el select
  const alumnos = await Alumno.find();
  const cursos = await Curso.find();
  res.render('inscripciones', { alumnos, cursos });
});

//Inscribir alumnos
app.post('/inscripciones', InscripcionCtrl.inscribirAlumno);

//Cargar calificacion con Form
app.get('/cargar_calificacion', CalificacionCtrl.formCalificacion);

// Ruta para procesar el formulario de calificación
app.post('/cargar_calificacion', CalificacionCtrl.cargarCalificacion);


//Rutas Api

// Alumnos
var alumnos = express.Router();
alumnos.route("/alumnos")
  .get(AlumnoCtrl.findAllAlumnos)
  .post(AlumnoCtrl.addAlumno);
alumnos.route("/alumnos/:id")
  .get(AlumnoCtrl.findAlumnoById)
  .delete(AlumnoCtrl.deleteAlumno)
  .put(AlumnoCtrl.updateAlumno);

//Curso
var cursos = express.Router();
cursos.route("/cursos")
  .post(CursoCtrl.addCurso);

//Calificacion
var calificaciones = express.Router();
calificaciones.route("/calificaciones")
  .post(CalificacionCtrl.addCalificacion)
  .get(CalificacionCtrl.findCalificaciones);

//Profesor
var profesores = express.Router();
profesores.route("/profesores")
  .post(ProfesorCtrl.addProfesor);

//Padres
var padres = express.Router();
padres.route("/padres")
  .post(PadreCtrl.addPadre)
  .get(PadreCtrl.findAllPadres);


app.use("/api", alumnos);
app.use("/api", cursos);
app.use("/api", calificaciones);
app.use("/api", profesores);
app.use("/api", padres);



            