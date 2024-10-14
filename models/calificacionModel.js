const calificacionSchema = new Schema({
    alumno: { type: Schema.Types.ObjectId, ref: 'Alumno', required: true },
    curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor', required: true },
    notaFinal: { type: Number, required: true, min: 0, max: 10 },
    comentario: { type: String }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Calificacion', calificacionSchema);
  