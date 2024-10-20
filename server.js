const express = require('express');
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

//Configurar archivos static
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));


//Configuracion de engine pug
app.set('views', './views');
app.set('view engine', 'pug')

//Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
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



//Uso de Middleware



//Rutas app
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/index', function (req, res) {
  res.render('index');
});

app.get('/login',  (req, res) => {
  res.render('login');
});

app.get('/calificaciones', CalificacionCtrl.findCalificaciones);

//app.get('/calificaciones',  (req, res) => {
 // res.render('calificaciones');
//});

app.post('/login', LoginCtrl.login);

//Cargar inscipcion con Form
app.get('/inscripciones', async (req, res) => {
  // Traemos alumnos y cursos de la base de datos para el select
  const alumnos = await Alumno.find();
  const cursos = await Curso.find();
  res.render('inscripciones', { alumnos, cursos });
});

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
  .delete(AlumnoCtrl.deleteAlumno);

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



            