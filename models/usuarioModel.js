const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    tipoUsuario: { 
      type: String, 
      enum: ['alumno', 'profesor', 'administrativo', 'admin'], 
      required: true 
    },
    refId: {  // Referencia al alumno, profesor o personal
      type: Schema.Types.ObjectId, 
      refPath: 'tipoUsuario',
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Usuario', usuarioSchema);
  