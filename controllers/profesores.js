const Profesor = require('../models/profesorModel');

exports.addProfesor = async function (req, res) {
    console.log('POST /addProfesor');
    console.log(req.body);

    const { nombre, apellido, email, dni, cursosDictados } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !email || !dni) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }

    try {
        // Crear un nuevo profesor
        const nuevoProfesor = new Profesor({
            nombre: nombre,
            apellido: apellido,
            email: email,
            dni: dni,
            cursosDictados: cursosDictados || []  // Inicializa como un array vacío si no se proporciona
        });

        // Guardar el profesor en la base de datos
        const profesorGuardado = await nuevoProfesor.save();
        return res.status(201).json(profesorGuardado);

    } catch (err) {
        console.error('Error al crear Profesor:', err.message);
        return res.status(500).json({
            message: 'Error al guardar el Profesor',
            error: err.message
        });
    }
};
