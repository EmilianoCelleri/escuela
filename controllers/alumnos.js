var mongoose = require('mongoose');
const Alumno = require('../models/alumnoModel')


// GET - Obtener todos los alumnos
exports.findAllAlumnos = async function (req, res) {
    try {
        const alumnos = await Alumno.find();
        console.log('GET /alumnos');
        res.status(200).json(alumnos);
    } catch (err) {
        res.status(500).send(err.message);
    }
  };


// GET - Buscar Alumno por ID
exports.findAlumnoById = async function (req, res) {
  try {
    const alumno = await Alumno.findById(req.params.id);
  
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
  
    console.log('GET /alumnos/' + req.params.id);
    res.status(200).json(alumno);
  } catch (err) {
      console.error('Error al buscar el alumno:', err.message);
      res.status(500).json({ message: 'Error al buscar el alumno', error: err.message });
  }
};
  

// POST - Crear un nuevo alumno
exports.addAlumno = async function (req, res) {

    //Impresion por consola del metodo con el body
    console.log('POST /addAlumno');
    console.log(req.body);
  
    // Validación de datos
    const { nombre, apellido, fechaNacimiento, dni, email, cursosInscriptos, padres } = req.body;
    
    if (!nombre || !apellido || !fechaNacimiento || !dni || !email) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }
  
    try {
      // Crear un nuevo Alumno basado en el esquema 'Alumno'
      const alumno = new Alumno({
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        dni: dni,
        email: email,
        cursosInscriptos: cursosInscriptos || [], // Asegura un array vacío si no se proporciona
        padres: padres || []  // Asegura un array vacío si no se proporciona
      });
  
      // Guardar el nuevo Alumno en la base de datos
      const nuevoAlumno = await alumno.save();
  
      // Respuesta exitosa con el nuevo Alumno
      return res.status(201).json(nuevoAlumno); // 201 indica que se ha creado un recurso
  
    } catch (err) {
      console.error('Error al insertar Alumno:', err.message);
  
      // Enviar un error con el mensaje de error
      return res.status(500).json({ 
        message: 'Error al guardar el Alumno', 
        error: err.message 
      });
    }
  };
  

// DELETE - Eliminar Alumno por ID
exports.deleteAlumno = async function (req, res) {
  
  console.log('DEL /alumnos/' + req.params.id);
  
  try {
    const alumno = await Alumno.findByIdAndDelete(req.params.id);

    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    res.status(200).json({ message: 'Alumno eliminado correctamente' });
  } catch (err) {
    console.error('Error al borrar Alumno:', err.message);
    res.status(500).json({ message: 'Error al borrar el Alumno', error: err.message });
  }
};

//PUT - Modificar Alumno por ID
exports.updateAlumno = async function (req, res) => {
  const { id } = req.params; // Obtenemos el ID del alumno desde los parámetros de la URL
  const { nombre, apellido, fechaNacimiento, dni, email, cursosInscriptos, padres } = req.body; // Obtenemos los datos desde el body de la solicitud

  try {
    // Busca al alumno por su ID y actualiza los campos
    const alumnoActualizado = await Alumno.findByIdAndUpdate(
      id,  // ID del alumno a actualizar
      {
        nombre,
        apellido,
        fechaNacimiento,
        dni,
        email,
        cursosInscriptos,
        padres
      },
      { new: true, runValidators: true }  // `new: true` para devolver el documento actualizado, `runValidators: true` para aplicar las validaciones del modelo
    );

    if (!alumnoActualizado) {
      return res.status(404).send('Alumno no encontrado');
    }

    res.status(200).json(alumnoActualizado);  // Devuelve el alumno actualizado en la respuesta
  } catch (error) {
    console.error('Error al actualizar el alumno:', error);
    res.status(500).send('Error al actualizar el alumno');
  }
};
