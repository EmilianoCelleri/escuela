const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    claveHash: { type: String, required: true },
    tipoUsuario: { 
      type: String, 
      enum: ['alumno', 'profesor', 'administrativo', 'admin'], 
      required: true 
    },
    refId: {  // Referencia al alumno, profesor o personal
      type: Schema.Types.ObjectId, 
      refPath: 'tipoUsuario',
      required: false
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Usuario', usuarioSchema);
  