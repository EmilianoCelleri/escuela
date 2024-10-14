const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dni: { type: String, required: true, unique: true },
    cursosDictados: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Profesor', profesorSchema, 'profesores');
  