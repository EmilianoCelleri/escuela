const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const AlumnoCtrl = require("./controllers/alumnos");
const moment = require('moment-timezone');

//Configurar archivos static
app.use(express.static(path.join(__dirname, 'public')));
//Bodyparser
app.use(bodyParser.json());


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



//Rutas Api

var alumnos = express.Router();
alumnos.route("/alumnos")
  .get(AlumnoCtrl.findAllAlumnos)
  .post(AlumnoCtrl.addAlumno);
alumnos.route("/alumnos/:id")
  .get(AlumnoCtrl.findAlumnoById)
  .delete(AlumnoCtrl.deleteAlumno);

app.use("/api", alumnos);

            