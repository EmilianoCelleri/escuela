// Middleware para autenticar la sesión del usuario
const authenticateSession = (req, res, next) => {
    // Verifica si el usuario está autenticado utilizando el método isAuthenticated de Passport
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, pasa el control al siguiente middleware o ruta
      return next();
    }
    // Si no está autenticado, responde con un código 401 y un mensaje de error
    res.status(401).json({ error: 'No autenticado' });
  };
  
  // Middleware para manejar errores de forma centralizada
  const errorHandler = (error, request, response, next) => {
    // Imprime el mensaje de error en la consola para depuración
    console.error(error.message);
  
    // Si el error es un error de tipo CastError (por ejemplo, un ID mal formado en la URL)
    if (error.name === 'CastError') {
      // Responde con un código 400 y un mensaje de error indicando que el ID está mal formado
      return response.status(400).send({ error: 'malformatted id' });
    }
    // Si el error es un error de validación (generalmente por un dato incorrecto al crear o actualizar un documento)
    else if (error.name === 'ValidationError') {
      // Responde con un código 400 y el mensaje de error de validación
      return response.status(400).json({ error: error.message });
    }
    // Si el error no es ninguno de los anteriores, pasa el error al siguiente middleware de manejo de errores
    next(error);
  };
  
  // Exporta los middlewares para poder usarlos en otros archivos
  module.exports = { authenticateSession, errorHandler };