const { Router } = require( 'express' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require( '../middlewares/validar-campos' );
const { check } = require( 'express-validator' );
const { isDay } = require( '../helpers/isDate' );
/* 
  Rutas de Usuarios / Events
  host + /api/events
*/

const router = Router();
// todas las peticiones pasan por el validardJWT
router.use(validarJWT);

router.get('/', getEventos); // Obtener eventos

router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha inicial es obligatoria').custom( isDay ),
  check('end', 'La fecha final es obligatoria').custom( isDay ),
  validarCampos, // validar campos
], crearEvento); // Crear eventos

router.put('/:id', actualizarEvento); // Actualizar eventos

router.delete('/:id', eliminarEvento); // Eliminar eventos

module.exports = router;
