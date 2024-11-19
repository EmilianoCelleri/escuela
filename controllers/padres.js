const Padre = require('../models/padreModel');

// GET - Obtener todos los padres
exports.findAllPadres = async function (req, res) => {
    console.log("/GET padres")
  try {
    const padres = await Padre.find().populate('alumnos', 'nombre apellido'); //Join con Alumnos
    res.status(200).json(padres);
  } catch (error) {
    console.error('Error al obtener los padres:', error);
    res.status(500).json({ error: 'Error al obtener los padres' });
  }
};

//GET - Buscar padre por ID
exports.findPadreById = async function (req, res) {
  try {
    const padre = await Padre.findById(req.params.id);

    if (!padre) {
      return res.status(404).json({ message: 'Padre no encontrado' });
    }

    console.log('GET /padres/' + req.params.id);
    res.status(200).json(padre);
  } catch (err) {
      console.error('Error al buscar el padre:', err.message);
      res.status(500).json({ message: 'Error al buscar el padre', error: err.message });
  }
};

// POST - Crear un nuevo padre
exports.addPadre = async function (req, res) => {
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

// DELETE - Eliminar Padre por ID
exports.deletePadre = async function (req, res) {

  console.log('DEL /padres/' + req.params.id);

  try {
    const padre = await Padre.findByIdAndDelete(req.params.id);

    if (!padre) {
      return res.status(404).json({ message: 'Padre no encontrado' });
    }

    res.status(200).json({ message: 'Padre eliminado correctamente' });
  } catch (err) {
    console.error('Error al borrar Padre:', err.message);
    res.status(500).json({ message: 'Error al borrar el Padre', error: err.message });
  }
};

//PUT - Modificar Alumno por ID
exports.updatePadre = async function (req, res) => {
  const { id } = req.params; // Obtenemos el ID del padre desde los parámetros de la URL
  const { nombre, apellido, email, telefono, alumnos } = req.body; // Obtenemos los datos desde el body de la solicitud

  try {
    // Busca al padre por su ID y actualiza los campos
    const padreActualizado = await Padre.findByIdAndUpdate(
      id,  // ID del padre a actualizar
      {
        nombre,
        apellido,
        email,
        telefono,
        alumnos,
      },
      { new: true, runValidators: true }  // `new: true` para devolver el documento actualizado, `runValidators: true` para aplicar las validaciones del modelo
    );

    if (!padreActualizado) {
      return res.status(404).send('Padre no encontrado');
    }

    res.status(200).json(padreActualizado);  // Devuelve el padre actualizado en la respuesta
  } catch (error) {
    console.error('Error al actualizar el padre:', error);
    res.status(500).send('Error al actualizar el padre');
  }
};