const Padre = require('../models/padreModel');

// POST - Crear un nuevo padre
exports.addPadre = async (req, res) => {
    console.log("/POST Padre")
  try {
    const { nombre, apellido, email, telefono, alumnos } = req.body;

    const nuevoPadre = new Padre({
      nombre,
      apellido,
      email,
      telefono,
      alumnos // opcional, si se asignan alumnos al crear el padre
    });

    const padreGuardado = await nuevoPadre.save();
    res.status(201).json(padreGuardado);
  } catch (error) {
    console.error('Error al crear el padre:', error);
    res.status(500).json({ error: 'Error al crear el padre' });
  }
};


// GET - Obtener todos los padres
exports.findAllPadres = async (req, res) => {
    console.log("/GET padres")
  try {
    const padres = await Padre.find().populate('alumnos', 'nombre apellido'); //Join con Alumnos
    res.status(200).json(padres);
  } catch (error) {
    console.error('Error al obtener los padres:', error);
    res.status(500).json({ error: 'Error al obtener los padres' });
  }
};
