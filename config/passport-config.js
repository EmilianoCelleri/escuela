const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'nombreUsuario', passwordField: 'clave' }, // Define los nombres de los campos
    async (username, password, done) => {
      try {
        const usuario = await Usuario.findOne({ nombreUsuario: username });
        if (!usuario) {
          return done(null, false, { message: 'Nombre de usuario incorrecto' });
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.claveHash);
        if (!passwordCorrecta) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, usuario); // Usuario autenticado con éxito
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await Usuario.findById(id);
      done(null, usuario);
    } catch (err) {
      done(err);
    }
  });
};
