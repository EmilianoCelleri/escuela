const Alumno = require('../models/alumnoModel');
const Curso = require('../models/cursoModel');

exports.inscribirAlumno = async (req, res) => {
  const { alumno, curso } = req.body;

  try {
    const cursoEncontrado = await Curso.findById(curso);
    if (!cursoEncontrado) {
      return res.status(404).send('Curso no encontrado');
    }

    cursoEncontrado.alumnosInscriptos.push(alumno);
    await cursoEncontrado.save();

    res.redirect('/');
  } catch (error) {
    console.error('Error al inscribir alumno:', error);
    res.status(500).send('Error al inscribir alumno');
  }
};
