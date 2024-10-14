const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  cursosInscriptos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }],
  padres: [{ type: Schema.Types.ObjectId, ref: 'Padre' }]
}, { timestamps: true });

module.exports = mongoose.model('Alumno', alumnoSchema);
