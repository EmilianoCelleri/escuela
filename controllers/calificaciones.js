const Calificacion = require('../models/calificacionModel');
const Alumno = require('../models/alumnoModel');
const Curso = require('../models/cursoModel');
const Profesor = require('../models/profesorModel');


//POST agregar calificacion
exports.addCalificacion = async function (req, res) {
    console.log('POST /addCalificacion');
    console.log(req.body);

    const { alumno, curso, profesor, notaFinal, comentario } = req.body;

    // Verificación básica de campos requeridos
    if (!alumno || !curso || !profesor || typeof notaFinal === 'undefined') {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }

    // Verificar que la nota está dentro del rango
    if (notaFinal < 0 || notaFinal > 10) {
        return res.status(400).json({ message: 'La nota final debe estar entre 0 y 10' });
    }

    try {
        // Verificar que el alumno existe
        const alumnoExiste = await Alumno.findById(alumno);
        if (!alumnoExiste) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        // Verificar que el curso existe
        const cursoExiste = await Curso.findById(curso);
        if (!cursoExiste) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Verificar que el profesor existe
        const profesorExiste = await Profesor.findById(profesor);
        if (!profesorExiste) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Crear nueva calificación
        const nuevaCalificacion = new Calificacion({
            alumno: alumno,
            curso: curso,
            profesor: profesor,
            notaFinal: notaFinal,
            comentario: comentario || ''  // Comentario es opcional
        });

        // Guardar la calificación en la base de datos
        const calificacionGuardada = await nuevaCalificacion.save();
        return res.status(201).json(calificacionGuardada);

    } catch (err) {
        console.error('Error al crear Calificación:', err.message);
        return res.status(500).json({
            message: 'Error al guardar la Calificación',
            error: err.message
        });
    }
};



//GET de todas las calificaciones
// Obtener todas las calificaciones y renderizar una vista
exports.findCalificaciones = async (req, res) => {
    try {
      const calificaciones = await Calificacion.find()
        .populate('alumno', 'nombre apellido')
        .populate('curso', 'nombre')
        .populate('profesor', 'nombre apellido')
        .exec();
  
      // Renderiza la vista calificaciones.pug y pasa los datos
      res.render('calificaciones', { calificaciones });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las calificaciones' });
    }
  };
   
  // Vista para mostrar el form
  exports.formCalificacion = async (req, res) => {
    try {
      // Obtener alumnos y cursos para el formulario
      const alumnos = await Alumno.find();
      const cursos = await Curso.find();
      const profesores = await Profesor.find();
      
      res.render('cargar_calificacion', { alumnos, cursos, profesores });
    } catch (error) {
      console.error('Error al cargar el formulario:', error);
      res.status(500).render('index', { mensaje: 'Error al cargar el formulario' });
    }
  };
  
  // Cargar la calificación ( POST)
  exports.cargarCalificacion = async (req, res) => {
    const { alumno, curso, profesor, notaFinal } = req.body;
  
    try {
      const nuevaCalificacion = new Calificacion({
        alumno,
        curso,
        profesor,
        notaFinal
      });
      
      await nuevaCalificacion.save();
  
      res.render('index', { mensaje: 'Calificación guardada exitosamente' });
    } catch (error) {
      console.error('Error al guardar calificación:', error);
      res.status(500).render('index', { mensaje: 'Error al guardar calificación' });
    }
  };
  
