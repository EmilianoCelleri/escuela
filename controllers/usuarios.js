const Usuario = require('../models/usuarioModel');

exports.login = async function (req, res) {
  const { nombreUsuario, clave } = req.body;
  console.log(req.body);


  // Verifica si el usuario ingresó ambos campos
  if (!nombreUsuario || !clave) {
    return res.status(400).send('Por favor, ingresa tanto el nombre de usuario como la contraseña');
  }

  try {
    // Buscar al usuario por nombre de usuario
    const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario });

    // Si no se encuentra el usuario o la clave es incorrecta
    if (!usuario || usuario.clave !== clave) {
      return res.status(401).send('Credenciales incorrectas');
    }

    // Si la contraseña es correcta, redirige a la página de inicio
    return res.redirect('/index');
    
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    return res.status(500).send('Error del servidor al procesar el inicio de sesión');
  }
};