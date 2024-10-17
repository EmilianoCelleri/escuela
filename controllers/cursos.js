var mongoose = require('mongoose');
const Curso = require('../models/cursoModel')


exports.addCurso = async function (req, res)  {
        //Impresion por consola del metodo con el body
        console.log('POST /addCurso');
        console.log(req.body);

        const { nombre, descripcion, horario, profesor, alumnosInscriptos } = req.body;

        if (!nombre || !descripcion || !horario ) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
          }


        try{

            const curso = new Curso ({

                nombre: nombre,
                descripcion: descripcion,
                horario: horario,
                profesor: profesor || [], 
                alumnosInscriptos: alumnosInscriptos || []
            });

            const nuevoCurso = await curso.save();
            return res.status(201).json(nuevoCurso);
        
        } catch(err){

            console.error('Error al insertar Curso:', err.message);
  
            // Enviar un error con el mensaje de error
            return res.status(500).json({ 
              message: 'Error al guardar el Curso', 
              error: err.message 
            });

        }
};