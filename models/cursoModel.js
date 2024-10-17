const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    horario: { type: String, required: true },
    profesor: [{ type: Schema.Types.ObjectId, ref: 'Profesor' }],
    alumnosInscriptos: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Curso', cursoSchema);
  