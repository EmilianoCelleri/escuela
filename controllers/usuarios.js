const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

exports.login = async function (req, res) {
  const { nombreUsuario, clave } = req.body;

  // Verifica si el usuario ingresó ambos campos
  if (!nombreUsuario || !clave) {
    return res.status(400).render('login', { error: 'Por favor, completa todos los campos' });
  }

  try {
    // Buscar al usuario por nombre de usuario
    const usuario = await Usuario.findOne({ nombreUsuario });
    
    // Si no se encuentra el usuario
    if (!usuario) {
      return res.status(401).render('login', { error: 'Credenciales incorrectas' });
    }

    // Verifica la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(clave, usuario.claveHash);
    if (!isPasswordValid) {
      return res.status(401).render('login', { error: 'Credenciales incorrectas' });
    }

    // Redirige a la página de inicio si todo es correcto
    res.render('index', { mensaje: 'Bienvenido!' });

  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    return res.status(500).render('login', { error: 'Hubo un problema en el servidor, inténtalo más tarde' });
  }
};


exports.registro = async function (req, res) {
  const body = req.body; // Obtiene los datos del cuerpo de la solicitud (username, password, name)

  const saltRounds = 10; // Define el número de rondas para generar el hash de la contraseña
  // Cifra la contraseña usando bcrypt y el número de rondas de sal
  const claveHash = await bcrypt.hash(body.clave, saltRounds); // Asigna el hash de la contraseña al variable passwordHash

  // Crea un nuevo objeto 'user' basado en el modelo 'User'
  const user = new Usuario({
    nombreUsuario: body.nombreUsuario, // Asigna el nombre de usuario desde el cuerpo de la solicitud
    tipoUsuario: body.tipoUsuario, // Asigna el nombre completo del usuario desde el cuerpo de la solicitud
    claveHash // Asigna el hash de la contraseña cifrada
  });

  const savedUser = await user.save(); // Guarda el nuevo usuario en la base de datos
  res.render('index', { mensaje: 'Alumno registrado exitosamente' }); // Devuelve la vista renderizada con un mensaje
};