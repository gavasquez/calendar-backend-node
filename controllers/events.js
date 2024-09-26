const { request, response } = require('express');
const Evento = require('../models/Evento');


const getEventos = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'obtener eventos'
  });
}

const crearEvento = async (req = request, res = response) => {
  
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid; // id del usuario que creo el evento

    const eventGuardado = await evento.save();
    
    res.json({
      ok: true,
      eventGuardado,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });

  }


}

const actualizarEvento = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizar evento'
  });
}

const eliminarEvento = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'Eliminar evento'
  });
}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
}