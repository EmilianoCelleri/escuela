const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const passport = require('passport');


exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index', 
    failureRedirect: '/login',
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.render('login', { mensaje: 'Sesion cerrada exitosamente' }); // Redirige al formulario de login tras cerrar sesión
  });
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