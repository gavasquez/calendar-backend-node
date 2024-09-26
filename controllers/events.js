const { request, response } = require('express');


const getEventos = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'obtener eventos'
  });
}

const crearEvento = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'crear evento'
  });
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