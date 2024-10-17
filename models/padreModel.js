const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const padreSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    alumnos: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Padre', padreSchema);
  