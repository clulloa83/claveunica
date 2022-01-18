const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerUrl, obtenerToken, obtenerUsuarioInfo, cerrarSesion } = require('../controllers/clave-unica');
const { validarCampos } = require('../middlewares');

const router = Router();

router.get('/obtenerUrl',[
    check('clientId', 'el clientId es obligatorio').not().isEmpty(),
    check('clientSecret', 'el clientSecret es obligatorio').not().isEmpty(),
    check('redirectUri', 'el redirectUri es obligatorio').not().isEmpty(),
    validarCampos
], obtenerUrl);

router.get('/obtenerToken',[
    check('clientId', 'el clientId es obligatorio').not().isEmpty(),
    check('clientSecret', 'el clientSecret es obligatorio').not().isEmpty(),
    check('redirectUri', 'el redirectUri es obligatorio').not().isEmpty(),
    check('originalUrl', 'el originalUrl es obligatorio').not().isEmpty(),
    validarCampos
], obtenerToken);

router.get('/obtenerUsuarioInfo',[
    check('token', 'el token es obligatorio').not().isEmpty(),
    validarCampos
], obtenerUsuarioInfo);

router.get('/cerrarSesion',[
    check('urlLogout', 'urlLogout msg').optional(),
    validarCampos
], cerrarSesion);

module.exports = router;