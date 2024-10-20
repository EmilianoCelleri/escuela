const Alumno = require('../models/alumnoModel');
const Curso = require('../models/cursoModel');

exports.inscribirAlumno = async (req, res) => {
  const { alumno, curso } = req.body;

  try {
    const cursoEncontrado = await Curso.findById(curso);
    if (!cursoEncontrado) {
      return res.status(404).render('index', { mensaje: 'Curso no encontrado' });
    }

    cursoEncontrado.alumnosInscriptos.push(alumno);
    await cursoEncontrado.save();

    // Redirigir a la página de inicio con el mensaje de éxito
    res.render('index', { mensaje: 'Alumno inscripto exitosamente' });
  } catch (error) {
    console.error('Error al inscribir alumno:', error);
    res.status(500).render('index', { mensaje: 'Error al inscribir alumno' });
  }
};

