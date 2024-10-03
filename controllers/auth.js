const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require( '../helpers/jwt' );

const crearUsuario = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({ email});

    if(usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      });
    }

    usuario = new Usuario(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(); // Genera un salt
    usuario.password = bcrypt.hashSync( password, salt ); // Encripta la contraseña con el salt
    // Guardar en BD
    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });

  }

}

const loginUsuario = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email});

    if(!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
    }

    // Confirmar los passwords
    const validPasword = bcrypt.compareSync(password, usuario.password);
    if(!validPasword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }

}

const revalidarToken = async (req = request, res = response) => {

  const { uid, name } = req;

  const token = await generarJWT(uid, name);
  
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}