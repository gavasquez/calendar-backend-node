const { Router } = require( 'express' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
// Todas tiene que pasar por el JWT
const router = Router();

// Obtener eventos
router.get('/',validarJWT, getEventos); // Obtener eventos

router.post('/', validarJWT, crearEvento); // Crear eventos

router.put('/:id', validarJWT, actualizarEvento); // Actualizar eventos

router.delete('/:id', validarJWT, eliminarEvento); // Eliminar eventos

module.exports = router;
